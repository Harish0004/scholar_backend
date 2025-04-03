import { Router } from "express";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js"; // ✅ Corrected Import
const router = Router();
const SECRET_KEY = "your_secret_key";
const { sign } = jwt;
import Alumini from "../models/Alumini.js";

// User Registration
router.post("/register", async (req, res) => {
	try {
		console.log(req.body);
		const { username, email, password } = req.body;
		const existingUser = await Student.findOne({ username }); // ✅ FIXED

		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		const hashedPassword = await hash(password, 10);
		const newStudent = new Student({
			username,
			email,
			password: hashedPassword,
		});
		await newStudent.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
});

router.post("/aluminiRegister", async (req, res) => {
	try {
		console.log(req.body);
		const { username, email, password, aluminiId } = req.body;
		const existingUser = await Alumini.findOne({ email }); // ✅ FIXED

		if (existingUser) {
			return res.status(400).json({ message: "email already exists" });
		}

		const hashedPassword = await hash(password, 10);
		const newStudent = new Alumini({
			username,
			email,
			password: hashedPassword,
			aluminiId,
		});
		await newStudent.save();
		res.status(201).json({ message: "Alumini registered successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error registering Alumini", error });
	}
});

// User Login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const student = await Student.findOne({ email }); // ✅ FIXED
		if (!student || !(await compare(password, student.password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = sign(
			{ id: student._id, username: student.username },
			SECRET_KEY,
			{ expiresIn: "1h" },
		);
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error });
	}
});

router.post("/aluminiLogin", async (req, res) => {
	try {
		const { aluminiId, password } = req.body;
		const alumini = await Alumini.findOne({ aluminiId }); // ✅ FIXED
		if (!alumini || !(await compare(password, alumini.password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = sign(
			{ id: alumini._id, username: alumini.username },
			SECRET_KEY,
			{ expiresIn: "1h" },
		);
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error });
	}
});

export default router;
