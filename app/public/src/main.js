import "core-js/stable"
import "regenerator-runtime/runtime"

import Weather from "./components/theWeather"
import Graf from "./components/graf/theGraf"
import Table from "./components/theTable"
 

import "./css/style.css"

import set_color from "./utils/setColor"

import "./utils/proxy.min"

const loader = document.querySelector(".loader")

export const statusClasses = new Proxy({
    weather: false,
    table: false,
    graf: false
}, {
    set(target, prop, receiver) {

        target[prop] = receiver

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

let weather = null
let graf = null
let table = null


function init() {
    weather =  new Weather($root)
    graf =  new Graf($root)
    table =  new Table($root)

}

const toggle = document.querySelector(".navbar-toggler")

const collapse = document.querySelector(".navbar-collapse")

toggle.addEventListener("click", () => {

    const list = collapse.classList

    if (list.contains("show")) {
        collapse.classList.remove("show")
    } else {
        collapse.classList.add("show")
    }
})

const data = document.querySelector("#data")
const allData = document.querySelector("#allData")
const chart = document.querySelector("#graf")

data.addEventListener("click", (e) => {
    e.preventDefault()
    weather.render()
    data.classList.add("active")
    allData.classList.remove("active")
    chart.classList.remove("active")
})
allData.addEventListener("click", (e) => {
    e.preventDefault()
    table.render()
    allData.classList.add("active")
    data.classList.remove("active")
    chart.classList.remove("active")
})
chart.addEventListener("click", (e) => {
    e.preventDefault()
    graf.render()
    chart.classList.add("active")
    allData.classList.remove("active")
    data.classList.remove("active")
})


document.addEventListener("DOMContentLoaded", () => {
    init()
})

