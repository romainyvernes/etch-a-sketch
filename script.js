function clearGrid() {
    const blocks = document.querySelectorAll('.grid-element');
    blocks.forEach(block => block.remove());
}

function drawGrid() {
    const container = document.querySelector('#grid-container');
    const desiredBlockCount = document.querySelector('#block-count').value;
    container.style.gridTemplateColumns = `repeat(${desiredBlockCount}, 1fr)`;
    
    for (let i = 0; i < desiredBlockCount; i++) {
        for (let j = 0; j < desiredBlockCount; j++) {
            const gridElement = document.createElement('div');
            gridElement.classList.add('grid-element');
            gridElement.addEventListener('mouseover', changeColor);
            container.appendChild(gridElement);
        }
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = 'green';
}

function clearColor() {
    const blocks = document.querySelectorAll('.grid-element');
    blocks.forEach(block => {
        block.style.backgroundColor = 'lightgrey';
    });
}

// enable range input field and monitor future changes
const rangeInput = document.querySelector('#block-count');
rangeInput.addEventListener('input', e => {
    clearGrid();
    drawGrid();
});

// enable clear button
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clearColor);

const body = document.querySelector('body');
body.onload = drawGrid();