'use client'
import React, { useState } from 'react';
import { MoreHorizontal, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DynamicTimesheetSystem = () => {
    const [currentView, setCurrentView] = useState('table');
    const [selectedWeek, setSelectedWeek] = useState(null);

    // Complete timesheet data for all weeks
    const allTimesheetData = {
        1: {
            weekInfo: { week: 1, date: '1 - 5 January, 2024', status: 'COMPLETED' },
            days: [
                {
                    date: 'Jan 1',
                    entries: [
                        { id: 1, task: 'Project Planning', hours: 8, project: 'Website Redesign' },
                        { id: 2, task: 'Client Meeting', hours: 2, project: 'Website Redesign' },
                    ],
                },
                {
                    date: 'Jan 2',
                    entries: [
                        { id: 3, task: 'Database Design', hours: 6, project: 'E-commerce App' },
                        { id: 4, task: 'Code Review', hours: 2, project: 'E-commerce App' },
                    ],
                },
                {
                    date: 'Jan 3',
                    entries: [
                        { id: 16, task: 'UI Prototyping', hours: 6, project: 'Website Redesign' },
                        { id: 17, task: 'Team Sync', hours: 1, project: 'Internal' },
                    ],
                },
                {
                    date: 'Jan 4',
                    entries: [
                        { id: 18, task: 'Database Migration', hours: 7, project: 'E-commerce App' },
                    ],
                },
                {
                    date: 'Jan 5',
                    entries: [
                        { id: 19, task: 'Code Deployment', hours: 4, project: 'Website Redesign' },
                        { id: 20, task: 'Documentation', hours: 3, project: 'E-commerce App' },
                    ],
                },
            ]
        },
        2: {
            weekInfo: { week: 2, date: '8 - 12 January, 2024', status: 'COMPLETED' },
            days: [
                {
                    date: 'Jan 8',
                    entries: [
                        { id: 5, task: 'Frontend Development', hours: 8, project: 'Dashboard UI' },
                    ],
                },
                {
                    date: 'Jan 9',
                    entries: [
                        { id: 6, task: 'API Integration', hours: 6, project: 'Dashboard UI' },
                        { id: 7, task: 'Testing', hours: 2, project: 'Dashboard UI' },
                    ],
                },
                {
                    date: 'Jan 10',
                    entries: [
                        { id: 21, task: 'Performance Optimization', hours: 7, project: 'Dashboard UI' },
                    ],
                },
                {
                    date: 'Jan 11',
                    entries: [
                        { id: 22, task: 'Bug Fixing', hours: 5, project: 'Dashboard UI' },
                        { id: 23, task: 'Code Review', hours: 2, project: 'Dashboard UI' },
                    ],
                },
                {
                    date: 'Jan 12',
                    entries: [
                        { id: 24, task: 'Client Demo', hours: 3, project: 'Dashboard UI' },
                    ],
                },
            ]
        },
        3: {
            weekInfo: { week: 3, date: '15 - 19 January, 2024', status: 'INCOMPLETE' },
            days: [
                {
                    date: 'Jan 15',
                    entries: [
                        { id: 8, task: 'Homepage Development', hours: 4, project: 'Project Alpha' },
                        { id: 9, task: 'Homepage Development', hours: 4, project: 'Project Alpha' },
                    ],
                },
                {
                    date: 'Jan 16',
                    entries: [
                        { id: 10, task: 'Backend API', hours: 6, project: 'Project Alpha' },
                    ],
                },
                {
                    date: 'Jan 17',
                    entries: [
                        { id: 25, task: 'Database Schema Design', hours: 7, project: 'Project Alpha' },
                    ],
                },
                {
                    date: 'Jan 18',
                    entries: [
                        { id: 26, task: 'API Documentation', hours: 4, project: 'Project Alpha' },
                        { id: 27, task: 'Standup Meeting', hours: 1, project: 'Internal' },
                    ],
                },
                {
                    date: 'Jan 19',
                    entries: [
                        { id: 28, task: 'Security Audit', hours: 5, project: 'Project Alpha' },
                    ],
                },
            ]
        },
        4: {
            weekInfo: { week: 4, date: '22 - 26 January, 2024', status: 'COMPLETED' },
            days: [
                {
                    date: 'Jan 22',
                    entries: [
                        { id: 11, task: 'Homepage Development', hours: 4, project: 'Project Name' },
                        { id: 12, task: 'Homepage Development', hours: 4, project: 'Project Name' },
                    ],
                },
                {
                    date: 'Jan 23',
                    entries: [
                        { id: 13, task: 'Homepage Development', hours: 4, project: 'Project Name' },
                        { id: 14, task: 'Homepage Development', hours: 4, project: 'Project Name' },
                        { id: 15, task: 'Homepage Development', hours: 4, project: 'Project Name' },
                    ],
                },
                {
                    date: 'Jan 24',
                    entries: [
                        { id: 29, task: 'Content Management', hours: 6, project: 'Project Name' },
                    ],
                },
                {
                    date: 'Jan 25',
                    entries: [
                        { id: 30, task: 'SEO Optimization', hours: 5, project: 'Project Name' },
                        { id: 31, task: 'Analytics Setup', hours: 2, project: 'Project Name' },
                    ],
                },
                {
                    date: 'Jan 26',
                    entries: [
                        { id: 32, task: 'Final Testing', hours: 7, project: 'Project Name' },
                    ],
                },
            ]
        },
        5: {
            weekInfo: { week: 5, date: '28 January - 1 February, 2024', status: 'MISSING' },
            days: []
        }
    };
    const [timesheetData, setTimesheetData] = useState(allTimesheetData);

    const TableView = () => {
        const timesheets = Object.values(timesheetData).map(week => ({
            ...week.weekInfo,
            action: week.weekInfo.status === 'COMPLETED' ? 'View' :
                week.weekInfo.status === 'INCOMPLETE' ? 'Update' : 'Create'
        }));

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
            setSelectedWeek(week);
            setCurrentView('timesheet');
        };

        return (
            <div className="min-h-screen bg-gray-50 p-6 px-[100px]">
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
                                                {sheet.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex justify-start">
                                                <button
                                                    className="text-sm font-medium text-[#1C64F2] hover:text-blue-800"
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

    const TimesheetInterface = () => {
        const [showDropdown, setShowDropdown] = useState(null);
        const [editingEntry, setEditingEntry] = useState(null);
        const [editForm, setEditForm] = useState({
            task: '',
            hours: '',
            project: ''
        });

        const currentWeekData = timesheetData[selectedWeek];
        const currentTimesheetData = currentWeekData?.days || [];

        const toggleDropdown = (dayIndex, entryIndex) => {
            const key = `${dayIndex}-${entryIndex}`;
            setShowDropdown(showDropdown === key ? null : key);
        };

        const handleEdit = (dayIndex, entryIndex) => {
            const entry = currentTimesheetData[dayIndex].entries[entryIndex];
            setEditForm({
                task: entry.task,
                hours: entry.hours,
                project: entry.project
            });
            setEditingEntry({ dayIndex, entryIndex });
            setShowDropdown(null);
        };

        const handleSaveEdit = () => {
            if (editingEntry) {
                const { dayIndex, entryIndex } = editingEntry;
                const newData = { ...timesheetData };
                newData[selectedWeek].days[dayIndex].entries[entryIndex] = {
                    ...newData[selectedWeek].days[dayIndex].entries[entryIndex],
                    task: editForm.task,
                    hours: parseInt(editForm.hours) || 0,
                    project: editForm.project
                };
                setTimesheetData(newData);
                setEditingEntry(null);
                setEditForm({ task: '', hours: '', project: '' });
            }
        };

        const handleCancelEdit = () => {
            setEditingEntry(null);
            setEditForm({ task: '', hours: '', project: '' });
        };

        const handleDelete = (dayIndex, entryIndex) => {
            const newData = { ...timesheetData };
            newData[selectedWeek].days[dayIndex].entries.splice(entryIndex, 1);
            setTimesheetData(newData);
            setShowDropdown(null);
        };

        const totalHours = currentTimesheetData.reduce((total, day) =>
            total + day.entries.reduce((dayTotal, entry) => dayTotal + entry.hours, 0), 0
        );

        const handleAddNewTask = () => {
            // For demo purposes, we'll add a new entry to the first day
            // In a real app, this would open a form or modal
            const newData = { ...timesheetData };
            if (newData[selectedWeek].days.length === 0) {
                newData[selectedWeek].days.push({
                    date: 'New Date',
                    entries: []
                });
            }

            const newEntry = {
                id: Date.now(),
                task: 'New Task',
                hours: 0,
                project: 'New Project'
            };

            newData[selectedWeek].days[0].entries.push(newEntry);
            setTimesheetData(newData);
        };

        return (
            <div className="max-w-6xl mx-auto p-6 bg-white font-sans border border-gray-200 shadow-md rounded-2xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentView('table')}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-[24px] font-bold text-[#111928] mb-2">
                                Week {selectedWeek}'s timesheet
                            </h1>
                            <p className="text-[#6B7280] text-sm font-[400]">
                                {currentWeekData?.weekInfo.date}
                            </p>
                        </div>
                    </div>
                    <div className="text-center relative">
                        <div className="inline-block mb-3 relative">
                            {/* Tooltip Box */}
                            <div className="bg-white rounded-lg px-3 py-2 shadow-lg relative inline-block">
                                <div className="text-gray-900 font-medium text-sm">{totalHours}/40 hrs</div>

                                {/* Tooltip Arrow - Outer (gray) */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                  border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200"></div>
                                {/* Tooltip Arrow - Inner (white) */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 
                  border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                            </div>

                            {/* Percentage Text */}
                            <div className="absolute top-5 left-full ml-1 text-xs text-[#6B7280] font-medium">
                                {Math.round((totalHours / 40) * 100)}%
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex items-center gap-3 justify-center">
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(totalHours / 40) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timesheet entries */}
                <div className="space-y-8">
                    {currentTimesheetData.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg mb-4">No entries found for this week</p>
                            <button
                                onClick={handleAddNewTask}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add First Entry
                            </button>
                        </div>
                    ) : (
                        currentTimesheetData.map((day, dayIndex) => (
                            <div key={dayIndex} className="flex gap-8">
                                {/* Date on the left */}
                                <div className="w-20 flex-shrink-0">
                                    <h2 className="text-[18px] font-semibold text-[#111928]">{day.date}</h2>
                                </div>

                                {/* Entries on the right */}
                                <div className="flex-1 space-y-3">
                                    {day.entries.map((entry, entryIndex) => (
                                        <div key={entry.id}>
                                            {editingEntry?.dayIndex === dayIndex && editingEntry?.entryIndex === entryIndex ? (
                                                // Edit mode
                                                <div className="bg-white border border-blue-200 rounded-lg p-4">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                                                            <input
                                                                type="text"
                                                                value={editForm.task}
                                                                onChange={(e) => setEditForm({ ...editForm, task: e.target.value })}
                                                                className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                                                                <input
                                                                    type="number"
                                                                    value={editForm.hours}
                                                                    onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                                                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                                                                <input
                                                                    type="text"
                                                                    value={editForm.project}
                                                                    onChange={(e) => setEditForm({ ...editForm, project: e.target.value })}
                                                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2 pt-2">
                                                            <button
                                                                onClick={handleSaveEdit}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancelEdit}
                                                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // View mode
                                                <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 hover:shadow-sm transition-shadow relative">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <span className="text-[#111928] font-[500] text-[16px]">{entry.task}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[#9CA3AF] font-[400] text-sm">{entry.hours} hrs</span>
                                                            <span className="text-[#1E429F] text-xs font-[400] cursor-pointer bg-[#E1EFFE] p-1 rounded-lg hover:text-blue-800">
                                                                {entry.project}
                                                            </span>
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => toggleDropdown(dayIndex, entryIndex)}
                                                                    className="p-1 hover:bg-gray-100 rounded"
                                                                >
                                                                    <MoreHorizontal size={16} className="text-[#6B7280]" />
                                                                </button>

                                                                {showDropdown === `${dayIndex}-${entryIndex}` && (
                                                                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-24">
                                                                        <button
                                                                            onClick={() => handleEdit(dayIndex, entryIndex)}
                                                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(dayIndex, entryIndex)}
                                                                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Add new task button */}
                                    <div className="border border-dashed border-[#1A56DB] bg-[#E1EFFE] rounded-lg p-3 hover:border-blue-400 transition-colors cursor-pointer">
                                        <button
                                            onClick={handleAddNewTask}
                                            className="w-full text-center text-[#1A56DB] text-[16px] font-[500]"
                                        >
                                            + Add new task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='bg-gray-50'>
            <div>
                <Header />
            </div>
            <div className='mt-[30px]'>
                {currentView === 'table' ? <TableView /> : <TimesheetInterface />}
            </div>
            <div className='mt-[30px]'>
                <Footer />
            </div>
        </div>
    );
};

export default DynamicTimesheetSystem;