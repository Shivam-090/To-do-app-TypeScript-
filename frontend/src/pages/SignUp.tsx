import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/auth/useSignup";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const signup = useSignup();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    signup.mutate(values, {
      onSuccess: () => navigate("/todos"),
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("name")}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            {signup.isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
