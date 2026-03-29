const cards = document.querySelectorAll('.card');
const containers = document.querySelectorAll('.card-container');

let draggedCard = null;

cards.forEach(card => {
card.addEventListener('dragstart', () => {
draggedCard = card;
});

card.addEventListener('dragend', () => {
draggedCard = null;
});
});

containers.forEach(container => {
container.addEventListener('dragover', e => {
e.preventDefault();
});

container.addEventListener('drop', () => {
if (draggedCard) {
container.appendChild(draggedCard);
}
});
});
