const productos=[
    {
        id:"collar",
        titulo: "collar",
        imagen: "./img/collar.jfif",
        detalle: "Hermosos Collares para todas tus mascotas y de todos los colores",
        precio: 1000
    },
    {
        id:"arnes",
        titulo: "arnes",
        imagen: "./img/arnes.png",
        detalle:"Pecheras de todos los tamaños para los consentidos del hogar",
        precio: 1000
    },
    {
        id:"snack",
        titulo: "snack",
        imagen: "./img/snack.jpg",
        detalle:"Los mas deliciosos y nutritivos snacks para premiar a los consentiidos",
        precio: 1000
    },
    {
        id:"canil",
        titulo: "canil",
        imagen: "./img/canil.jpg",
        detalle: "Canil para la seguridad de tu mascota en los viajes",
        precio: 1000
    },
    {
        id:"bozal",
        titulo: "bozal",
        imagen: "./img/bozal.jfif",
        detalle: "Aunque no nos gusten,a veces son necesarios",
        precio: 1000
    },
    {
        id:"juguetes",
        titulo: "juguetes",
        imagen: "./img/juguetes.jfif",
        detalle: "Variedad de jueguetes para el entretenimiento",
        precio: 1000
    }
];
/*  const titulo =[
    {
        h2: "Catalago de Productos",
    }  
 ]; */
const containerCards = document.querySelector(".container-cards");
/* const containerTitulo = document.querySelector(".container"); */
let productoAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(){
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="card-header">${producto.titulo}</div>
            <div class="card-body">
                <img class="producto-imagen" src="${producto.imagen}" class="rounded float-start" alt="${producto.titulo}">
                <p class="card-text">${producto.detalle}</p>
                <p class="producto.precio">$${producto.precio}</p>
                    <button type="button" class="producto-agregar btn btn-dark" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        containerCards.append(div);
    })
    cargarBotonesAgregar();
}

/* cargarProductos(); */
/* 
function cargarTitulo (){
    titulo.forEach(container => {
        const h2 = document.createElement("h2");
        div.classList.add("container");
        div.innerHTML = `
        <h2 class="titulo">${container.h2}</h2>
        `;
        containerTitulo.append(h2);
    })
}
cargarTitulo(); */
function cargarBotonesAgregar(){
    productoAgregar = document.querySelectorAll(".producto-agregar");

    productoAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito"); 

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);

    actualizarNumero()
}else{
    productosEnCarrito = [];
}


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregadoAlCarrito = productos.find(producto => producto.id ===idBoton);
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }  else{
        productoAgregadoAlCarrito.cantidad = 1;
        productosEnCarrito.push(productoAgregadoAlCarrito);
    }
    actualizarNumero();
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));

}

function actualizarNumero(){
    let nuevoNumero = productosEnCarrito.reduce((acumulador,producto) => acumulador + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}