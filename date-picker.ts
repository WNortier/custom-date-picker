
export const datePicker = () => {

    const getAllYears = (): number[] => {
        const years = [];

        for (let i = 1900; i <= 2100; i++) {
            years.push(i);
        }

        return years;
    }

    const getDaysInMonth = (year: number, month: number): number[] => {
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date).getDate());
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

    const getFirstDayOfMonth = (year: number, month: number): number => {
        return new Date(year, month, 1).getDay();
    }

    const arrangeDays = (days: number[], firstDay: number): any[] => {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const arrangedDays = [];
        let week: { [key: string]: number | null } = {};
        let dayIndex = 0;

        for (let i = 0; i < 7; i++) {
            if (i < firstDay || dayIndex >= days.length) {
                week[weekDays[i]] = null;
            } else {
                week[weekDays[i]] = days[dayIndex];
                dayIndex++;
            }
        }

        arrangedDays.push(week);

        while (dayIndex < days.length) {
            week = {};
            for (let i = 0; i < 7; i++) {
                if (dayIndex < days.length) {
                    week[weekDays[i]] = days[dayIndex];
                    dayIndex++;
                } else {
                    week[weekDays[i]] = null;
                }
            }
            arrangedDays.push(week);
        }

        return arrangedDays;
    }

    const getMonthNames = (): string[] => {
        const months = [];

        for (let i = 0; i < 12; i++) {
            const monthName = new Date(0, i).toLocaleString('default', { month: 'long' });
            months.push(monthName);
        }

        return months;
    }

    const formatDate = (day: number, month: number, year: number) => {
        const date = new Date(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
        const dateString = date.toISOString().split('T')[0].replace(/-/g, '/');
        return dateString;
    }

    return {
        getAllYears,
        getDaysInMonth,
        getMonthNames,
        getFirstDayOfMonth,
        arrangeDays,
        formatDate
    }
}
