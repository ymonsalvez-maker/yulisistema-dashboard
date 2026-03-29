const containers = document.querySelectorAll(".card-container");

let draggedCard = null;

containers.forEach(container => {
container.addEventListener("dragover", (e) => {
e.preventDefault();
});

container.addEventListener("drop", () => {
if (draggedCard) {
container.appendChild(draggedCard);
}
});
});

function crearPedido(){
document.getElementById("formulario").style.display = "block";
}

function guardarPedido(){

const ref = document.getElementById("referencia").value;
const club = document.getElementById("club").value;
const estado = document.getElementById("estado").value;
const fecha = document.getElementById("fecha").value;

const card = document.createElement("div");
card.className = "card";
card.draggable = true;

card.innerHTML = `
<strong>Pedido ${ref}</strong> <br>
Club: ${club} <br>
Estado: Nuevo <br>
Entrega: ${fecha}
`;

activarDrag(card);

document.getElementById(estado).appendChild(card);

document.getElementById("formulario").style.display = "none";

}

function activarDrag(card){

card.addEventListener("dragstart", () => {
draggedCard = card;
});

}
