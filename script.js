function clearGrid() {
    const blocks = document.querySelectorAll('.grid-element');
    blocks.forEach(block => block.remove());
}

function drawGrid(blockCountInput, bgdColor) {
    const container = document.querySelector('#grid-container');
    container.style.gridTemplateColumns = `repeat(${blockCountInput}, 1fr)`;
    
    for (let i = 0; i < blockCountInput; i++) {
        for (let j = 0; j < blockCountInput; j++) {
            const gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridElement.style.backgroundColor = bgdColor;
            gridElement.addEventListener('mouseover', e => {
                setColor(e, colorSelection);
            });
            container.appendChild(gridElement);
        }
    }
}

function setColor(e, colorInput) {
    if (colorInput === 'grayscale') {
        const currentColor = e.target.style.backgroundColor;
        const colorRGBValues = currentColor.slice(4, -1).split(', ');
        if (
            colorRGBValues[0] === colorRGBValues[1] && 
            colorRGBValues[1] === colorRGBValues[2]
        ) {
            const newRGBValue = Math.max(0, Math.floor(colorRGBValues[0] - (colorRGBValues[0] * 0.3)))
            e.target.style.backgroundColor = `rgb(${newRGBValue}, ${newRGBValue}, ${newRGBValue})`;
        } else {
            e.target.style.backgroundColor = DEFAULTBGDCOLOR;
        }
    } else if (colorInput === 'random') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = '#' + randomColor;
    } else if (colorInput === 'custom-container') {
        const customColor = document.querySelector('#custom-color').value;
        e.target.style.backgroundColor = customColor;
    }
}

function clearColor(bgdColor) {
    const blocks = document.querySelectorAll('.grid-element');
    blocks.forEach(block => {
        block.style.backgroundColor = bgdColor;
    });
}

function adjustRangeInputColor(e) {
    let value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100;
    e.target.style.background = 'linear-gradient(to right, yellow 0%, yellow ' + value + '%, #fff ' + value + '%, white 100%)';
}

function changeBtnBorderColor(colorInput, colorBtnArr) {
    colorBtnArr.forEach(colorBtn => {
        if (colorBtn.id === colorInput) {
            colorBtn.style.border = '2px solid yellow';
        } else {
            colorBtn.style.border = '1px solid black';
        }
    });
}

/* variable to keep track of color selection within blocks' event listener's 
callback and to reset border color of active color selection button */
let colorSelection = 'random';

// default background color for all grid blocks
const DEFAULTBGDCOLOR = 'rgb(211, 211, 211)';

// enable range input field and monitor future changes
const rangeInput = document.querySelector('#block-count');
rangeInput.addEventListener('input', e => {
    adjustRangeInputColor(e);
    clearGrid();
    drawGrid(e.target.value, DEFAULTBGDCOLOR);
});

const grayscaleBtn = document.querySelector('#grayscale');
const randomBtn = document.querySelector('#random');
const customInputContainer = document.querySelector('#custom-container');

// enable color buttons' onclick feature
grayscaleBtn.addEventListener('click', e => {
    colorSelection = 'grayscale';
    changeBtnBorderColor(colorSelection, [grayscaleBtn, randomBtn, customInputContainer]);
});
randomBtn.addEventListener('click', e => {
    colorSelection = 'random';
    changeBtnBorderColor(colorSelection, [grayscaleBtn, randomBtn, customInputContainer]);
});
customInputContainer.addEventListener('click', e => {
    colorSelection = 'custom-container';
    changeBtnBorderColor(colorSelection, [grayscaleBtn, randomBtn, customInputContainer]);
})

// enable clear button
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', e => {
    clearColor(DEFAULTBGDCOLOR);
});

window.addEventListener('load', e => {
    console.log('loaded');
    drawGrid(rangeInput.value, DEFAULTBGDCOLOR);
    changeBtnBorderColor(colorSelection, [grayscaleBtn, randomBtn, customInputContainer]); 
});