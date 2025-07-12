'use client'
import React, { useState } from 'react';
import { X, HelpCircle, Plus, Minus } from 'lucide-react';

export default function AddNewEntry() {
    const [formData, setFormData] = useState({
        project: '',
        workType: 'Bug fixes',
        description: '',
        hours: 12
    });

    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      
    };

    const handleCancel = () => {
        setIsOpen(false);
        e
    };

    const incrementHours = () => {
        setFormData(prev => ({ ...prev, hours: prev.hours + 1 }));
    };

    const decrementHours = () => {
        if (formData.hours > 0) {
            setFormData(prev => ({ ...prev, hours: prev.hours - 1 }));
        }
    };

    const handleHoursChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setFormData(prev => ({ ...prev, hours: value }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200  flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[640px] h-[560px] overflow-y-auto scrollbar-hide">


                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-[18px] font-[600] text-[#111928]">Add New Entry</h2>
                    <button
                        onClick={handleCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>


                <div className="p-6 space-y-6">

                    <div>
                        <label className="flex items-center gap-2 text-sm font-[500] text-[#111928] mb-2">
                            Select Project
                            <span className="text-[#111928] text-sm font-[500]">*</span>
                            <HelpCircle size={14} className="text-gray-400" />
                        </label>
                        <div className="relative">
                            <select
                                value={formData.project}
                                onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-[#111928] placeholder-[#6B7280] text-sm font-[500] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                required
                            >
                                <option value="" disabled hidden>
                                    Project Name
                                </option>
                                <option value="project1">Project 1</option>
                                <option value="project2">Project 2</option>
                                <option value="project3">Project 3</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                    </div>


                    <div>
                        <label className="flex items-center gap-2 text-[#111928] placeholder-[#6B7280] text-sm font-[500] mb-2">
                            Type of Work
                            <span className="text-[#111928] text-sm font-[500]">*</span>
                            <HelpCircle size={14} className="text-gray-400" />
                        </label>
                        <div className="relative">
                            <select
                                value={formData.workType}
                                onChange={(e) => setFormData(prev => ({ ...prev, workType: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                required
                            >
                                <option value="Bug fixes">Bug fixes</option>
                                <option value="Feature development">Feature development</option>
                                <option value="Testing">Testing</option>
                                <option value="Documentation">Documentation</option>
                                <option value="Code review">Code review</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <div>
                        <label className="flex items-center gap-2 text-sm font-[500] text-[#111928] mb-2">
                            Task description
                            <span className="text-[#111928] text-sm font-[500]">*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Write text here ..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[#111928] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={4}
                            required
                        />
                        <p className="text-xs text-[#6B7280] mt-1">A note for extra info</p>
                    </div>


                    <div>
                        <label className="flex items-center gap-2 text-sm font-[500] text-[#111928] mb-2">
                            Hours
                            <span className="text-[#111928] text-sm font-[500]">*</span>
                        </label>

                        <div className="flex items-center border border-[#D1D5DB] rounded-md overflow-hidden w-fit">
                            <button
                                type="button"
                                onClick={decrementHours}
                                className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] hover:bg-gray-100 focus:outline-none"
                            >
                                <Minus size={16} className="text-[#6B7280]" />
                            </button>
                            <input
                                type="number"
                                value={formData.hours}
                                onChange={handleHoursChange}
                                min="0"
                                className="w-14 h-10 text-[#6B7280] text-center border-x border-gray-300 focus:outline-none focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={incrementHours}
                                className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] hover:bg-gray-100 focus:outline-none"
                            >
                                <Plus size={16} className="text-gray-800" />
                            </button>
                        </div>
                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex-1 bg-[#1C64F2] text-white text-sm font-[500] py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none ansition-colors"
                        >
                            Add entry
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-6 py-2 text-[#111928] text-sm font-[500] focus:outline-none transition-colors border border-[#E5E7EB] rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}