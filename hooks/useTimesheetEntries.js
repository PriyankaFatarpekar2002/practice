import { useState, useEffect } from 'react';
import { db } from '@/libs/firebaseconfig';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { format, parseISO, eachDayOfInterval, isSameDay, addDays } from 'date-fns';

export const useTimesheetEntries = (initialDate = '2025-07-01') => {
    const [timesheetData, setTimesheetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentWeek, setCurrentWeek] = useState(new Date(initialDate));
    const [error, setError] = useState('');
    const [totalHours, setTotalHours] = useState(0);

    const getWeekRange = (date) => {
        const start = new Date(date);
        const end = addDays(start, 5);
        return { start, end };
    };

    const formatDay = (date) => {
        return format(date, 'MMM dd');
    };

    const fetchTimesheetData = async () => {
        setLoading(true);
        setError('');
        try {
            const { start, end } = getWeekRange(currentWeek);
            
            const q = query(
                collection(db, "AddNewEntry"),
                where("date", ">=", format(start, 'yyyy-MM-dd')),
                where("date", "<=", format(end, 'yyyy-MM-dd'))
            );
            
            const querySnapshot = await getDocs(q);
            const entries = [];
            
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                entries.push({
                    id: doc.id,
                    date: data.date,
                    task: data.description,
                    hours: data.hours,
                    project: data.project,
                    workType: data.workType,
                    createdAt: data.createdAt?.toDate() || new Date()
                });
            });

            const daysInWeek = eachDayOfInterval({
                start: start,
                end: end
            });

            const weekData = daysInWeek.map(day => {
                const dayEntries = entries.filter(entry => 
                    isSameDay(parseISO(entry.date), day)
                );
                
                return {
                    date: formatDay(day),
                    fullDate: day,
                    dateString: format(day, 'yyyy-MM-dd'),
                    entries: dayEntries.map(entry => ({
                        id: entry.id,
                        task: entry.task,
                        hours: entry.hours,
                        project: entry.project,
                        workType: entry.workType
                    }))
                };
            });

            const calculatedTotal = weekData.reduce((total, day) =>
                total + day.entries.reduce((dayTotal, entry) => dayTotal + entry.hours, 0), 0
            );

            setTimesheetData(weekData);
            setTotalHours(calculatedTotal);
        } catch (err) {
            console.error("Error fetching timesheet data: ", err);
            setError('Failed to fetch timesheet data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePrevWeek = () => {
        setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    };

    const addEntry = async (entryData) => {
        try {
            await addDoc(collection(db, "AddNewEntry"), {
                description: entryData.task,
                hours: entryData.hours,
                project: entryData.project,
                workType: entryData.workType,
                date: entryData.date,
                createdAt: new Date()
            });
            await fetchTimesheetData();
            return true;
        } catch (err) {
            console.error("Error adding document: ", err);
            setError('Failed to add entry. Please try again.');
            return false;
        }
    };

    const updateEntry = async (entryId, updateData) => {
        try {
            const entryRef = doc(db, "AddNewEntry", entryId);
            await updateDoc(entryRef, updateData);
            await fetchTimesheetData();
            return true;
        } catch (err) {
            console.error("Error updating document: ", err);
            setError('Failed to update entry. Please try again.');
            return false;
        }
    };

    const deleteEntry = async (entryId) => {
        try {
            await deleteDoc(doc(db, "AddNewEntry", entryId));
            await fetchTimesheetData();
            return true;
        } catch (err) {
            console.error("Error deleting document: ", err);
            setError('Failed to delete entry. Please try again.');
            return false;
        }
    };

    useEffect(() => {
        fetchTimesheetData();
    }, [currentWeek]);

    const getWeekRangeText = () => {
        const { start, end } = getWeekRange(currentWeek);
        return `${format(start, 'dd')} - ${format(end, 'dd MMMM')}, ${format(end, 'yyyy')}`;
    };

    return {
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
    };
};