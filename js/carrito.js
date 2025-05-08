class Carrito {
    constructor() {
      this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    }
  
    agregarProducto(producto) {
      this.items.push(producto);
      this.guardar();
    }
  
    eliminarProducto(id) {
      this.items = this.items.filter(item => item.id !== id);
      this.guardar();
    }
  
    guardar() {
      localStorage.setItem("carrito", JSON.stringify(this.items));
    }
  
    calcularTotal() {
      return this.items.reduce((total, item) => total + item.precio, 0);
    }
  }
  
  const carrito = new Carrito();