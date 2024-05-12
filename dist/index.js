import { datePicker } from './date-picker.js';

document.addEventListener('DOMContentLoaded', () => {
    const DatePicker = datePicker();
    const datePickerInput = document.querySelector('.date-picker-input');
    const datePickerElement = document.querySelector('.date-picker');
    const monthDropDownElement = document.querySelector('.date-picker-month')
    const yearDropDownElement = document.querySelector('.date-picker-year')
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()





    const handlebarContentInjector = (elementToAppendTo, template, data) => {
        const compiled = Handlebars.compile(template);
        const hbsString = compiled(data);
        var div = document.createElement('div');
        div.innerHTML = hbsString;
        elementToAppendTo.appendChild(div);
    };

    datePickerInput.addEventListener('click', () => {
        datePickerElement.classList.toggle('show');
    });

    const handleMonthOrYearChange = () => {

        console.log(currentYear, currentMonth + 1)
        const days = DatePicker.getDaysInMonth(currentYear, currentMonth + 1);
        const arrangedDays = DatePicker.arrangeDays(days, DatePicker.getFirstDayOfMonth(currentYear, currentMonth));
        const datePickerDaysTemplate = document.getElementById('date-picker-template').innerHTML;
        // console.log(arrangedDays)
        console.log(datePickerElement, datePickerDaysTemplate, arrangedDays)
        handlebarContentInjector(datePickerElement, datePickerDaysTemplate, arrangedDays);
    }



    const init = () => {
        const currentCalendar = document.querySelector('.calendar')
        if (currentCalendar) currentCalendar.remove()
        // Select the month and year dropdowns
        const monthDropdown = document.querySelector('.date-picker-month');
        const yearDropdown = document.querySelector('.date-picker-year');
        // Set the value of the dropdowns to the current month and year
        monthDropdown.value = currentMonth;
        yearDropdown.value = currentYear;
        const days = DatePicker.getDaysInMonth(currentYear, currentMonth + 1);
        const arrangedDays = DatePicker.arrangeDays(days, DatePicker.getFirstDayOfMonth(currentYear, currentMonth));
        const datePickerDaysTemplate = document.getElementById('date-picker-template').innerHTML;
        console.log(arrangedDays)
        handlebarContentInjector(datePickerElement, datePickerDaysTemplate, arrangedDays);
        const datePickerDayElements = document.querySelectorAll('.date-picker-day')
        datePickerDayElements.forEach(datePickerDayElement => {
            datePickerDayElement.addEventListener('click', () => {
                datePickerDayElements.forEach(datePickerDayElement => {
                    datePickerDayElement.classList.remove('selected');
                })
                datePickerDayElement.classList.toggle('selected');
                console.log(+datePickerDayElement.innerHTML, currentMonth, currentYear)
                datePickerInput.value = DatePicker.formatDate(+datePickerDayElement.innerHTML, currentMonth + 1, currentYear);
                datePickerElement.classList.toggle('show');
            })
        })
    }

    monthDropDownElement.addEventListener('change', (e) => {
        console.log(e.target.value)
        currentMonth = +e.target.value;
        init()
    })

    yearDropDownElement.addEventListener('change', (e) => {
        currentYear = +e.target.value;
        init()
    })

    init()
    datePickerElement.classList.toggle('show');
});
