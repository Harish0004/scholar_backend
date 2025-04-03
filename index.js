import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser"; // ✅ Correct
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 8080;
app.use(
	cors({
		origin: "http://localhost:3000", // ✅ Allow frontend requests
		methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed HTTP methods
		credentials: true, // ✅ Allow sending cookies if needed
	}),
);

app.use(bodyParser.json()); // ✅ Correct way to use body-parser in ES modules

// Use authentication routes
app.use("/auth", authRoutes);

// Connect to MongoDB
connect("mongodb://localhost:27017/scholarbridge", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err);
	});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
