'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; 

const TableView = () => {
    const router = useRouter();
    
 
    const timesheets = [
        { week: 1, date: '1 - 5 January, 2024', status: 'COMPLETED', action: 'View' },
        { week: 2, date: '8 - 12 January, 2024', status: 'COMPLETED', action: 'View' },
        { week: 3, date: '15 - 19 January, 2024', status: 'INCOMPLETE', action: 'Update' },
        { week: 4, date: '22 - 26 January, 2024', status: 'COMPLETED', action: 'View' },
        { week: 5, date: '28 January - 1 February, 2024', status: 'MISSING', action: 'Create' }
    ];

   
    const getStatusStyle = (status) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-[#DEF7EC] text-[#03543F]';
            case 'INCOMPLETE':
                return 'bg-[#FDF6B2] text-[#723B13]';
            case 'MISSING':
                return 'bg-[#FCE8F3] text-[#99154B]';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleActionClick = (action, week) => {
        if (action === 'View') {
            router.push(`/listview`); 
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 px-[100px]">
            <div className="bg-white rounded-xl shadow-sm p-6 px-[20px]">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Timesheets</h1>
                
                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#F9FAFB]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider bg-gray-50">WEEK #</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">DATE</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">STATUS</th>
                                <th className="px-6 py-4 text-left text-xs font-[600] text-[#6B7280] uppercase tracking-wider">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {timesheets.map((sheet) => (
                                <tr key={sheet.week}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111928] bg-gray-50">{sheet.week}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280] font-[400]">{sheet.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-[500] rounded-md ${getStatusStyle(sheet.status)}`}>
                                            {sheet.status} {sheet.status === 'COMPLETED'}
                                            {sheet.status === 'INCOMPLETE'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex justify-start">
                                            <button
                                                className={`text-sm font-medium ${sheet.action === 'View' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                        sheet.action === 'Update' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                            'text-[#1C64F2] hover:text-blue-800'
                                                    }`}
                                                onClick={() => handleActionClick(sheet.action, sheet.week)}
                                            >
                                                {sheet.action}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableView;