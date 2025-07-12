'use client'
import React, { useState } from 'react';
import { MoreHorizontal, Minus, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTimesheetEntries } from '@/hooks/useTimesheetEntries';
import { format, parseISO } from 'date-fns';

const ListView = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showDropdown, setShowDropdown] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [editForm, setEditForm] = useState({
        id: '',
        task: '',
        hours: '',
        project: '',
        date: '',
        workType: ''
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [addFormData, setAddFormData] = useState({
        task: '',
        hours: 0,
        project: '',
        date: '',
        workType: 'Bug fixes'
    });
    const [selectedDayForAdd, setSelectedDayForAdd] = useState('');

    const {
        timesheetData,
        loading,
        error,
        totalHours,
        currentWeek,
        setCurrentWeek,
        setError,
        handlePrevWeek,
        handleNextWeek,
        addEntry,
        updateEntry,
        deleteEntry,
        getWeekRangeText,
        fetchTimesheetData
    } = useTimesheetEntries();

    React.useEffect(() => {
        const startParam = searchParams.get('start');
        const endParam = searchParams.get('end');
        
        if (startParam && endParam) {
            const startDate = parseISO(startParam);
            setCurrentWeek(startDate);
        }
    }, [searchParams, setCurrentWeek]);

    const toggleDropdown = (dayIndex, entryIndex) => {
        const key = `${dayIndex}-${entryIndex}`;
        setShowDropdown(showDropdown === key ? null : key);
    };

    const handleEdit = (dayIndex, entryIndex) => {
        const entry = timesheetData[dayIndex].entries[entryIndex];
        setEditForm({
            id: entry.id,
            task: entry.task,
            hours: entry.hours,
            project: entry.project,
            workType: entry.workType,
            date: timesheetData[dayIndex].dateString
        });
        setEditingEntry({ dayIndex, entryIndex });
        setShowDropdown(null);
    };

    const handleSaveEdit = async () => {
        if (editingEntry) {
            const { dayIndex, entryIndex } = editingEntry;
            const newHours = parseInt(editForm.hours) || 0;
            
            const currentTotal = totalHours - timesheetData[dayIndex].entries[entryIndex].hours + newHours;
            
            if (currentTotal > 40) {
                setError('Total hours cannot exceed 40 hours per week');
                return;
            }
            
            const success = await updateEntry(editForm.id, {
                description: editForm.task,
                hours: newHours,
                project: editForm.project,
                workType: editForm.workType
            });

            if (success) {
                setEditingEntry(null);
                setEditForm({ id: '', task: '', hours: '', project: '', date: '', workType: '' });
                setError('');
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingEntry(null);
        setEditForm({ id: '', task: '', hours: '', project: '', date: '', workType: '' });
        setError('');
    };

    const handleDelete = async (dayIndex, entryIndex) => {
        const entryId = timesheetData[dayIndex].entries[entryIndex].id;
        await deleteEntry(entryId);
        setShowDropdown(null);
    };

    const handleAddTask = (dateString) => {
        setSelectedDayForAdd(dateString);
        setShowAddForm(true);
        setAddFormData({
            task: '',
            hours: 0,
            project: '',
            date: dateString || format(new Date(), 'yyyy-MM-dd'),
            workType: 'Bug fixes'
        });
        setError('');
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddHoursChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setAddFormData(prev => ({
            ...prev,
            hours: value
        }));
    };

    const incrementAddHours = () => {
        if (totalHours + addFormData.hours + 1 > 40) {
            setError('Total hours cannot exceed 40 hours per week');
            return;
        }
        setAddFormData(prev => ({ ...prev, hours: prev.hours + 1 }));
        setError('');
    };

    const decrementAddHours = () => {
        if (addFormData.hours > 0) {
            setAddFormData(prev => ({ ...prev, hours: prev.hours - 1 }));
            setError('');
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        
        if (!addFormData.task || !addFormData.project) {
            setError('Please fill in all required fields');
            return;
        }

        if (totalHours + addFormData.hours > 40) {
            setError('Total hours cannot exceed 40 hours per week');
            return;
        }

        const success = await addEntry(addFormData);
        if (success) {
            setShowAddForm(false);
            setSelectedDayForAdd('');
            setError('');
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white font-sans border border-gray-200 shadow-md rounded-2xl" style={{ fontFamily: 'Inter' }}>
                <div className="flex justify-center items-center h-64">
                    <p className='text-black'>Loading timesheet data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white font-sans border border-gray-200 shadow-md rounded-2xl" style={{ fontFamily: 'Inter' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl sm:text-2xl font-bold text-[#111928] mb-1 sm:mb-2">This week's timesheet</h1>
                        <div className="flex gap-2">
                            <button 
                                onClick={handlePrevWeek}
                                className="text-black bg-gray-100 font-medium text-sm hover:text-gray-900 px-3 py-1 rounded-2xl shadow-md"
                            >
                                Previous
                            </button>
                            <button 
                                onClick={handleNextWeek}
                                className="text-black bg-gray-100 font-medium text-sm hover:text-gray-900 px-3 py-1 rounded-2xl shadow-md"
                            >
                                Next 
                            </button>
                        </div>
                    </div>
                    <p className="text-[#6B7280] text-sm font-[400]">{getWeekRangeText()}</p>
                </div>
                <div className="text-center relative w-full sm:w-auto">
                    <div className="inline-block mb-2 sm:mb-3 relative">
                        <div className="bg-white rounded-lg px-3 py-2 shadow-lg relative inline-block">
                            <div className="text-gray-900 font-medium text-sm">{totalHours}/40 hrs</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                                border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200"></div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 
                                border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                        </div>
                        <div className="absolute top-5 left-full ml-1 text-xs text-[#6B7280] font-medium hidden sm:block">
                            {Math.round((totalHours / 40) * 100)}%
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center">
                        <div className="w-24 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min((totalHours / 40) * 100, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {showAddForm && (
                <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-black">Add New Task</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <select
                                    name="date"
                                    value={addFormData.date}
                                    onChange={handleAddFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    {timesheetData.map((day) => (
                                        <option 
                                            key={day.dateString} 
                                            value={day.dateString}
                                            selected={day.dateString === selectedDayForAdd}
                                        >
                                            {day.date}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                                <input
                                    type="text"
                                    name="task"
                                    value={addFormData.task}
                                    onChange={handleAddFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                                <input
                                    type="text"
                                    name="project"
                                    value={addFormData.project}
                                    onChange={handleAddFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Work</label>
                                <select
                                    name="workType"
                                    value={addFormData.workType}
                                    onChange={handleAddFormChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="Bug fixes">Bug fixes</option>
                                    <option value="Feature development">Feature development</option>
                                    <option value="Testing">Testing</option>
                                    <option value="Documentation">Documentation</option>
                                    <option value="Code review">Code review</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                                <div className="flex items-center border border-[#D1D5DB] rounded-md overflow-hidden w-fit">
                                    <button
                                        type="button"
                                        onClick={decrementAddHours}
                                        className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] hover:bg-gray-100 focus:outline-none"
                                    >
                                        <Minus size={16} className="text-[#6B7280]" />
                                    </button>
                                    <input
                                        type="number"
                                        name="hours"
                                        value={addFormData.hours}
                                        onChange={handleAddHoursChange}
                                        min="0"
                                        max={40 - totalHours}
                                        className="w-14 h-10 text-[#6B7280] text-center border-x border-gray-300 focus:outline-none focus:ring-0"
                                    />
                                    <button
                                        type="button"
                                        onClick={incrementAddHours}
                                        className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] hover:bg-gray-100 focus:outline-none"
                                    >
                                        <Plus size={16} className="text-gray-800" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                >
                                    Add Task
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setError('');
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-6 sm:space-y-8">
                {timesheetData.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <div className="w-full sm:w-20 flex-shrink-0">
                            <h2 className="text-base sm:text-lg font-semibold text-[#111928]">{day.date}</h2>
                        </div>

                        <div className="flex-1 space-y-3">
                            {day.entries.map((entry, entryIndex) => (
                                <div key={entry.id}>
                                    {editingEntry?.dayIndex === dayIndex && editingEntry?.entryIndex === entryIndex ? (
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
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                                                        <input
                                                            type="number"
                                                            value={editForm.hours}
                                                            onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                                                            max={40 - (totalHours - entry.hours)}
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
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Work</label>
                                                        <select
                                                            value={editForm.workType}
                                                            onChange={(e) => setEditForm({ ...editForm, workType: e.target.value })}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        >
                                                            <option value="Bug fixes">Bug fixes</option>
                                                            <option value="Feature development">Feature development</option>
                                                            <option value="Testing">Testing</option>
                                                            <option value="Documentation">Documentation</option>
                                                            <option value="Code review">Code review</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {error && (
                                                    <div className="text-red-500 text-sm">{error}</div>
                                                )}
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
                                        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 hover:shadow-sm transition-shadow relative">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                                                <div className="flex-1">
                                                    <span className="text-[#111928] font-[500] text-sm sm:text-base">{entry.task}</span>
                                                    <span className="block sm:hidden text-[#9CA3AF] font-[400] text-xs mt-1">{entry.hours} hrs • {entry.workType}</span>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-2">
                                                    <span className="hidden sm:inline text-[#9CA3AF] font-[400] text-xs sm:text-sm">{entry.hours} hrs</span>
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

                            <button
                                onClick={() => handleAddTask(day.dateString)}
                                disabled={totalHours >= 40}
                                className={`w-full border border-dashed rounded-lg p-3 transition-colors cursor-pointer text-center text-sm sm:text-base font-[500] ${
                                    totalHours >= 40 
                                        ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                                        : 'border-[#D1D5DB] hover:border-[#1A56DB] hover:bg-[#E1EFFE] hover:text-[#1A56DB] text-[#6B7280]'
                                }`}
                            >
                                + Add new task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListView;