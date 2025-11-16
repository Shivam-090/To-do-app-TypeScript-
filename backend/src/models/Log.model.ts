import { Schema, model, Document } from "mongoose";

export interface ILog extends Document{
    level: string,
    message: string,
    stack?: string,
    route?: string,
    meta?: any;
}

const LogSchema = new Schema<ILog>({
    level: { type: String, required: true},
    message: { type: String, required: true },
    stack: { type: String },
    route: { type: String },
    meta: { type: Schema.Types.Mixed }
}, { timestamps: true });

export const Log = model<ILog>("Log", LogSchema)