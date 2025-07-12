'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn, signUp, loading, authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      router.push("/tableview");
    } catch (error) {
      setError(error.message || authError || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ fontFamily: 'Inter' }}>
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-[20px] font-bold text-[#111928] mb-8">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>

          {(error || authError) && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">
              {error || authError}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-[500] text-[#111928]">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-[#D1D5DB] placeholder-[#6B7280] text-black text-sm font-[400] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-[500] text-[#111928]">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                className="mt-1 block w-full px-3 py-2 border border-[#D1D5DB] placeholder-[#6B7280] text-black text-sm font-[400] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[500] text-white bg-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                isLogin ? 'Signing in...' : 'Creating account...'
              ) : (
                isLogin ? 'Sign in' : 'Sign up'
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-[#6B7280]">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-[#1A56DB] hover:text-blue-700"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="font-medium text-[#1A56DB] hover:text-blue-700"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="absolute md:bottom-8 bottom-[0px] left-0 right-0 text-center text-sm text-[#6B7280] font-[14px]">
          © 2024 tentwenty
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[#1C64F2] text-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-[40px] font-[600] mb-6">ticktock</h2>
          <p className="text-[16px] font-[400] text-[#E5E7EB]">
           Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;