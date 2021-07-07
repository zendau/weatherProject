import CONFIG from "../../config"
import {statusClasses} from "../main"

export default class Archive {

    title = "Архив данных"
    archive_data = []

    constructor(root) {
        this.root = root

        this.getData()
    }

    async getData() {
        const res = await axios.get(CONFIG.URL, {
            params: {
                get_data: "archive"
            }
          })
        
        this.archive_data = res.data

        

        statusClasses.archive = true
    }

    render() {
        this.root.innerHTML = this.toHtml()

        document.title = this.title
    }

    renderLinks() {
        
        return this.archive_data.map(item => {
            const dateArch = new Date(item['fileDate']).toLocaleString('ru', { month: 'long', year: 'numeric' })
            return /*html*/ `
            <li>
                <p class="archive-date">${dateArch.charAt(0).toUpperCase() + dateArch.slice(1)}</p>
                <a class="btn btn-info" href='/archive/${item['fileName']}.txt' download>Скачать</a>
            </li>   
            `
        })
    
    }

    toHtml() {
        return /*html*/`
            <h1>Архив</h1>
            <ul class="archive-list">
                ${this.renderLinks()}
            </ul>
        `
    }

}