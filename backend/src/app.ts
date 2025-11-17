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

app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Todo App API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login, /api/auth/register',
      todos: '/api/todos'
    }
  });
});

app.use(errorMiddleware);


export default app;
