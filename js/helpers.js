// Formatear precio (ej: S/ 5.00)
function formatPrice(price) {
    return `S/ ${price.toFixed(2)}`;
  }
  
  // Mostrar notificación
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }
  
  // Redirigir a página de producto
  function redirectToProduct(id) {
    window.location.href = `producto.html?id=${id}`;
  }