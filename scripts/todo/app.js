import storage from "./assets/browserStorage.js";
import { navigation } from "./assets/navigation.js";
import { removeNav } from "./assets/navigation.js";
export const timeContainer = document.querySelector("section.time");
const todoAddBtn = document.querySelector(".todo__btn");
const timerElements = document.querySelectorAll(".time div");
const input = document.createElement('input');
let iconRemoveAll;
const removeEl = (e, args) => {
    e.target.parentElement.removeChild(e.target)
    if (args) {
        for (const element of args)
            element.parentElement.removeChild(element);
    }
}

function removeTasks(e) {
    e.preventDefault()
    let todoElements = [...document.querySelectorAll("li span.item")]
    if (todoElements.length) {
        todoElements.forEach(el => el.parentElement.remove())
        if (JSON.parse(sessionStorage.getItem("tasks")))
            sessionStorage.clear("tasks")
        defaultValues()
        this.remove()
    }
    removeNav()
}

const removeParentElement = (e) => {
    let elToRemove = e.target.parentElement.children[0].textContent
    e.target.parentElement.remove()
    storage.removeSessionStorage(elToRemove)
    let todoElements = [...document.querySelectorAll("li span.item")]
    removeNav()

    if (!todoElements.length) {
        defaultValues()
        iconRemoveAll.remove()

        if (JSON.parse(sessionStorage.getItem("tasks")))
            sessionStorage.clear("tasks")
    }
}

const removeInterval = (interval) => {
    if (timerElements) {
        clearInterval(interval)
    }
}

const defaultValues = () => {
    timeContainer.classList.add("hidden")
    input.classList.remove("wrong")
    input.placeholder = "Add or search your task"
    input.value = ""
}
const validate = () => {
    let todoElements = [...document.querySelectorAll("li span.item")]
    return todoElements = todoElements.map(todoEl => todoEl.textContent)
}

const addToDoBase = () => {
    navigation()
    const h1 = document.querySelector("h1")
    h1.textContent = "twoje zadania na dzisiaj"
    const form = document.createElement('form');
    const addTaskBtn = document.createElement('button');
    const buttonsTodoBodyContainer = document.createElement("div")
    buttonsTodoBodyContainer.className = "todo__btn-container";
    addTaskBtn.className = "todo__btn--add";
    const list = document.createElement("ul");
    addTaskBtn.textContent = "add your task";
    addTaskBtn.type = "submit"
    iconRemoveAll = document.createElement("span");
    input.type = "text"
    input.placeholder = "Add or search your task"
    document.body.appendChild(form);
    form.appendChild(input)
    form.appendChild(buttonsTodoBodyContainer)
    buttonsTodoBodyContainer.appendChild(addTaskBtn);
    timeContainer.appendChild(list)
    timeContainer.classList.add("tasks")
    storage.getFromSessionStorage()
    removeNav()

    let filter;
    const searchTask = () => {
        const text = input.value.toLowerCase().trim();
        if (validate().includes(text)) {
            let todoElements = [...document.querySelectorAll("li span.item")]
            todoElements = todoElements.filter((todo) => todo.textContent === text ? filter = todo : "")
            todoElements.forEach(el => el !== text ? el.parentElement.remove() : "")
            render(todoElements[0].textContent)
            if (typeof filter == "object") {
                if (filter.textContent == text) {
                    let todoElements = [...document.querySelectorAll("li span.item")]
                    const todoText = todoElements.map(textEl => textEl.textContent);
                    let index = todoText.indexOf(text, 0)
                    let nText = todoText[index]
                    if (text == nText) {
                        const goodEl = document.querySelectorAll("span.item");
                        goodEl[index].parentElement.classList.add("searched")
                    }
                }
            }
            input.placeholder = "task found!"
        }
    }

    function render(text) {
        const icon = document.createElement("span");
        const listEl = document.createElement("li");
        const item = document.createElement("span");
        item.className = "item"
        item.textContent = text
        icon.className = "fa fa-trash"
        iconRemoveAll.className = "fa fa-ban"
        iconRemoveAll.title = "Remove all items"
        listEl.appendChild(item)
        listEl.appendChild(icon)
        buttonsTodoBodyContainer.appendChild(iconRemoveAll)
        list.appendChild(listEl);
        icon.addEventListener("click", removeParentElement)
        iconRemoveAll.addEventListener("click", removeTasks)
        if (timeContainer.classList.contains("hidden")) {
            timeContainer.classList.remove("hidden")
        }

    }
    const addElement = (e) => {
        e.preventDefault()
        let text = input.value.toLowerCase().trim();
        if (!text) {
            input.classList.add("wrong")
            return input.placeholder = "Please type your task!"
        } else {
            if (!validate().includes(text)) {
                input.classList.remove("wrong")
                input.placeholder = "task added!"
                input.value = ""
                render(text)
                removeNav()

                storage.addToSS(text)
                input.addEventListener("input", () => {
                    let todoElements = [...document.querySelectorAll("li span.item")]
                    todoElements.forEach(el => el.parentElement.classList.remove("searched"))
                    searchTask()
                })
            }
        }
    }
    addTaskBtn.addEventListener("click", addElement);
}
export default {
    todoAddBtn,
    timerElements,
    timeContainer,
    removeEl,
    removeInterval,
    addToDoBase
}
