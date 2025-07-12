import { useState, useEffect } from 'react';
import { db } from '@/libs/firebaseconfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, addDays, addWeeks, subWeeks, parseISO } from 'date-fns';

export const useTimesheets = (initialDate = '2025-07-01', weeksToShow = 5) => {
    const [timesheets, setTimesheets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(parseISO(initialDate));
    const [error, setError] = useState(null);

    const fetchTimesheetData = async () => {
        setLoading(true);
        setError(null);
        try {
            const weeksData = [];
            const currentDateObj = new Date(); 

            for (let i = 0; i < weeksToShow; i++) {
                const weekStart = addWeeks(currentDate, i);
                const weekEnd = addDays(weekStart, 5);

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
                if (weekStart > currentDateObj) {
                    status = 'MISSING';  
                } else if (totalHours === 0) {
                    status = 'MISSING';  
                } else if (totalHours >= 40) {
                    status = 'COMPLETED'; 
                } else {
                    status = 'INCOMPLETE'; 
                }

                const dateDisplay = `${format(weekStart, 'd MMM')} to ${format(weekEnd, 'd MMM')}`;

                weeksData.push({
                    week: i + 1,
                    date: dateDisplay,
                    status,
                    action: status === 'COMPLETED' ? 'View' : 
                           status === 'INCOMPLETE' ? 'Update' : 'Create',
                    weekStart: format(weekStart, 'yyyy-MM-dd'),
                    weekEnd: format(weekEnd, 'yyyy-MM-dd'),
                    totalHours,
                    weekDate: weekStart
                });
            }

            setTimesheets(weeksData);
        } catch (err) {
            console.error("Error fetching timesheet data: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Rest of your code remains exactly the same...
    const handlePrevWeeks = () => {
        setCurrentDate(subWeeks(currentDate, weeksToShow));
    };

    const handleNextWeeks = () => {
        setCurrentDate(addWeeks(currentDate, weeksToShow));
    };

    useEffect(() => {
        fetchTimesheetData();
    }, [currentDate]);

    return {
        timesheets,
        loading,
        error,
        handlePrevWeeks,
        handleNextWeeks,
        getStatusStyle: (status) => {
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
        }
    };
};