import "core-js/stable"
import "regenerator-runtime/runtime"

import Weather from "./components/theWeather"
import Graf from "./components/graf/theGraf"
import Table from "./components/theTable"
import Archive from "./components/theArchive"

import "./css/style.css"

import set_color from "./utils/setColor"

import "./utils/proxy.min"

const loader = document.querySelector(".loader")

export const statusClasses = new Proxy({
    weather: false,
    table: false,
    graf: false,
    archive: false
}, {
    set(target, prop, receiver) {

        target[prop] = receiver

        console.log(prop)

        const isAllTrue = Object.keys(target).every((key) => {
            return target[key]===true;
        });
        
        if (isAllTrue) {
            weather.render()
            set_color()
            loader.outerHTML = ""

        }

        return target[prop]
    }
})


const $root = document.querySelector("#app")

const weather = new Weather($root)
const graf = new Graf($root)
const table = new Table($root)
const archive = new Archive($root)


const toggle = document.querySelector(".navbar-toggler")
const collapse = document.querySelector(".navbar-collapse")

toggle.addEventListener("click", () => {

    const list = collapse.classList

    if (list.contains("show")) {
        list.remove("show")
    } else {
        list.add("show")
    }
})

const data = document.querySelector("#data")
const allData = document.querySelector("#allData")
const chart = document.querySelector("#graf")
const archiveData = document.querySelector("#archive")

const elements = [
    [data, weather], 
    [allData, table],
    [chart, graf], 
    [archiveData, archive]
]

const activeClass = "active"

elements.forEach(element => {
    element[0].addEventListener("click", (e) => {

        e.preventDefault()

        try {
            console.log(element)
            element[1].render()
        } catch (e) {
            console.error(`Class ${element[1]} not have render method or `, e)
        }

        elements.forEach(item => {
            item[0].classList.remove(activeClass)
        })

        element[0].classList.add(activeClass)
        
    })
})

