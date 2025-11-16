import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { handleAsync } from "../utils/handleAsync";
import {createTodo, listTodos, updateTodo, deleteTodo} from "../controllers/todo.controller"

const router = Router()

router.use(auth);

router.post("/", handleAsync(createTodo));
router.get("/", handleAsync(listTodos));
router.delete("/:id", handleAsync(deleteTodo));
router.patch("/:id", handleAsync(updateTodo));

export default router;