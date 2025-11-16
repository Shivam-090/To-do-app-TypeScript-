import { Response } from "express";
import { Todo } from "../models/Todo.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createTodo = async (req: AuthRequest, res: Response)=> {
    const todo = await Todo.create({
        user: req.userId!,
        title: req.body.title,
        description: req.body.description
    });

    res.status(201).json(todo);
}

export const listTodos = async (req: AuthRequest, res: Response)=>{
    const todos = await Todo.find({ user: req.userId}).sort({createdAt: -1});
    res.json(todos);
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
    const todo = await Todo.findOneAndUpdate({_id: req.params.id, user: req.userId}, req.body, {new: true});

    if(!todo) return res.status(404).json({ message: "Todo not found"});

    res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response)=>{
    const todo = await Todo.findByIdAndDelete({_id: req.params.id, user: req.userId});

    if(!todo) return res.status(404).json({message: "Todo not found"});

    res.json({message: "Deleted"});
};