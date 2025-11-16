import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoAPI } from "../../api/todos";
import toast from "react-hot-toast";

export function useDeleteTodo (){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (id: string)=>{
            const res = await deleteTodoAPI(id);
            return res.data
        },
        onSuccess: ()=>{
            qc.invalidateQueries(["todos"]);
            toast.success("Todo deleted")
        },
        onError: ()=> {
            toast.error("Failed to delete todo")
        }
    })
}