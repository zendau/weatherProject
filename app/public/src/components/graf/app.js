// Размеры хэлемента
const WIDTH = 1110
const HEIGHT = 600
// Внутренний отступ
const PADDING = 50
// Размеры холста
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
// Доступная область рисования с учетом внутреннего отступа
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const VIEW_WIDTH = DPI_WIDTH
// Кол-во колонок
const ROWS_COUNT = 5
const CIRCLE_RADIUS = 10

const $temp = document.querySelector("#temp")
const $date = document.querySelector("#date")


const COLORS = ["red"]

// Функция для построения графика
export default function chart (canvas, data) {
    
    console.log("data", data)

    // Создание холста
    const ctx = canvas.getContext("2d")

    // Получение данных для построения
    const yData = data.filter((_,i) => i !== 0)

    console.log(yData, "yData")

    const xData = data[0]
    
    console.log(xData, "xData")

    // Определяем размеры элемента
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"

    // Определяем размеры холста
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT

    // Сохранение requestAnimationFrame
    let raf

    function paint() {

        // Очистка холста   
        clear()

        // Находим минимальные и максимальные значения
        const [yMin, yMax] = getMinMax(yData)
        console.log("MinMax", yMax, yMin)


        // Пропорция по y
        const yRatio = (yMax - yMin) / VIEW_HEIGHT
        // Пропорция по x
        const xRatio = VIEW_WIDTH / ( yData[0].length - 1)
        console.log(xRatio)

        // Линии "y" axis
        yAxis(ctx, yMin, yMax)
        // Линии "x" axis
        xAxis(ctx, xData, xRatio)
        // Перебор колонок с данными для построения
        yData.forEach((col,index) => {
            // Определение "x" и "y"
            let coords = col.map((y,i) => {
                return [
                    Math.floor(i * xRatio),
                    Math.floor(DPI_HEIGHT - (PADDING *2) - (parseFloat(y) -yMin) / yRatio)
                ]
            })

            // Отрисовывание линии
            drawLine(ctx, coords, COLORS[index], yRatio)
        })
    }

    function clear() {
        ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT)
    }


    return {
        init() {
            paint()
        },
        destroy() {
            // Выключение отслеживания анимации
            cancelAnimationFrame(raf)
            canvas.removeEventListener("mousemove", mousemove)
        }
    }
    
}


// Функция для определения максимального и минимального числа
function getMinMax(data) {

    console.log("GETMM", data)

    let yMin = 0
    let yMax = 0

    // Перебор по колонкам
    data.forEach(item => {
        // Перебор колонки
        item.forEach((y, i) => {

            if (i === 0) {
                yMax = parseFloat(y.replace(",", "."))
                yMin = parseFloat(y.replace(",", "."))
            }

            y = parseFloat(y.replace(",", "."))
            if (yMin > y) yMin = y
            if (yMax < y) yMax = y
        })  
    })

    return [yMin, yMax]

}


// Функция для рисования линий на графике
function drawLine(ctx, coords, color, yRatio) {
    // Стилизация кисти
    ///////////////////

    // Ширина кисти
    ctx.lineWidth = 2
    // Цвет кисти
    ctx.strokeStyle = color

    // Начало рисования
    ctx.beginPath()

    console.log(yRatio)

    for (const [x, y] of coords) {
        // Рисуем точку
        // DPI_HEIGHT для того что бы начало графика было слева снизу
        //ctx.lineTo(x, DPI_HEIGHT - y * yRatio - PADDING)
        ctx.lineTo(x, y - PADDING * yRatio )
    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()
}

// Функция для рисования "Y axis"
function yAxis(ctx, yMin, yMax) {
    // определяем шаг
    const step = VIEW_HEIGHT / ROWS_COUNT
    
    // определяем шаг текстовой надписи
    const textStep = (yMax - yMin) / ROWS_COUNT

    // Начало рисования
    ctx.beginPath()

    // Стилизация текста
    ctx.font = "normal 20px Helvetica, sanc-serif"
    ctx.fillStyle = "#96a2aa"

    // Стилизация линии
    ctx.strokeStyle = "#96a2aa"
    ctx.lineWidth = 1

    // Перемещение кисти
    ctx.moveTo(0, PADDING)

    const text = Math.round(yMax).toString()

    // Текст на линии
    ctx.fillText(text, 5, PADDING-10)

    // Рисуем точку, от начала y до конца
    ctx.lineTo(DPI_WIDTH, PADDING-10)

    for (let i = 1; i <= ROWS_COUNT; i++) {
        const y = step *i

        // Перемещение кисти
        ctx.moveTo(0, y+PADDING)

        const text = Math.round(yMax - textStep * i).toString()

        // Текст на линии
        ctx.fillText(text, 5, y+PADDING-10)

        // Рисуем точку, от начала y до конца
        ctx.lineTo(DPI_WIDTH, y+PADDING)

    }

    // Соединение точек
    ctx.stroke()

    // Закрытие кисти
    ctx.closePath()
}

// Функция для рисования "X axis"
function xAxis(ctx, data, xRatio) {

    // Кол-во колонок
    const colsCount = 6
    // Шаг построения
    const step = Math.round(data.length / colsCount)

    // Начало рисования
    ctx.beginPath()

    // Построение "X axis"
    for (let i = 0; i < data.length; i++) {

        // Нахождение координаты x с учетом пропорции
        const x = i * xRatio + PADDING

        if ((i-1) % step === 0) {
            // Отрисовка текста
            ctx.fillText(data[i], x, DPI_HEIGHT-5)
        }
    
    }

    // Соединение точек
    ctx.stroke()
    // Конец рисования
    ctx.closePath()
}