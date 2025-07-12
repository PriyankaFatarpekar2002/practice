'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTimesheets } from '@/hooks/useTimesheets';

const TableView = () => {
    const router = useRouter();
    const {
        timesheets,
        loading,
        handlePrevWeeks,
        handleNextWeeks,
        getStatusStyle
    } = useTimesheets();

    const handleActionClick = (action, weekData) => {
        if (action === 'View' || action === 'Update' || action === 'Create') {
            router.push(`/listview?start=${weekData.weekStart}&end=${weekData.weekEnd}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 md:px-[100px] " style={{ fontFamily: 'Inter' }}>
                <div className="bg-white rounded-xl shadow-sm p-6 md:px-[20px]">
                    <h1 className="text-[24px] font-bold text-gray-800 mb-6">Your Timesheets</h1>
                    <div className="flex justify-center items-center h-64">
                        <p className='text-black'>Loading timesheet data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:px-[100px]" style={{ fontFamily: 'Inter' }}>
            <div className="bg-white rounded-xl shadow-sm p-6 md:px-[20px] md:max-w-6xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="md:text-2xl text-md font-bold text-gray-800">Your Timesheets</h1>
                    <div className="flex gap-2">
                        <button 
                            onClick={handlePrevWeeks}
                            className="text-black bg-gray-100 font-medium text-sm hover:text-gray-900 px-3 py-1 rounded-2xl shadow-md"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNextWeeks}
                            className="text-black bg-gray-100 font-medium text-sm hover:text-gray-900 px-3 py-1 rounded-2xl shadow-md"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F9FAFB]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider bg-gray-50">WEEK #</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">DATE</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">HOURS</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {timesheets.map((sheet) => {
                          
                                let statusDisplay;
                                let actionDisplay;
                                
                                if (sheet.totalHours >= 40) {
                                    statusDisplay = 'COMPLETED';
                                    actionDisplay = 'View';
                                } else if (sheet.totalHours > 0) {
                                    statusDisplay = 'INCOMPLETE';
                                    actionDisplay = 'Update';
                                } else {
                                    statusDisplay = 'MISSING';
                                    actionDisplay = 'Create';
                                }

                                return (
                                    <tr key={sheet.week}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111928] bg-gray-50">{sheet.week}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280] font-[400]">{sheet.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-[500] rounded-md ${getStatusStyle(statusDisplay)}`}>
                                                {statusDisplay}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280] font-[400]">
                                            {sheet.totalHours}/40 hrs
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex justify-start">
                                                <button
                                                    className={`text-sm font-medium ${
                                                        actionDisplay === 'View' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                        actionDisplay === 'Update' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                        'text-[#1C64F2] hover:text-blue-800'
                                                    }`}
                                                    onClick={() => handleActionClick(actionDisplay, sheet)}
                                                >
                                                    {actionDisplay}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableView;