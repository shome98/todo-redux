import mongoose from "mongoose";
import express from "express";
import cors from 'cors';

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
app.use(cors());


app.get('/api/todos', async (req, res) => {
   try {
        const todos = await Todo.find();
        if (!todos) {
            res.send("Could not find any todos");
        }
        res.json(todos);
    } catch (error) {
        console.log("Could not find any todos!!! ", error);
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = new Todo({
            title: req.body.title,
            completed: false
        });
        if (!newTodo) {
            res.send("No data was sent");
        }
        await newTodo.save();
        res.json(newTodo);
    } catch (error) {
        console.log("Could not save the todo!!! ", error);
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(todo);
    } catch (error) {
        console.log("Could not update todo!!! ", error);
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        console.log("Could not delete todo!!! ", error);
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});