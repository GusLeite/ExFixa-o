import mongoose from 'mongoose';

const atendimentoSchema = new mongoose.Schema({
  ticket: { type: Number, required: true, unique: true },
  texto: { type: String, required: true },
  id_atendente: { type: Number, required: true },
  motivo: { type: String, required: true }
});

const Atendimento = mongoose.model('Atendimento', atendimentoSchema);
export default Atendimento;
