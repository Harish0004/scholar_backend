import { Schema, model } from "mongoose";

const UserSchema = new Schema(
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
	},
	{ timestamps: true },
);

const Student = model("Student", UserSchema);

export default Student;
