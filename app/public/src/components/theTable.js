import CONFIG from "../../config"

import SunCalc from "suncalc"
import {statusClasses} from "../main"

export default class Weather {

    title = "Все данные"

    weather_data = []

    weather_desk = [
        "№",
        "Дата",
        "Абсолютное давление",
        "Относительное давление",
        "Внешняя температура",
        "Внешняя влажность",
        "Внутренняя температура",
        "Внутренняя влажность",
        "Точка росы",
        "Скорость ветра",
        "Направление ветра",
        "Температура холода ветра",
        "Порыв ветра",
        "Накопительный дождь",
        "Относительный дождь",
    ]

    root = null

    weather_data_count = 0

    constructor(root) {
        
        this.root = root

        this.getData()
    }

    async getData() {
        const res = await axios.get(CONFIG.URL, {
            params: {
                get_data: "all"
            }
          })
        
        this.weather_data = res.data
        this.weather_data.pop()

        

        statusClasses.table = true
    }


    render() {
        this.root.innerHTML = this.toHtml()

        document.title = this.title

        const beforeBtn = document.querySelector("#before-btn")
        const nextBtn = document.querySelector("#next-btn")
        const searcBtn = document.querySelector("#search-date-btn")
        

        beforeBtn.addEventListener("click", this.before_data.bind(this))
        nextBtn.addEventListener("click", this.next_data.bind(this))
        searcBtn.addEventListener("click", this.search_per_date.bind(this))


        this.set_color()
        this.set_thead()
        this.set_data()
    }

    set_color(){

        let table = document.querySelector("#weather-table")
    
        let currDay = new Date()
        let dayTime = currDay.getHours()
    
        let times = SunCalc.getTimes(new Date(), 48.456758, 38.9072012)

        const beforeBtn = document.querySelector("#before-btn")
        const nextBtn = document.querySelector("#next-btn")

        const navbar = document.querySelector(".navbar")
    
        if (dayTime >= times.sunrise.getHours() && dayTime <= times.sunset.getHours()){
            table.classList.add("table")
            table.classList.remove("table-dark")

            beforeBtn.classList.add("btn-light")
            beforeBtn.classList.remove("btn-dark")

            nextBtn.classList.add("btn-light")
            nextBtn.classList.remove("btn-dark")
        }
        else{
            table.classList.add("table-dark")
            table.classList.remove("table")

            beforeBtn.classList.add("btn-dark")
            beforeBtn.classList.remove("btn-light")

            nextBtn.classList.add("btn-dark")
            nextBtn.classList.remove("btn-light")

        }
    }
    
    set_thead(){
        let thead = document.querySelector("#weather-table-thead")
        let row = document.createElement('tr')
    
        this.weather_desk.forEach(item => {
            row.innerHTML += "<th id='remove'>" + item + "</th>"
        })
    
        thead.appendChild(row)
    }
    
    set_data(){
        let table_body = document.querySelector("#weather-table-body")
        
        for (var i = 0 + (100 * this.weather_data_count); i < 100 * (this.weather_data_count + 1); i++){
            let row = document.createElement('tr')
            for(var j = 0; j < 15; j++){
                let cell = document.createElement('td')

                cell.style.textAlign = 'center'
                cell.innerText = this.weather_data[i][j]
                row.appendChild(cell)
            }
    
            table_body.appendChild(row)
        }
    }
    
    next_data(){
        this.weather_data_count++
        this.refresh_table()
    }
    
    before_data(){
        if (this.weather_data_count <= 0)
            return
        
            this.weather_data_count--
        this.refresh_table()
    }
    
    refresh_table() {
        this.clear_table()
        this.set_data()
    }
    
    clear_table(){
        let table_body = document.querySelector("#weather-table-body")
        table_body.innerHTML = ""
    }
    
    search_per_date(){
        this.clear_table()
    
        let search_date = document.querySelector("#weather-date")
        let table_body = document.querySelector("#weather-table-body")
    
        let date = search_date.value[8] + search_date.value[9] + "." + search_date.value[5] + search_date.value[6] + "." + search_date.value[0] + search_date.value[1] + search_date.value[2] + search_date.value[3]
    
        console.log(search_date.value)
        console.log(date)
    
        this.weather_data.forEach(item => {
            console.log(item)
            if(item[1].includes(date)){
                let row = document.createElement('tr')
                console.log(item[1])
    
                for(var i = 0; i < 15; i++){
                    let cell = document.createElement('td')
                    cell.style.textAlign = 'center'
                    cell.innerText = item[i]
                    row.appendChild(cell)
                }
    
                table_body.appendChild(row)
            }
        })
    }

    toHtml() {
        return /*html*/`
        <table id="weather-table" style="text-align: center;">
            <thead id="weather-table-thead">
            </thead>
            <tbody id="weather-table-body">
            </tbody>
        </table>
        <div class="weather-all-data-navigation">
            <input type="button" name="before_data" id="before-btn" class="btn" value="Предыдущие записи">
            <input type="button" name="next_data" id="next-btn" class="btn" value="Следующие записи">
        </div>
        <div class="weather-all-data-date">
            <h1>Значения за определённый день за прошедший месяц</h1>
            <div class="section__center">
                <input type="date" name="weather_date" id="weather-date">
                <input type="button" name="search_per_date" id="search-date-btn" class="btn btn-primary" value="Найти">
            </div>
        </div>
        `
    }

}