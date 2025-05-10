
// Redirigir a página de producto
  function redirectToProduct(id) {
    window.location.href = `producto.html?id=${id}`;
  }

  function actualizarContadorCarrito(cantidad) {
    const contadores = document.querySelectorAll('#contador-carrito');
    contadores.forEach(contador => {
        contador.textContent = cantidad;
    });
}

// helpers.js
function formatPrice(price) {
  return `S/ ${price.toFixed(2)}`;
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// helpers.js
function formatPrice(price) {
    return `S/ ${price.toFixed(2)}`;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Nueva función para actualizar contadores
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = total;
    });
}