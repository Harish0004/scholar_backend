import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // changed from name
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branch: { type: String },
  graduationYear: { type: Number },
  cgpa: { type: Number },
  familyIncome: { type: Number },
  bio: { type: String },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
