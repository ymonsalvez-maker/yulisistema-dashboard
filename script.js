document.addEventListener("DOMContentLoaded", function(){

const SUPABASE_URL = "https://jzftsjylfvdilmlqtxzu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6ZnRzanlsZnZkaWxtbHF0eHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjYyMTksImV4cCI6MjA5MDQwMjIxOX0.NrVfCUaTT-U7KHhLMUIdaNxnKblAhnn2ILmaNw4fXko";

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

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


window.crearPedido = function(){
document.getElementById("formulario").style.display = "block";
}


window.guardarPedido = async function(){

const ref = document.getElementById("referencia").value;
const club = document.getElementById("club").value;
const estado = document.getElementById("estado").value;
const fecha = document.getElementById("fecha").value;

const { error } = await supabase
.from("pedidos")
.insert([
{
referencia: ref,
club: club,
estado: estado,
fecha_entrega: fecha
}
]);

if(error){
console.error(error);
alert("Error al guardar pedido");
return;
}

document.getElementById("formulario").style.display = "none";

cargarPedidos();

}


function crearCard(pedido){

const card = document.createElement("div");

card.className = "card";
card.draggable = true;

card.dataset.id = pedido.id;

card.innerHTML = `
<strong>Pedido ${pedido.referencia}</strong> <br>
Club: ${pedido.club} <br>
Entrega: ${pedido.fecha_entrega}
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


async function actualizarEstado(id, nuevoEstado){

const { error } = await supabase
.from("pedidos")
.update({ estado: nuevoEstado })
.eq("id", id);

if(error){
console.error(error);
return;
}

cargarPedidos();

}


function actualizarTablaPedidos(){

const tbody = document.querySelector("#tablaPedidos tbody");

if(!tbody) return;

tbody.innerHTML = "";

pedidos.forEach(p => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${p.referencia}</td>
<td>${p.club}</td>
<td>${p.estado}</td>
<td>${p.fecha_entrega || ""}</td>
<td><button onclick="editarPedido(${p.id})">Editar</button></td>
`;

tbody.appendChild(row);

});

}


function editarPedido(id){

const pedido = pedidos.find(p => p.id == id);

if(!pedido) return;

document.getElementById("referencia").value = pedido.referencia;
document.getElementById("club").value = pedido.club;
document.getElementById("estado").value = pedido.estado;
document.getElementById("fecha").value = pedido.fecha_entrega;

document.getElementById("formulario").style.display = "block";

}


async function cargarPedidos(){

const { data, error } = await supabase
.from("pedidos")
.select("*")
.order("id", { ascending: false });

if(error){
console.error(error);
return;
}

pedidos = [];

document.querySelectorAll(".card-container").forEach(c => c.innerHTML = "");

data.forEach(pedido => {

pedidos.push(pedido);

crearCard(pedido);

});

actualizarTablaPedidos();

}


window.mostrarSeccion = function(seccion){

document.querySelectorAll(".seccion").forEach(div => {
div.style.display = "none"
})

document.getElementById(seccion).style.display = "block"

}


cargarPedidos();

});
