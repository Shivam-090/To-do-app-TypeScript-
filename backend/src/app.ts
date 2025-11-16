import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes"
import todoRoutes from "./routes/todo.routes"
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

export default app;