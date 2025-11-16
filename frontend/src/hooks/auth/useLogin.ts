import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../api/auth";
import { loginSchema } from "../../schema/auth.schema";
import { useAuth } from "../useAuth";
import toast from "react-hot-toast";

export function useLogin(){
    const setToken = useAuth((s)=> s.setToken);

    return useMutation({
        mutationFn: async (data: any)=>{
            loginSchema.parse(data);
            const res = await loginAPI(data);
            return res.data;
        },
        onSuccess: (data) => {
            setToken(data.token);
            toast.success("Logged in successfully")
        },
        onError: (error: any)=> {
            toast.error(error?.response?.data?.message || "Invalid credentials")
        }
    });
}