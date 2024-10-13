import mongoose from "mongoose";
import express from "express";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { timestamps: true });
const Todo = mongoose.model("Todo", todoSchema);

try {
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB connected!!!"))
        .catch(error=>console.log("Error connecting the MongoDB!!! ",error));
} catch (error) {
    console.log("MongoDB connection error!!! ",error)
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
