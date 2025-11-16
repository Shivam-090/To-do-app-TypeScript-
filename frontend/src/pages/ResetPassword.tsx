import { useForm } from "react-hook-form";
import { useReset } from "../hooks/auth/useReset";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const resetPassword = useReset();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token") || "";
  const userId = params.get("id") || "";

  const onSubmit = (values: any) => {
    resetPassword.mutate(
      {
        userId,
        token,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => navigate("/signin"),
      }
    );
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("newPassword")}
            type="password"
            placeholder="Enter new password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {resetPassword.isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {resetPassword.isError && (
          <p className="mt-4 text-sm text-red-600 text-center">
            {resetPassword.error?.response?.data?.message ||
              "Invalid or expired reset link"}
          </p>
        )}

        {resetPassword.isSuccess && (
          <p className="mt-4 text-sm text-green-600 text-center">
            Password reset successful!
          </p>
        )}

        <p className="text-sm text-center mt-6">
          <Link to="/signin" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
