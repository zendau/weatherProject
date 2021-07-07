const link = document.querySelector('.nav__burger')
const menu = document.querySelector('.nav__body')
const nav_link = document.querySelector('.nav__link')
const wrapper = document.querySelector('body')

link.addEventListener("click", toggleClasses)
nav_link.addEventListener("click", toggleClasses)

function toggleClasses() {

    toggleClass(link, "active")
    toggleClass(menu, "active")
    toggleClass(wrapper, "lock")
}


function toggleClass(item, className) {
    if(this.classList.contains(className)) {
        item.classList.remove(className)
    } else {
        item.classList.add(className)
    }
}