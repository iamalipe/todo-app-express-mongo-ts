import express, { Request, Response } from "express";
import { IUser, todoModel } from "../models";
import { AuthenticatedRequest } from "../middlewares";
export const todoRoute = express.Router();

// Create a new TODO
todoRoute.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jwtPayload = req.jwtPayload;
    if (!jwtPayload) throw new Error("jwtPayload not found");

    const { value } = req.body;
    const todo = new todoModel({
      value,
      userId: jwtPayload.userId,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create TODO" });
  }
});

// Get all TODOs
todoRoute.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jwtPayload = req.jwtPayload;
    if (!jwtPayload) throw new Error("jwtPayload not found");

    const todos = await todoModel.find({ userId: jwtPayload.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve TODOs" });
  }
});

// Update a TODO
todoRoute.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jwtPayload = req.jwtPayload;
    if (!jwtPayload) throw new Error("jwtPayload not found");

    const { id } = req.params;
    const { value, status } = req.body;

    // Find the todo by ID and userId
    const updatedTodo = await todoModel.findOneAndUpdate(
      { _id: id, userId: jwtPayload.userId },
      { value, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update TODO" });
  }
});

// Delete a TODO
todoRoute.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const jwtPayload = req.jwtPayload;
    if (!jwtPayload) throw new Error("jwtPayload not found");

    const { id } = req.params;
    const deletedTodo = await todoModel.findOneAndDelete({
      _id: id,
      userId: jwtPayload.userId,
    });
    if (!deletedTodo) {
      return res.status(404).json({ error: "TODO not found or unauthorized" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete TODO" });
  }
});
