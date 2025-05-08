document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const metodoEntrega = document.querySelector('input[name="entrega"]:checked').value;
  
  localStorage.setItem('metodoEntrega', metodoEntrega === 'delivery' ? 'Delivery' : 'Recoger en Tienda');
  
  if (metodoEntrega === 'delivery') {
    localStorage.setItem('direccionEntrega', document.querySelector('#delivery-fields input').value);
  }
  
  window.location.href = 'confirmacion.html';
});