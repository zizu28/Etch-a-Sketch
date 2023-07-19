const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'rainbow'
const DEFAULT_COLOR = 'black'

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const setColor = color => {
    currentColor = color
}

const setSize = size => {
    currentSize = size
}

const setButtonMode = mode =>{
    activateButton(mode)
    currentMode = mode
}

const grid = document.getElementById('grid')
const color_picker = document.getElementById('colour-picker')
const rainbow_mode = document.getElementById('rainbow-mode')
const colour_mode = document.getElementById('color-mode')
const eraser = document.getElementById('eraser')
const clear = document.getElementById('clear')
const size = document.getElementById('size')
const size_slider = document.getElementById('size-slider')

window.onload = () => {
    color_picker.oninput = (event) => setColor(event.target.value)
    rainbow_mode.onclick = () => setButtonMode('rainbow')
    colour_mode.onclick = () => setButtonMode('color')
    eraser.onclick = () => setButtonMode('eraser')
    clear.onclick = () => gridReload()
    size_slider.onmousemove = (event) => sizeValueUpdate(event.target.value)
    size_slider.onchange = (event) => changeSize(event.target.value)
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Dynamic function to create a grid of a specified size
const gridSizeSetup = gridSize => {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

    for(let i = 0; i < gridSize * gridSize; i++){
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', colorChanger)
        gridElement.addEventListener('mousedown', colorChanger)
        grid.appendChild(gridElement)
    }
}

const gridReload = () => {
    grid.innerHTML = ''
    gridSizeSetup(currentSize)
}

// Function to change the size dimension of the grid
const changeSize = value => {
    setSize(value)
    gridSizeSetup(value)
    gridReload()
}

// Function to update the size as one slides the slider
const sizeValueUpdate = value =>{
    size.innerHTML = `${value} x ${value}`
}

const activateButton = mode => {
    if(currentMode === 'rainbow'){
        rainbow_mode.classList.remove('active')
        rainbow_mode.classList.remove('rainbow')
    }
    if(currentMode === 'color'){
        colour_mode.classList.remove('active')
        colour_mode.classList.remove('color')
    }
    if(currentMode === 'eraser'){
        eraser.classList.remove('active')
        eraser.classList.remove('eraser')
    }

    if(mode === 'rainbow'){
        rainbow_mode.classList.add('active')
        rainbow_mode.classList.add('rainbow')
    }
    if(mode === 'color'){
        colour_mode.classList.add('active')
        colour_mode.classList.add('color')
    }
    if(mode === 'eraser'){
        eraser.classList.add('active')
        eraser.classList.add('eraser')
    }
}

const colorChanger = event => {
    if(event.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
    event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } 
    else if (currentMode === 'color') {
    event.target.style.backgroundColor = currentColor
    } 
    else if (currentMode === 'eraser') {
    event.target.style.backgroundColor = '#fefefe'
    }
}
