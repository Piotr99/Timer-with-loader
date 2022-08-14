import { months, days, endOfTime_Y, endOfTime_A } from "./time.js"
import { moveEl } from "./backgroundMove.js"
import todo from "../todo/app.js"

const monthEl = document.querySelector(".times.month")
const dayEl = document.querySelector(".times.day")
const hourEl = document.querySelector(".times.hour")
const minuteEl = document.querySelector(".times.minute")
const secondEl = document.querySelector(".times.second")
let spinner = document.querySelector(".bg__spinner")
let hourText;
let minuteText;
let secondText;
let isLoad = false;

const dateToName = (date, currentDate) => {
    return date[currentDate]
}

const render = (month, day, hour, minute, second, hourT, minuteT, secondT) => {
    loading()
    monthEl.textContent = month;
    dayEl.textContent = day;
    hourEl.textContent = hour;
    minuteEl.textContent = minute;
    secondEl.textContent = second;
    hourText = document.querySelector(".hours > span").textContent;
    hourText = hourT
    minuteText = document.querySelector(".minutes > span").textContent;
    minuteText = minuteT
    secondText = document.querySelector(".seconds > span").textContent;
    secondText = secondT
    document.body.addEventListener("mousemove", moveEl)
}

const loading = () => {
    if (isLoad && document.body.contains(spinner))
        spinner.parentElement.removeChild(spinner)
}

const nameEditing = (time) => {
    let type;
    if (endOfTime_A.indexOf(time) + 1) {
        type = "a"
    } else if (endOfTime_Y.indexOf(time) + 1) {
        type = "y"
    } else {
        type = ""
    }
    return type
}
const getCurrentDate = () => {
    let timeRefresh = setInterval(() => {
        let data = new Date();
        hourText = document.querySelector(".hours > span")
        minuteText = document.querySelector(".minutes > span")
        secondText = document.querySelector(".seconds > span")
        let currentMonth = data.getMonth()
        currentMonth = dateToName(months, currentMonth)
        let currentDay = data.getDay() == 0 ? data.getDay() + 6 : data.getDay()
        currentDay = dateToName(days, currentDay)
        let currentHour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
        hourText.textContent = "godzin" + nameEditing(Number(currentHour))
        let currentMinute = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
        minuteText.textContent = "minut" + nameEditing(Number(currentMinute))
        let currentSecond = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
        secondText.textContent = "sekund" + nameEditing(Number(currentSecond))

        render(currentMonth, currentDay, currentHour, currentMinute, currentSecond, hourText, minuteText, secondText)
    }, 1000)

    todo.todoAddBtn.addEventListener('click', (e) => {
        todo.removeInterval(timeRefresh)
        todo.removeEl(e, todo.timerElements)
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/0b0c462102.js"
        script.setAttribute("crossorigin", "anonymous")
        document.head.appendChild(script)
        if (!todo.timeContainer.classList.contains("hidden"))
            todo.timeContainer.classList.add("hidden")

        todo.addToDoBase()
    })

    isLoad = true
}
getCurrentDate()

