'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6"style={{ fontFamily: 'Inter' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-4">
          <h1 className="text-[24px] font-bold text-[#111928]">ticktock</h1>
          <span className="text-[#111928] text-sm font-[500] hidden sm:inline-block">Timesheets</span>
        </div>


         <div className="relative">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#6B7280] text-[16px] font-[500]">Priyanka Fatarpekar</span>
        <svg
          className={`ml-2 h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
      </div>
    </header>
  );
};

export default Header;