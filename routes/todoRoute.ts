import express, { Request, Response } from "express";
import TodoModel from "../models/todoModel";
const todoRoute = express.Router();

// Create a new TODO
todoRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { value, email } = req.body;
    const todo = new TodoModel({
      value,
      email,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create TODO" });
  }
});

// Get all TODOs
todoRoute.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve TODOs" });
  }
});

// Update a TODO
todoRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { value, status } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { value, status },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update TODO" });
  }
});

// Delete a TODO
todoRoute.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "TODO not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete TODO" });
  }
});

export default todoRoute;
