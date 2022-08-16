const serverUrl = "http://127.0.0.1:3000"
const createInputsToNavForm = (nav, form) => {
    const inputs = ["text", "email", "password", "password", "submit"];
    const labels = ["imię", "e-mail", "hasło", "hasło"]
    const info = document.createElement("p")
    const icon = document.createElement("span");
    const text = document.createElement("span");
    icon.classList.add("icon")
    icon.className = "fa fa-exclamation-circle"
    text.classList.add("text")
    text.textContent = "wyjdź z formularza klikając 2x w stronę internetową"

    if (nav.textContent == "register") {
        inputs.forEach((el, index) => {
            const item = document.createElement("input")
            item.type = el;
            item.name = el;
            item.required = "required"
            if (index < labels.length) {
                const label = document.createElement("label");
                label.textContent = labels[index]
                form.appendChild(label)
            }
            form.method = "post"
            form.appendChild(item)
        })
        form.action = `${serverUrl}/register`
    } else {
        const email = document.createElement("input")
        email.type = inputs[1]
        email.required = "required";
        const labelEmail = document.createElement("label");
        labelEmail.textContent = labels[1]
        const password = document.createElement("input")
        const labelPassword = document.createElement("label")
        labelPassword.textContent = labels[2]
        password.type = inputs[2]
        password.required = "required";
        const submit = document.createElement("input")
        submit.required = "required";
        form.method = "get"
        form.action = `${serverUrl}/login`
        submit.type = inputs[4]
        form.appendChild(labelEmail)
        form.appendChild(email)
        form.appendChild(labelPassword)
        form.appendChild(password)
        form.appendChild(submit)
    }
    form.appendChild(info)
    info.appendChild(icon)
    info.appendChild(text)
}

export const removeNav = () => {
    const input = document.querySelector("input")

    if ((document.querySelector(".time.tasks").clientHeight > document.body.clientHeight/8) && (document.body.clientWidth < 1200)) {
        document.querySelector(".user__navigation").style.display = "none";
    } else {
        if (document.body.clientWidth < 1200) {
            input.addEventListener('focus', () => {
                document.querySelector(".user__navigation").style.display = "none";
            })
                input.addEventListener('blur', () => {
                document.querySelector(".user__navigation").style.display = "none";
            })
        }
        document.querySelector(".user__navigation").style.display = "flex";
    }
}

const toggleBoxNav = (nav, container) => {
    let div;
    nav.addEventListener("click", (e) => {
        if (!container.querySelector(".box")) {
            div = document.createElement("div")
            div.className = "box"
            container.appendChild(div)
            const form = document.createElement("form");
            div.appendChild(form)
            createInputsToNavForm(nav, form)
        }
        else {
            e.target.parentElement.querySelector(".box").remove()
        }
    })

    document.body.addEventListener('dblclick', (e) => {
        if (container.querySelector(".box")) {
            if (e.target == document.body) {
                div.remove()
            }

        }
    })
}

export const navigation = () => {
    const nav = document.createElement("nav");
    nav.className = "user__navigation"
    const register = document.createElement("button")
    register.classList.add("user__action--register")
    register.textContent = "register"
    const login = document.createElement("button")
    login.classList.add("user__action--login")
    login.textContent = "log in"
    const box = document.createElement("div")
    box.className = "user__navigation-container";
    box.appendChild(register)
    box.appendChild(login)
    nav.appendChild(box)
    document.body.insertAdjacentElement("afterbegin", nav)
    toggleBoxNav(register, box)
    toggleBoxNav(login, box)
}

