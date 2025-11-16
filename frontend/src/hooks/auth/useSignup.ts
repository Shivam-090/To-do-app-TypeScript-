import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "../../api/auth";
import { signupSchema } from "../../schema/auth.schema";
import { useAuth } from "../useAuth";
import toast from "react-hot-toast";
import axios from "axios";

export function useSignup() {
    const setToken = useAuth((s)=> s.setToken);

    return useMutation({
        mutationFn: async (data: any) => {
            signupSchema.parse(data);
            const res = await signupAPI(data);
            return res.data;
        },
        onSuccess: (data) => {
            setToken(data.token);
            toast.success("Account created! You can sign in now.");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Signup failed");
            } else {
                toast.error("Signup failed");
            }
        },
    });
}
