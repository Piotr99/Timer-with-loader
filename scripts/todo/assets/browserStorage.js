import { timeContainer } from "../app.js"
let tasks = []
const addToSS = (text) => {
    tasks.push(text)
    sessionStorage.setItem("tasks", JSON.stringify(tasks))
}

const removeSessionStorage = (elementToChange) => {
    tasks.splice(tasks.indexOf(elementToChange), 1)
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

const getFromSessionStorage = () => {
    if (sessionStorage.getItem("tasks")) {
        JSON.parse(sessionStorage.getItem("tasks")).forEach((task) => {
            const item = document.createElement("span");
            const list = document.querySelector("ul");

            const icon = document.createElement("span");
            const listEl = document.createElement("li");
            item.className = "item"
            addToSS(task)
            item.textContent = task
            // icon.className = "fa fa-trash"

            listEl.appendChild(item)
            listEl.appendChild(icon)

            list.appendChild(listEl);

        })
        if (timeContainer.classList.contains("hidden")) {
            timeContainer.classList.remove("hidden")
        }
    }
}


export default {
    addToSS,
    removeSessionStorage,
    getFromSessionStorage
}
