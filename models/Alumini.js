import { Schema, model } from "mongoose";

const AluminiSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		aluminiId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Alumini = model("Alumini", AluminiSchema);

export default Alumini;
