// Lista de productos (también usada en producto.html)
const productos = [
    {
      id: 1,
      nombre: "Pan Integral",
      precio: 5.00,
      categoria: "integral",
      imagen: "img/productos/pan-integral.jpg",
      descripcion: "Elaborado con harina 100% integral y semillas de lino."
    },
    {
      id: 2,
      nombre: "Baguette Tradicional",
      precio: 4.50,
      categoria: "tradicional",
      imagen: "img/productos/baguette.jpg",
      descripcion: "Clásica baguette crujiente por fuera y suave por dentro."
    }
    // Añade más productos aquí...
  ];
  
  // Cargar productos en el catálogo
  function cargarProductos() {
    const grid = document.getElementById('grid-productos');
    if (!grid) return; // Si no está en la página actual
    
    grid.innerHTML = productos.map(producto => `
      <div class="producto" data-categoria="${producto.categoria}">
        <img src="${producto.imagen}" alt="${producto.nombre}" onclick="location.href='producto.html?id=${producto.id}'">
        <h3>${producto.nombre}</h3>
        <p class="precio">${formatPrice(producto.precio)}</p>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `).join('');
  }
  
  // Filtros
  document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    
    // Filtro por categoría
    document.getElementById('filtro-categoria')?.addEventListener('change', (e) => {
      const categoria = e.target.value;
      document.querySelectorAll('.producto').forEach(item => {
        item.style.display = (categoria === 'todos' || item.dataset.categoria === categoria) ? 'block' : 'none';
      });
    });
  
    // Búsqueda
    document.getElementById('buscador')?.addEventListener('input', (e) => {
      const texto = e.target.value.toLowerCase();
      document.querySelectorAll('.producto').forEach(item => {
        const nombre = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = nombre.includes(texto) ? 'block' : 'none';
      });
    });
  });