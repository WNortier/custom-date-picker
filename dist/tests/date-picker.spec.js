import { datePicker } from '../date-picker';
const DatePicker = datePicker();
describe('getAllYears', () => {
    it('should return an array containing the years 1900 through 2100', () => {
        const allYears = DatePicker.getAllYears();
        expect(allYears).toContain(1900);
        expect(allYears).toContain(1901);
        expect(allYears).toContain(2100);
        expect(allYears).not.toContain(1899);
        expect(allYears).toHaveLength(201);
    });
});
describe('getDaysInMonth', () => {
    it('should return all the days in a particular month for a particular year (January 2020)', () => {
        const daysForJanuary2020 = DatePicker.getDaysInMonth(2020, 0);
        expect(daysForJanuary2020).toHaveLength(31);
        expect(daysForJanuary2020[0]).toBe(1);
        expect(daysForJanuary2020[30]).toBe(31);
    });
    it('should return all the days in a particular month for a particular year (February 1900)', () => {
        const daysForFebruary1900 = DatePicker.getDaysInMonth(1900, 1);
        expect(daysForFebruary1900).toHaveLength(28);
        expect(daysForFebruary1900[0]).toBe(1);
        expect(daysForFebruary1900[27]).toBe(28);
    });
});
describe('getFirstDayOfMonth', () => {
    const getFirstDayOfMonth = DatePicker.getFirstDayOfMonth(2020, 0);
    expect(getFirstDayOfMonth).toBe(3);
});
describe('getMonthNames', () => {
    it('should return an array containing all the month names', () => {
        const monthNames = DatePicker.getMonthNames();
        expect(monthNames).toHaveLength(12);
        expect(monthNames).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    });
});
describe('arrangeDays', () => {
    it('should arrange the days in a fashion which is fit for output using handlebars (The first of May 2024 starts on Wednesday)', () => {
        const days = DatePicker.getDaysInMonth(2024, 4); // May 2024
        const getFirstDayOfMonth = DatePicker.getFirstDayOfMonth(2024, 4); // May 2024
        const arrangedDays = DatePicker.arrangeDays(days, getFirstDayOfMonth);
        expect(arrangedDays).toHaveLength(5);
        expect(arrangedDays[0]).toEqual({
            Sunday: null,
            Monday: null,
            Tuesday: null,
            Wednesday: 1,
            Thursday: 2,
            Friday: 3,
            Saturday: 4
        });
        expect(arrangedDays[1]).toEqual({
            Sunday: 5,
            Monday: 6,
            Tuesday: 7,
            Wednesday: 8,
            Thursday: 9,
            Friday: 10,
            Saturday: 11
        });
    });
});
describe('formatDate', () => {
    it('should format a given date input of d, m, yyyy and output it as a string in the following format YYYY/MM/DD', () => {
        const date = DatePicker.formatDate(1, 5, 2024); // May 2024
        expect(date).toBe('2024/05/01');
    });
});
