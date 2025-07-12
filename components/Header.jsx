import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6"style={{ fontFamily: 'Inter' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-4">
          <h1 className="text-[24px] font-bold text-[#111928]">ticktock</h1>
          <span className="text-[#111928] text-sm font-[500] hidden sm:inline-block">Timesheets</span>
        </div>


        <div className="flex items-center">
          <span className="text-[#6B7280] text-[16px] font-[500]">Priyanka Fatarpekar</span>
          <svg
            className="ml-2 h-5 w-5 text-gray-500"
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
      </div>
    </header>
  );
};

export default Header;