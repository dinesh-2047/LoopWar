import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { authApi } from "../lib/authApi";

function SignUp() {
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
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Prepare data for backend (combine first and last name)
      const userData = {
        username: data.username,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      };

      const response = await authApi.signup(userData);

      reset();

      // Backend doesn't return activationToken, just a success message
      toast.success("Account created successfully! Please login to continue.");
      navigate("/login");
    } catch (error) {
      console.error(`Signup failed:`, error.response?.data || error.message);

      // Handle specific error cases
      if (error.response?.data?.error?.includes("duplicate key")) {
        if (error.response.data.error.includes("email")) {
          setError("email", { message: "Email already exists" });
        } else if (error.response.data.error.includes("username")) {
          setError("username", { message: "Username already taken" });
        }
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during signup");
      }
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
            Create Account
          </h2>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border border-gray-400 rounded-xl text-black font-semibold p-2 text-lg w-full hover:bg-gray-50 transition"
        >
          <img src="/GoogleIcon.svg" alt="Google sign-in" className="size-6" />
          <p>Continue with google</p>
        </button>

        {/* or */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-500 font-medium text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2.5">
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

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

            <div className="mt-2.5 relative">
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
                  validate: {
                    hasNumber: (value) =>
                      /\d/.test(value) || "Password must contain a number",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*]/.test(value) ||
                      "Password must contain a special character (!@#$%^&*)",
                  },
                })}
                className="block w-full rounded-lg border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

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
              {isSubmitting ? "Submitting..." : "Create account"}
            </button>
          </div>
        </form>

        {/* Already have an account redirect */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
