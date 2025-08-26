import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { authApi } from "../lib/authApi";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    authApi.googleAuth();
  };

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authApi.login(data);
      console.log(response.data);
      reset();

      toast.success("Login successful! Welcome back.");
      navigate("/");
    } catch (error) {
      console.error(`Login failed:`, error.response?.data || error.message);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const password = watch("password", "");
  const [strength, setStrength] = useState(0);

  const strengthLevels = [
    { level: "Very Weak", color: "text-red-500" },
    { level: "Weak", color: "text-orange-500" },
    { level: "Medium", color: "text-yellow-500" },
    { level: "Strong", color: "text-green-500" },
    { level: "Very Strong", color: "text-emerald-600" },
  ];

  const passwordEdgeCases = (pwd) => {
    let score = 0;
    if (pwd.trim().length >= 6) score++;
    if (/\d/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++;
    return score;
  };

  useEffect(() => {
    setStrength(passwordEdgeCases(password));
  }, [password]);

  return (
    <div className="pt-20 py-10">
      <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-700">Sign in to your account</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border border-gray-400 rounded-xl text-gray-900 font-semibold p-2 text-lg w-full hover:bg-gray-50 transition"
        >
          <img src="/GoogleIcon.svg" alt="Google sign-in" className="size-6" />
          <p>Continue with Google</p>
        </button>

        {/* OR separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 font-medium text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email or Username
            </label>
            <div className="mt-3">
              <input
                id="emailOrUsername"
                type="text"
                placeholder="you@example.com or username"
                {...register("emailOrUsername", {
                  required: "Email or Username is required",
                })}
                className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm bg-white"
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrUsername.message}
                </p>
              )}
            </div>
          </div>

          {/* Password field */}
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <span
                className={`text-sm font-semibold ${
                  strengthLevels[strength - 1]?.color || "text-gray-500"
                }`}
              >
                {strengthLevels[strength - 1]?.level || "None"}
              </span>
            </div>
            <div className="mt-3 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="block w-full rounded-xl bg-white border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-indigo-600"
              >
                {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-right mt-2 mb-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md py-2 px-4 text-white font-semibold ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </button>
          </div>
        </form>

        {/* Don't have an account redirect */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
