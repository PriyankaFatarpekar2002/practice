'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/libs/firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, startOfWeek, addDays, addWeeks, subWeeks, parseISO } from 'date-fns';

const TableView = () => {
    const router = useRouter();
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(parseISO('2025-07-01'));
    const [weeksToShow] = useState(5);

    const fetchTimesheetData = async () => {
        setLoading(true);
        try {
            const weeksData = [];

            for (let i = 0; i < weeksToShow; i++) {
                const weekStart = addWeeks(currentDate, i);
                const weekEnd = addDays(weekStart, 5); // Saturday (Monday + 5 days)

                const q = query(
                    collection(db, "AddNewEntry"),
                    where("date", ">=", format(weekStart, 'yyyy-MM-dd')),
                    where("date", "<=", format(weekEnd, 'yyyy-MM-dd'))
                );

                const querySnapshot = await getDocs(q);
                let totalHours = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    totalHours += data.hours || 0;
                });

                let status;
                if (weekStart > new Date()) {
                    status = 'MISSING';
                } else if (totalHours === 0) {
                    status = 'MISSING';
                } else if (totalHours >= 40) {
                    status = 'COMPLETED';
                } else {
                    status = 'INCOMPLETE';
                }

                // Format week display as "30 Jun to 5 Jul"
                const dateDisplay = `${format(weekStart, 'd MMM')} to ${format(weekEnd, 'd MMM')}`;

                weeksData.push({
                    week: i + 1,
                    date: dateDisplay,
                    status,
                    action: status === 'COMPLETED' ? 'View' : status === 'INCOMPLETE' ? 'Update' : 'Create',
                    weekStart: format(weekStart, 'yyyy-MM-dd'),
                    weekEnd: format(weekEnd, 'yyyy-MM-dd'),
                    totalHours,
                    weekDate: weekStart
                });
            }

            setTimesheets(weeksData);
        } catch (error) {
            console.error("Error fetching timesheet data: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimesheetData();
    }, [currentDate]);

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

    const handleActionClick = (action, weekData) => {
        if (action === 'View' || action === 'Update' || action === 'Create') {
            router.push(`/listview?start=${weekData.weekStart}&end=${weekData.weekEnd}`);
        }
    };

    const handlePrevWeeks = () => {
        setCurrentDate(subWeeks(currentDate, weeksToShow));
    };

    const handleNextWeeks = () => {
        setCurrentDate(addWeeks(currentDate, weeksToShow));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 md:px-[100px] "style={{ fontFamily: 'Inter' }}>
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
        <div className="min-h-screen bg-gray-100 p-6 md:px-[100px]"style={{ fontFamily: 'Inter' }}>
            <div className="bg-white rounded-xl shadow-sm p-6 md:px-[20px]">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="md:text-2xl text-md font-bold text-gray-800">Your Timesheets </h1>
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
                            {timesheets.map((sheet) => (
                                <tr key={sheet.week}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111928] bg-gray-50">{sheet.week}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280] font-[400]">{sheet.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-[500] rounded-md ${getStatusStyle(sheet.status)}`}>
                                            {sheet.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280] font-[400]">
                                        {sheet.totalHours}/40 hrs
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex justify-start">
                                            <button
                                                className={`text-sm font-medium ${sheet.action === 'View' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                    sheet.action === 'Update' ? 'text-[#1C64F2] hover:text-blue-800' :
                                                        'text-[#1C64F2] hover:text-blue-800'
                                                    }`}
                                                onClick={() => handleActionClick(sheet.action, sheet)}
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