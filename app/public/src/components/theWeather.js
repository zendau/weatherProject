import CONFIG from "../../config"

import SunCalc from "suncalc"
import {statusClasses} from "../main"

export default class Weather {

    title = "Обстановка сейчас"

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

    constructor(root) {
        
        this.root = root

        this.getData()
    }

    async getData() {
        
        const res = await axios.get(CONFIG.URL, {
            params: {
                get_data: "last"
            }
          })
        this.weather_data = res.data.slice(1)
        statusClasses.weather = true
    }


    render() {
        this.root.innerHTML = this.toHtml()

        document.title = this.title

        this.set_background()
        this.get_date()
        this.get_temp()
        this.get_pressure()
        this.get_wet()
        this.get_wind_speed()
        this.get_wind_direction()

    }


    get_date(){
        let date = document.querySelector("#date")
    
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
    
        let weekday = new Array("Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб")
        let month = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря")
    
        today = weekday[today.getDay()] + ", " + dd + " " + month[Number(mm)] + " " + today.getHours() + ":" + today.getMinutes()
    
        date.innerHTML = today
    }
    
    get_temp(){
        let temp = document.querySelector("#temp")
    
        let temp_value = this.weather_data[3] + ""
        temp_value = temp_value.replace(".", ",")
    
        if(temp_value[0] != "-")
            temp_value = "+" + temp_value
    
        temp.innerHTML = temp_value
    }
    
    get_pressure(){
        let pressure = document.querySelector("#pressure")
    
        let pressure_value = this.weather_data[1] + ""
        pressure_value = pressure_value.replace(".", ",")
    
        pressure.innerHTML = pressure_value
    }
    
    get_wet(){
        let wet = document.querySelector("#wet")
    
        let wet_value = this.weather_data[4] + ""
        wet_value = wet_value.replace(".", ",")
    
        wet.innerHTML = wet_value
    }
    
    get_wind_speed(){
        let winds_speed = document.querySelector("#wind-speed")
    
        let wind_speed_value = this.weather_data[8] + ""
        wind_speed_value = wind_speed_value.replace(".", ",")
    
        winds_speed.innerHTML = wind_speed_value
    }
    
    get_wind_direction(){
        let wind_direction = document.querySelector("#wind-direction")
    
        let wind_direction_value = this.weather_data[9] + ""
        wind_direction_value = parseFloat(wind_direction_value)
    
        let result = ""
    
        if (wind_direction_value >= 11.25 && wind_direction_value <= 33.75)
            result = "ССВ"
        else if (wind_direction_value >= 33.76 && wind_direction_value <= 56.25)
            result = "СВ"
        else if (wind_direction_value >= 56.26 && wind_direction_value <= 78.75)
            result = "ВСВ"
        else if (wind_direction_value >= 78.86 && wind_direction_value <= 101.25)
            result = "В"
        else if (wind_direction_value >= 101.26 && wind_direction_value <= 123.75)
            result = "ВЮВ"
        else if (wind_direction_value >= 123.76 && wind_direction_value <= 145.25)
            result = "ЮВ"
        else if (wind_direction_value >= 145.26 && wind_direction_value <= 168.75)
            result = "ЮЮВ"
        else if (wind_direction_value >= 168.76 && wind_direction_value <= 191.25)
            result = "Ю"
        else if (wind_direction_value >= 191.26 && wind_direction_value <= 213.75)
            result = "ЮЮЗ"
        else if (wind_direction_value >= 213.76 && wind_direction_value <= 236.25)
            result = "ЮЗ"
        else if (wind_direction_value >= 236.26 && wind_direction_value <= 258.75)
            result = "ЗЮЗ"
        else if (wind_direction_value >= 258.76 && wind_direction_value <= 281.25)
            result = "З"
        else if (wind_direction_value >= 281.26 && wind_direction_value <= 303.75)
            result = "ЗСЗ"
        else if (wind_direction_value >= 303.76 && wind_direction_value <= 326.25)
            result = "СЗ"
        else if (wind_direction_value >= 326.26 && wind_direction_value <= 348.75)
            result = "ССЗ"
        else
            result = "С"
    
        wind_direction.innerHTML = result
    }
    
    set_background(){
        let back = document.querySelector("#weather-states")
    
        let currDay = new Date()
        let dayTime = currDay.getHours()
    
        let times = SunCalc.getTimes(new Date(), 48.456758, 38.9072012);
    
        if (dayTime >= times.sunrise.getHours() && dayTime <= times.sunset.getHours()){
            back.classList.add("day")
            back.classList.remove("night")
        }
        else{
            back.classList.add("night")
            back.classList.remove("day")
        }
    }

    toHtml() {
        return /*html*/`
            <div class="weather-states" id="weather-states">
                <div class="top-weather-states">

                    <div class="date-weather-states">
                        <p id="date"></p>
                    </div>

                    <div class="temp-weather-states">
                        <p id="temp"></p>
                    </div>

                    <div class="adress">
                        <p>ЛНР, ПГТ Михайловка</p>
                    </div>

                </div>
                <div class="separator-weather-states">
                    <div id="separator"></div>
                </div>
                <div class="bottom-weather-states">

                    <div class="pressure-weather-states weather-states-card">
                        <div class="weather-states-block">
                            <div class="weather-states-card-title">Давление</div>
                            <div class="weather-states-card-value" id="pressure">
                            </div>
                            <div class="weather-states-card-messure">
                                мм рт. ст.
                            </div>
                        </div>
                    </div>

                    <div class="wet-weather-states weather-states-card">
                        <div class="weather-states-block">
                            <div class="weather-states-card-title">Влажность</div>
                            <div class="weather-states-card-value" id="wet">
                            </div>
                            <div class="weather-states-card-messure">
                                %
                            </div>
                        </div>
                    </div>

                    <div class="wind-speed-weather-states weather-states-card">
                        <div class="weather-states-block">
                            <div class="weather-states-card-title">Скорость ветра</div>
                            <div class="weather-states-card-value" id="wind-speed">
                            </div>
                            <div class="weather-states-card-messure">
                                м/с
                            </div>
                        </div>
                    </div>

                    <div class="wind-direction-weather-states weather-states-card">
                        <div class="weather-states-block">
                            <div class="weather-states-card-title">Направление ветра</div>
                            <div class="weather-states-card-value" id="wind-direction">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `
    }

}