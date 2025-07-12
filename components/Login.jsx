'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/tableview");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-[20px] font-bold text-[#111928] mb-8">Welcome back</h1>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
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
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-[#D1D5DB] placeholder-[#6B7280] text-black text-sm font-[400] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600  border-[#D1D5DB] bg-[#F9FAFB] rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B7280] font-[500]">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-[500] text-white bg-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </form>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 text-center text-sm text-[#6B7280] font-[14px]">
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