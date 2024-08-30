import express from 'express';
import mongoose from 'mongoose';
import Atendente from '../src/app/services/atendente.service';
import Atendimento from '../src/app/services/atendimento.service';

const app = express();
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro na conexão com MongoDB', err));

// Atendente Endpoints
app.get('/api/atendentes', async (req, res) => {
  try {
    const atendentes = await Atendente.find();
    res.status(200).json(atendentes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atendentes', error: err });
  }
});

app.get('/api/atendentes/:id', async (req, res) => {
  try {
    const atendente = await Atendente.findOne({ id: req.params.id });
    if (!atendente) {
      return res.status(404).json({ message: 'Atendente não encontrado' });
    }
    res.status(200).json(atendente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atendente', error: err });
  }
});

app.post('/api/atendentes', async (req, res) => {
  const { id, departamento, setor } = req.body;
  if (!id || !departamento || !setor) {
    return res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
  }
  try {
    const novoAtendente = new Atendente({ id, departamento, setor });
    await novoAtendente.save();
    res.status(201).json(novoAtendente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar atendente', error: err });
  }
});

app.put('/api/atendentes/:id', async (req, res) => {
  try {
    const atendente = await Atendente.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!atendente) {
      return res.status(404).json({ message: 'Atendente não encontrado' });
    }
    res.status(200).json(atendente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar atendente', error: err });
  }
});

app.delete('/api/atendentes/:id', async (req, res) => {
  try {
    const result = await Atendente.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Atendente não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar atendente', error: err });
  }
});

// Atendimento Endpoints
app.get('/api/atendimentos', async (req, res) => {
  try {
    const atendimentos = await Atendimento.find();
    res.status(200).json(atendimentos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atendimentos', error: err });
  }
});

app.get('/api/atendimentos/:ticket', async (req, res) => {
  try {
    const atendimento = await Atendimento.findOne({ ticket: req.params.ticket });
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.status(200).json(atendimento);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar atendimento', error: err });
  }
});

app.post('/api/atendimentos', async (req, res) => {
  const { ticket, texto, id_atendente, motivo } = req.body;
  if (!ticket || !texto || !id_atendente || !motivo) {
    return res.status(400).json({ message: 'Campos obrigatórios não fornecidos' });
  }
  try {
    const novoAtendimento = new Atendimento({ ticket, texto, id_atendente, motivo });
    await novoAtendimento.save();
    res.status(201).json(novoAtendimento);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erro ao criar atendimento', error: err });
  }
});

app.put('/api/atendimentos/:ticket', async (req, res) => {
  try {
    const atendimento = await Atendimento.findOneAndUpdate({ ticket: req.params.ticket }, req.body, { new: true });
    if (!atendimento) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.status(200).json(atendimento);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar atendimento', error: err });
  }
});

app.delete('/api/atendimentos/:ticket', async (req, res) => {
  try {
    const result = await Atendimento.deleteOne({ ticket: req.params.ticket });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar atendimento', error: err });
  }
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
