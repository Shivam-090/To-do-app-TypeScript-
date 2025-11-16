import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth/useLogin";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const login = useLogin();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    login.mutate(values, {
      onSuccess: () => navigate("/todos"),
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {login.isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-sm mt-2">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
