import { Schema, Document, model, Types, SchemaType } from "mongoose"

export interface ITodo extends Document{
    user: Types.ObjectId;
    title: string;
    description?: string;
    completed: boolean;
}

const TodoSchema = new Schema<ITodo>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String},
    completed: { type: Boolean, default: false}
},{timestamps: true});

export const Todo = model<ITodo>("Todo", TodoSchema);
