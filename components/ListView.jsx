'use client'
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const TimesheetInterface = () => {
  const [showDropdown, setShowDropdown] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [timesheetData, setTimesheetData] = useState([
    {
      date: 'Jan 21',
      entries: [
        { id: 1, task: 'Homepage Development', hours: 4, project: 'Project Name' },
        { id: 2, task: 'Homepage Development', hours: 4, project: 'Project Name' },
      ],
    },
    {
      date: 'Jan 22',
      entries: [
        { id: 3, task: 'Homepage Development', hours: 4, project: 'Project Name' },
        { id: 4, task: 'Homepage Development', hours: 4, project: 'Project Name' },
        { id: 5, task: 'Homepage Development', hours: 4, project: 'Project Name' },
      ],
    },
    {
      date: 'Jan 23',
      entries: [
        { id: 6, task: 'Homepage Development', hours: 4, project: 'Project Name' },
        { id: 7, task: 'Homepage Development', hours: 4, project: 'Project Name' },
        { id: 8, task: 'Homepage Development', hours: 4, project: 'Project Name' },
      ],
    },
    {
      date: 'Jan 23',
      entries: [
      ],
    }
  ]);

  const [editForm, setEditForm] = useState({
    task: '',
    hours: '',
    project: ''
  });

  const toggleDropdown = (dayIndex, entryIndex) => {
    const key = `${dayIndex}-${entryIndex}`;
    setShowDropdown(showDropdown === key ? null : key);
  };

  const handleEdit = (dayIndex, entryIndex) => {
    const entry = timesheetData[dayIndex].entries[entryIndex];
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
      const newData = [...timesheetData];
      newData[dayIndex].entries[entryIndex] = {
        ...newData[dayIndex].entries[entryIndex],
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
    const newData = [...timesheetData];
    newData[dayIndex].entries.splice(entryIndex, 1);
    setTimesheetData(newData);
    setShowDropdown(null);
  };

  const totalHours = timesheetData.reduce((total, day) =>
    total + day.entries.reduce((dayTotal, entry) => dayTotal + entry.hours, 0), 0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans border border-gray-200 shadow-md rounded-2xl ">

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-[#111928] mb-2">This week's timesheet</h1>
          <p className="text-[#6B7280] text-sm font-[400]">21 - 26 January, 2024</p>
        </div>
        <div className="text-center relative">
          <div className="inline-block mb-3 relative">

            <div className="bg-white rounded-lg px-3 py-2 shadow-lg relative inline-block">
              <div className="text-gray-900 font-medium text-sm">{totalHours}/40 hrs</div>


              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
        border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-200"></div>

              <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 
        border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
            </div>


            <div className="absolute top-5 left-full ml-1 text-xs text-[#6B7280] font-medium">
              100%
            </div>
          </div>


          <div className="flex items-center gap-3 justify-center">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(totalHours / 40) * 100}%` }}></div>
            </div>
          </div>
        </div>

      </div>


      <div className="space-y-8">
        {timesheetData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex gap-8">

            <div className="w-20 flex-shrink-0">
              <h2 className="text-[18px] font-semibold text-[#111928]">{day.date}</h2>
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

                    <div className="bg-white border border-[E5E7EB] rounded-lg p-3 hover:shadow-sm transition-shadow relative">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-[#111928] font-[500] tetx-[16px]">{entry.task}</span>
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


              <Link href="/addnewentry">
                <div className="border border-dashed hover:border-[#1A56DB] border-[#D1D5DB] hover:bg-[#E1EFFE] rounded-lg p-3  transition-colors cursor-pointer">
                  <button className="w-full text-center hover:text-[#1A56DB] text-[#6B7280] text-[16px] font-[500]">
                    + Add new task
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesheetInterface;