let pedidos = [];
let historial = [];

const containers = document.querySelectorAll(".card-container");

let draggedCard = null;

containers.forEach(container => {
container.addEventListener("dragover", (e) => {
e.preventDefault();
});

container.addEventListener("drop", () => {

if (draggedCard) {

container.appendChild(draggedCard);

const id = draggedCard.dataset.id;
const nuevoEstado = container.id;

actualizarEstado(id, nuevoEstado);

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

const id = Date.now();

const pedido = {
id,
ref,
club,
estado,
fecha,
fechaCreacion: new Date().toLocaleString()
};

pedidos.push(pedido);

crearCard(pedido);

document.getElementById("formulario").style.display = "none";

actualizarTablaPedidos();

}


function crearCard(pedido){

const card = document.createElement("div");

card.className = "card";
card.draggable = true;

card.dataset.id = pedido.id;

card.innerHTML = `
<strong>Pedido ${pedido.ref}</strong> <br>
Club: ${pedido.club} <br>
Entrega: ${pedido.fecha}
`;

card.addEventListener("click", () => {
editarPedido(pedido.id);
});

activarDrag(card);

document.getElementById(pedido.estado).appendChild(card);

}


function activarDrag(card){

card.addEventListener("dragstart", () => {
draggedCard = card;
});

}


function actualizarEstado(id, nuevoEstado){

const pedido = pedidos.find(p => p.id == id);

const estadoAnterior = pedido.estado;

pedido.estado = nuevoEstado;

registrarHistorial(id, estadoAnterior, nuevoEstado);

actualizarTablaPedidos();

}


function registrarHistorial(id, anterior, nuevo){

historial.push({
id,
anterior,
nuevo,
fecha: new Date().toLocaleString()
});

}


function actualizarTablaPedidos(){

const tbody = document.querySelector("#tablaPedidos tbody");

if(!tbody) return;

tbody.innerHTML = "";

pedidos.forEach(p => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${p.ref}</td>
<td>${p.club}</td>
<td>${p.estado}</td>
<td>${p.fecha}</td>
<td><button onclick="editarPedido(${p.id})">Editar</button></td>
`;

tbody.appendChild(row);

});

}


function editarPedido(id){

const pedido = pedidos.find(p => p.id == id);

document.getElementById("referencia").value = pedido.ref;
document.getElementById("club").value = pedido.club;
document.getElementById("estado").value = pedido.estado;
document.getElementById("fecha").value = pedido.fecha;

document.getElementById("formulario").style.display = "block";

}
