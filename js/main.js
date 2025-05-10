// Lista de productos
const productos = [
    { nombre: "Pan Francés", precio: 3, categoria: "panaderia_tradicional", imagen: "img/productos/Frances (1).jpg" },
    { nombre: "Baguette", precio: 4, categoria: "panaderia_tradicional", imagen: "img/productos/baguette.jpg" },
    { nombre: "Pan de Avena", precio: 4, categoria: "panaderia_integral", imagen: "img/productos/avena.jpg" },
    { nombre: "Pan de Centeno", precio: 5, categoria: "panaderia_integral", imagen: "img/productos/centeno.jpg" },
    { nombre: "Pastel de chocolate", precio: 11, categoria: "panaderia_dulce", imagen: "img/productos/pastelChocolate_img.jpg" },
    { nombre: "Empanada de pollo", precio: 6, categoria: "panaderia_tradicional", imagen: "img/productos/empanada_img.jpg" },
    { nombre: "Bizcocho Pequeño", precio: 15, categoria: "panaderia_dulce", imagen: "img/productos/bizcochosRell1.jpg" },
    { nombre: "Pastel de frutas", precio: 12, categoria: "panaderia_dulce", imagen: "img/productos/pastelFrutas1.jpg" },
    { nombre: "Crostini", precio: 15, categoria: "panaderia_especial", imagen: "img/productos/crostini.jpg" },
    { nombre: "Donas con Manjar", precio: 10, categoria: "panaderia_dulce", imagen: "img/productos/donas.jpg" },
    { nombre: "Espelta", precio: 15, categoria: "panaderia_integral", imagen: "img/productos/espelta.jpg" },
    { nombre: "Focaccia", precio: 15, categoria: "panaderia_especial", imagen: "img/productos/focaccia.jpg" },
    { nombre: "Galletas de Chocolate", precio: 12, categoria: "panaderia_dulce", imagen: "img/productos/galletasChoco.jpg" },
    { nombre: "Galletas de Mantequilla", precio: 10, categoria: "panaderia_dulce", imagen: "img/productos/galletasMant.jpg" },
    { nombre: "Pan Integral", precio: 4, categoria: "panaderia_integral", imagen: "img/productos/integral.jpg" },
    { nombre: "Pan de Aceitunas", precio: 13, categoria: "panaderia_tradicional", imagen: "img/productos/olivas.jpg" },
    { nombre: "Pan de Ajo", precio: 12, categoria: "panaderia_tradicional", imagen: "img/productos/panAjo.jpg" },
    { nombre: "Pan de Muerto", precio: 12, categoria: "panaderia_especial", imagen: "img/productos/pandeMuerto.jpg" },
    { nombre: "Panettone", precio: 30, categoria: "panaderia_especial", imagen: "img/productos/panettone.jpg" },
    { nombre: "Pan Molde", precio: 12, categoria: "panaderia_tradicional", imagen: "img/productos/panMolde.jpg" }
];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: parseInt(button.dataset.id),
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image
        };
        cart.addItem(product);
    });
});

// Estado de la aplicación
const estadoApp = {
    categoriaActual: "todos",
    precioActual: "todos",
    busquedaActual: ""
};

// Formatear precio
function formatPrice(price) {
    return `S/ ${price.toFixed(2)}`;
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = totalItems;
}

// Mostrar notificación
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

// Cargar productos en el catálogo
function cargarProductos() {
    const grid = document.getElementById('grid-productos');
    if (!grid) return;

    grid.innerHTML = productos.map(producto => `
        <div class="producto" data-categoria="${producto.categoria}" data-precio="${producto.precio}">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">${formatPrice(producto.precio)}</p>
            <div class="selector-cantidad">
                <button class="btn-disminuir" data-id="${producto.id}">-</button>
                <span class="cantidad">1</span>
                <button class="btn-aumentar" data-id="${producto.id}">+</button>
            </div>
            <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
        </div>
    `).join('');

    configurarEventosProductos();
}

// Configurar eventos de productos
function configurarEventosProductos() {
    // Eventos para aumentar/disminuir cantidad
    document.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cantidadElement = e.target.nextElementSibling;
            cantidadElement.textContent = parseInt(cantidadElement.textContent) + 1;
        });
    });

    document.querySelectorAll('.btn-disminuir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cantidadElement = e.target.nextElementSibling;
            const cantidad = parseInt(cantidadElement.textContent);
            if (cantidad > 1) {
                cantidadElement.textContent = cantidad - 1;
            }
        });
    });

    // Eventos para agregar al carrito
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const producto = productos.find(p => p.id === id);
            const cantidad = parseInt(e.target.parentElement.querySelector('.cantidad').textContent);
            
            const carrito = new Carrito();
            carrito.agregarProducto(producto, cantidad);
            
            // Resetear cantidad a 1 después de agregar
            e.target.parentElement.querySelector('.cantidad').textContent = '1';
        });
    });
}

// Aplicar filtros
function aplicarFiltros() {
    document.querySelectorAll('.producto').forEach(item => {
        const categoria = item.dataset.categoria;
        const precio = parseFloat(item.dataset.precio);
        const nombre = item.querySelector('h3').textContent.toLowerCase();
        
        // Verificar filtros
        const coincideCategoria = estadoApp.categoriaActual === "todos" || categoria === estadoApp.categoriaActual;
        const coincidePrecio = (
            estadoApp.precioActual === "todos" ||
            (estadoApp.precioActual === "menor5" && precio <= 5) ||
            (estadoApp.precioActual === "entre6y15" && precio >= 6 && precio <= 15) ||
            (estadoApp.precioActual === "mayor16" && precio > 16)
        );
        const coincideBusqueda = nombre.includes(estadoApp.busquedaActual.toLowerCase());

        // Mostrar/ocultar según filtros
        item.style.display = (coincideCategoria && coincidePrecio && coincideBusqueda) ? 'block' : 'none';
    });
}

// Configurar eventos de filtros
function configurarFiltros() {
    // Filtro por categoría
    document.querySelectorAll('.filtro-categorias button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filtro-categorias button').forEach(b => {
                b.classList.remove('active');
            });
            
            // Añadir clase active al botón clickeado
            e.target.classList.add('active');
            
            // Actualizar estado y aplicar filtros
            estadoApp.categoriaActual = e.target.dataset.categoria;
            aplicarFiltros();
        });
    });

    // Filtro por precio
    document.getElementById('filtroPrecio')?.addEventListener('change', (e) => {
        estadoApp.precioActual = e.target.value;
        aplicarFiltros();
    });

    // Búsqueda
    document.getElementById('buscador')?.addEventListener('input', (e) => {
        estadoApp.busquedaActual = e.target.value;
        aplicarFiltros();
    });
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    cargarProductos();
    configurarFiltros();
});

