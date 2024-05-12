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



    const init = () => {
        const currentCalendar = document.querySelector('.calendar')
        if (currentCalendar) currentCalendar.remove()
        const monthDropdown = document.querySelector('.date-picker-month');
        const yearDropdown = document.querySelector('.date-picker-year');
        monthDropdown.value = currentMonth;
        yearDropdown.value = currentYear;
        const days = DatePicker.getDaysInMonth(currentYear, currentMonth);
        const arrangedDays = DatePicker.arrangeDays(days, DatePicker.getFirstDayOfMonth(currentYear, currentMonth));
        const datePickerDaysTemplate = document.getElementById('date-picker-template').innerHTML;
        handlebarContentInjector(datePickerElement, datePickerDaysTemplate, arrangedDays);
        const datePickerDayElements = document.querySelectorAll('.date-picker-day')
        datePickerDayElements.forEach(datePickerDayElement => {
            datePickerDayElement.addEventListener('click', () => {
                datePickerDayElements.forEach(datePickerDayElement => {
                    datePickerDayElement.classList.remove('selected');
                })
                datePickerDayElement.classList.toggle('selected');
                datePickerInput.value = DatePicker.formatDate(+datePickerDayElement.innerHTML, currentMonth + 1, currentYear);
                datePickerElement.classList.toggle('show');
            })
        })
    }

    const handleMonthIncrement = () => {
        switch (currentMonth) {
            case 11: {
                if (currentYear !== 2030) {
                    currentMonth = 0;
                    currentYear++
                    break;
                }
                break;
            }
            default: {
                currentMonth++
                break;
            }
        }
        init()
    }

    document.querySelector('.date-picker-next').addEventListener(('click'), handleMonthIncrement)

    const handleMonthDecrement = () => {
        switch (currentMonth) {
            case 0: {
                if (currentYear !== 2020) {
                    currentMonth = 11;
                    currentYear--
                    break;
                }
                break;
            }
            default: {
                currentMonth--
                break;
            }
        }
        init();
    }

    document.querySelector('.date-picker-prev').addEventListener(('click'), handleMonthDecrement)

    monthDropDownElement.addEventListener('change', (e) => {
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
