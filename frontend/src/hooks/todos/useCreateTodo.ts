import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodoAPI } from "../../api/todos";
import { todoSchema } from "../../schema/todo.schema";
import toast from "react-hot-toast";

export function useCreateTodo(){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async(data: any) => {
            todoSchema.parse(data);
            const res = await createTodoAPI(data);
            return res.data
        },
        onSuccess: ()=> {
            qc.invalidateQueries(["todos"]);
            toast.success("Todo added")
        },
        onError: ()=> {
            toast.error("Failed to add todo")
        }
    });
}