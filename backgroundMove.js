export const moveEl = (e) => {
    const box = document.querySelector(".time")
    const mouseX = (e.clientX) - (box.getBoundingClientRect().width / 2)
    const mouseY = e.clientY / 80
    const title = document.querySelector("h1");
    box.style.transform = `translate(${mouseX / 40}px,-${mouseY}px)`
    title.style.transform = `translate(${mouseX / 80}px, -${mouseY}px)`
}

