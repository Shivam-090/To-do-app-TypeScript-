import { useForm } from "react-hook-form";
import { useForgot } from "../hooks/auth/useForgot";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const { register, handleSubmit, reset } = useForm();
  const forgot = useForgot();
  const [copied, setCopied] = useState(false);

  const onSubmit = (values: any) => {
    setCopied(false);
    forgot.mutate(values, {
      onSuccess: () => reset(),
    });
  };

  const handleCopy = () => {
    if (forgot.data?.resetLink) {
      navigator.clipboard.writeText(forgot.data.resetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {forgot.isLoading ? "Generating Link..." : "Send Reset Link"}
          </button>
        </form>

        {/* SUCCESS MESSAGE WITH RESET LINK */}
        {forgot.isSuccess && forgot.data?.resetLink && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-sm">
            <p className="font-semibold">Reset Link Generated:</p>

            <div className="mt-2 bg-white border border-green-300 rounded p-2 break-all text-xs">
              {forgot.data.resetLink}
            </div>

            <button
              onClick={handleCopy}
              className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <p className="text-gray-600 text-xs mt-2">
              Copy and paste this link into your browser to reset your password.
            </p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {forgot.isError && (
          <p className="mt-3 text-red-600 text-center text-sm">
            {forgot.error?.response?.data?.message || "Something went wrong"}
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
