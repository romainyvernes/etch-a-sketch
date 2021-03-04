function changeColor() {
    this.style.backgroundColor = 'green';
}


const pageBody = document.querySelector('body');
const container = document.createElement('div');
container.id = 'grid-container';


// create grid
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        container.appendChild(gridElement);
    }
}

// insert grid into html
pageBody.appendChild(container);

const gridBlocks = document.querySelectorAll('.grid-element');
gridBlocks.forEach(gridBlock => gridBlock.addEventListener('mouseover', changeColor));