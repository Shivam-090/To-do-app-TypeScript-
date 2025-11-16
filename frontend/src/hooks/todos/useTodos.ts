import { useQuery } from "@tanstack/react-query";
import { getTodosAPI } from "../../api/todos"

export function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: async() => {
            const res = await getTodosAPI();
            return res.data
        }
    })
}
