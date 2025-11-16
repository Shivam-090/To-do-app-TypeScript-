import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { resetAPI } from "../../api/auth";
import toast from "react-hot-toast";

const resetSchema = z.object({
    userId: z.string(),
    token: z.string(),
    newPassword: z.string().min(6)
})

export function useReset(){
    return useMutation({
        mutationFn: async (data: any)=>{
            resetSchema.parse(data);
            const res = await resetAPI(data)
            return res.data;
        },
        onSuccess: ()=> {
            toast.success("Password updated! Please sign in.")
        },
        onError: ()=> {
            toast.error("Reset link invalid or expired")
        }
    })
}