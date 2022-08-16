import { timeContainer } from "../app.js"
let tasks = []
const addToLS = (text) => {
    tasks.push(text)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const removeLocalStorage = (elementToChange) => {
    tasks.splice(tasks.indexOf(elementToChange), 1)
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const getFromLocalStorage = () => {
    if (localStorage.getItem("tasks")) {
        JSON.parse(localStorage.getItem("tasks")).forEach((task) => {
            const item = document.createElement("span");
            const list = document.querySelector("ul");

            const icon = document.createElement("span");
            const listEl = document.createElement("li");
            item.className = "item"
            addToLS(task)
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
    addToLS,
    removeLocalStorage,
    getFromLocalStorage
}
