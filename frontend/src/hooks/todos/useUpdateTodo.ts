import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoAPI } from "../../api/todos";
import toast from "react-hot-toast";

type UpdatePayload = {
    id: string;
    data: Partial<{ title: string; description?: string; completed?: boolean }>;
};

export function useUpdateTodo() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: UpdatePayload) => {
            const res = await updateTodoAPI(id, data);
            return res.data;
        },
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ["todos"],
            });
            toast.success("Todo updated");
        },
        onError: () => {
            toast.error("Update failed");
        }
    });
}
