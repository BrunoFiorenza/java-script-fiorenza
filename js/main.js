const listaProductos = document.getElementById('listaProductos');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const inputBusqueda = document.getElementById('inputBusqueda');
const buscarProductoBtn = document.getElementById('buscarProducto');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const mostrarProductos = (productos) => {
    listaProductos.innerHTML = '';
    productos.forEach((e) => {
        listaProductos.innerHTML += `
            <div id="${e.id}">
                <p>${e.nombre}</p>
                <img src="${e.img}" alt="${e.nombre}">
                <p>$${e.precio}</p>
                <button onclick="agregarAlCarrito(${e.id})">Agregar al carrito</button>
            </div>`;
    });
};

const actualizarCarrito = () => {
    carrito.sort((a, b) => b.precio - a.precio);
    listaCarrito.innerHTML = '';
    carrito.forEach((e) => {
        listaCarrito.innerHTML += `
            <div id="carrito-${e.id}" class="producto-carrito">
                <p>${e.nombre} - Cantidad: ${e.cantidad}</p>
                <img src="${e.img}" alt="${e.nombre}" class="img-carrito">
                <p>$${e.precio * e.cantidad}</p>
                <button onclick="eliminarDelCarrito(${e.id})">Eliminar del carrito</button>
            </div>`;
    });
    const total = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    totalCarrito.innerHTML = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const agregarAlCarrito = (id) => {
    const producto = productosArray.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    Toastify({
        text: `${producto.nombre} se agrego al carrito.`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style : {
            background: '#4CAF50'
        },
        close: true,
    }).showToast();
    actualizarCarrito();
};

const eliminarDelCarrito = (id) => {
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad -= 1;
        } else {
            const index = carrito.findIndex(p => p.id === id);
            carrito.splice(index, 1);
        }
        actualizarCarrito();
        Toastify({
            text: 'Producto eliminado del carrito',
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style : {
                background: '#ff0000'
            },
            close: true,
        }).showToast();
    }
};

fetch('storage.json')
    .then(response => response.json())
    .then(data => {
        productosArray = data.sort((a, b) => b.precio - a.precio);
        mostrarProductos(productosArray);
        buscarProductoBtn.addEventListener('click', () => {
            const busqueda = inputBusqueda.value.toLowerCase();
            const productosFiltrados = productosArray.filter(p => p.nombre.toLowerCase().includes(busqueda));
            if (productosFiltrados.length === 0) {
                listaProductos.innerHTML = '<p>No se encontraron productos.</p>';
            } else {
                mostrarProductos(productosFiltrados);
            }
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
});

document.addEventListener('DOMContentLoaded', actualizarCarrito);