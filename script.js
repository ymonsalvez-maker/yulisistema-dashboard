const SUPABASE_URL = "https://jzftsjylfvdilmlqtxzu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6ZnRzanlsZnZkaWxtbHF0eHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjYyMTksImV4cCI6MjA5MDQwMjIxOX0.NrVfCUaTT-U7KHhLMUIdaNxnKblAhnn2ILmaNw4fXko";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let pedidos = [];
let historial = [];

function guardarDatos(){

localStorage.setItem("pedidos", JSON.stringify(pedidos));
localStorage.setItem("historial", JSON.stringify(historial));

}

function cargarDatos(){

const pedidosGuardados = localStorage.getItem("pedidos");
const historialGuardado = localStorage.getItem("historial");

if(pedidosGuardados){
pedidos = JSON.parse(pedidosGuardados);

pedidos.forEach(p => {
crearCard(p);
});
}

if(historialGuardado){
historial = JSON.parse(historialGuardado);
}

actualizarTablaPedidos();

}

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

guardarDatos();

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

guardarDatos();

}


function registrarHistorial(id, anterior, nuevo){

historial.push({
id,
anterior,
nuevo,
fecha: new Date().toLocaleString()
});

guardarDatos();

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


function mostrarSeccion(seccion){

document.querySelectorAll(".seccion").forEach(div => {
div.style.display = "none"
})

document.getElementById(seccion).style.display = "block"

}


cargarDatos();
