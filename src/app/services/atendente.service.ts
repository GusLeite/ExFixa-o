import mongoose from 'mongoose';

const atendenteSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  departamento: { type: String, required: true },
  setor: { type: String, required: true }
});

const Atendente = mongoose.model('Atendente', atendenteSchema);
export default Atendente;
