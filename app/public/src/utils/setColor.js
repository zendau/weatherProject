import SunCalc from "suncalc"

export default function set_color(){

    let currDay = new Date()
    let dayTime = currDay.getHours()

    let times = SunCalc.getTimes(new Date(), 48.456758, 38.9072012)


    const navbar = document.querySelector(".navbar")

    if (dayTime >= times.sunrise.getHours() && dayTime <= times.sunset.getHours()){
        
        navbar.classList.add("navbar-light")
        navbar.classList.add("bg-light")
        navbar.classList.remove("navbar-dark")
        navbar.classList.remove("bg-dark")

        document.body.classList.remove("dark-theme")
    }
    else{
    
        navbar.classList.add("navbar-dark")
        navbar.classList.add("bg-dark")
        navbar.classList.remove("navbar-light")
        navbar.classList.remove("bg-light")

        document.body.classList.add("dark-theme")
    }

}