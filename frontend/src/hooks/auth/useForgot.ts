import { useMutation } from "@tanstack/react-query";
import { forgotAPI } from "../../api/auth";
import { z } from "zod";
import toast from "react-hot-toast";

const forgotSchema = z.object({
  email: z.string().email(),
});

export function useForgot() {
  return useMutation({
    mutationFn: async (data: any) => {
      forgotSchema.parse(data);
      const res = await forgotAPI(data);
      return res.data;
    },
    onSuccess: () => {
  toast.success("Reset link generated!");
  },
onError: () => toast.error("Failed to generate reset link"),
  });
}
