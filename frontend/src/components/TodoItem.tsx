import { useUpdateTodo } from "../hooks/todos/useUpdateTodo"
import { useDeleteTodo } from "../hooks/todos/useDeleteTodo"

export default function TodoItem({ todo }: any){
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();

    return(
        <li>
            <input type="checkbox"  checked={todo.completed} onChange={()=> updateTodo.mutate({id: todo._id, data: {completed: !todo.completed }})} />

            <span style={{textDecoration: todo.completed ? "line-through" : "none" }}> {todo.title} </span>

            <button onClick={()=> deleteTodo.mutate(todo._id)}>Delete</button>
        </li>

    )
}