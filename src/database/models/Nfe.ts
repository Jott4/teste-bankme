import mongoose, { Document } from "mongoose";

interface NfeModel extends Document {
  emitterName: String;
  emitterCNPJ: String;
  receiverName: String;
  receiverCNPJ: String;
  emissionDate: Date;
  amount: Number;
  userId: String;
}

const NfeSchema = new mongoose.Schema({
  emitterName: String,
  emitterCNPJ: String,
  receiverName: String,
  receiverCNPJ: String,
  emissionDate: Date,
  amount: Number,
  userId: String,
});

export default mongoose.models.Nfe ||
  mongoose.model<NfeModel>("Nfe", NfeSchema);
