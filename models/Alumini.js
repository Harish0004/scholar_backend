import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  batch: { type: Number },
  company: { type: String },
  designation: { type: String },
  bio: { type: String }
}, { timestamps: true });

export default mongoose.model('Alumni', alumniSchema);
