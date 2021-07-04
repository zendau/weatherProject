import CONFIG from "../../../config"
import chart from "./app"

import {statusClasses} from "../../main"

export default class Weather {

    title = "График"

    grafData = []
    root = null

    constructor(root) {
        
        this.root = root

        this.getData()
    }

    async getData() {
        const res = await axios.get(CONFIG.URL, {
            params: {
                get_data: "graf"
            }
          })
        
        this.grafData = res.data.map(item => {
            item.pop()
            return item
        })
        statusClasses.graf = true
    }


    render() {
        
        //this.root.insertAdjacentHTML("beforeend", this.toHtml())
        this.root.innerHTML = this.toHtml()
        document.title = this.title
        const graf = chart(document.getElementById("chart"), this.grafData)
        graf.init()
       
    }

    toHtml() {
        return /*html*/ `
        <div class="container d-flex flex-column">
            <h1>График</h1>
            <canvas id="chart"></canvas>
        </div>
        `
    }

}