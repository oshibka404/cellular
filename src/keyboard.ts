import { densityEl, ruleEl, edgesEl, pixelsizeEl, colorEl, backgroundEl } from './form';
import { generate } from './form';

const colors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF',
    '#FF8000',
    '#FF0080',
]
const DENSITY_STEP = 0.05;

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.target !== document.body) {
        return;
    }

    switch (e.code) {
        // Density
        case 'ArrowDown':
            e.preventDefault()
            densityEl.value = (parseFloat(densityEl.value) - DENSITY_STEP).toString()
            break;
        case 'ArrowUp':
            e.preventDefault()
            densityEl.value = (parseFloat(densityEl.value) + DENSITY_STEP).toString()
            break;
        
        // Rule
        case 'ArrowLeft':
            e.preventDefault()
            ruleEl.value = Math.max(parseInt(ruleEl.value, 10) - 1, 0).toString(10)
            break;
        case 'ArrowRight':
            e.preventDefault()
            ruleEl.value = Math.min(255, parseInt(ruleEl.value, 10) + 1).toString(10)
            break;

        // Edges
        case 'Slash':
            e.preventDefault()
            edgesEl.value = 'loop'
            break;
        case 'Period':
            e.preventDefault()
            edgesEl.value = 'alive'
            break;
        case 'Comma':
            e.preventDefault()
            edgesEl.value = 'dead'
            break;

        // Pixel size
        case 'Equal':
            e.preventDefault()
            pixelsizeEl.value = Math.min(parseInt(pixelsizeEl.max), parseInt(pixelsizeEl.value, 10) * 2).toString(10)
            break;
        case 'Minus':
            e.preventDefault()
            pixelsizeEl.value = Math.max(parseInt(pixelsizeEl.min), parseInt(pixelsizeEl.value, 10) / 2).toString(10)
            break;

        // Color
        case 'KeyA':
            e.preventDefault()
            colorEl.value = colors[0]
            break;
        case 'KeyS':
            e.preventDefault()
            colorEl.value = colors[1]
            break;
        case 'KeyD':
            e.preventDefault()
            colorEl.value = colors[2]
            break;
        case 'KeyF':
            e.preventDefault()
            colorEl.value = colors[3]
            break;
        case 'KeyG':
            e.preventDefault()
            colorEl.value = colors[4]
            break;
        case 'KeyH':
            e.preventDefault()
            colorEl.value = colors[5]
            break;
        case 'KeyJ':
            e.preventDefault()
            colorEl.value = colors[6]
            break;
        case 'KeyK':
            e.preventDefault()
            colorEl.value = colors[7]
            break;
        case 'KeyL':
            e.preventDefault()
            colorEl.value = colors[8]
            break;

        // Background
        case 'KeyZ':
            e.preventDefault()
            backgroundEl.value = colors[0]
            break;
        case 'KeyX':
            e.preventDefault()
            backgroundEl.value = colors[1]
            break;
        case 'KeyC':
            e.preventDefault()
            backgroundEl.value = colors[2]
            break;
        case 'KeyV':
            e.preventDefault()
            backgroundEl.value = colors[3]
            break;
        case 'KeyB':
            e.preventDefault()
            backgroundEl.value = colors[4]
            break;
        case 'KeyN':
            e.preventDefault()
            backgroundEl.value = colors[5]
            break;
        case 'KeyM':
            e.preventDefault()
            backgroundEl.value = colors[6]
            break;
    }

    generate();

    console.log({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        shift: e.shiftKey,
        ctrl: e.ctrlKey,
    })
})