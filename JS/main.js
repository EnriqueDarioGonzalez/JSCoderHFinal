class Producto {
    constructor(nombre, precio, cantidad) {
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
    }
  }

document.addEventListener('DOMContentLoaded', () => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    inventario = productosGuardados;
  });
  
  let inventario = [];
  
  function buscarProducto() {
    const searchTerm = document.getElementById('searchInput').value;
    const productoEncontrado = inventario.find(producto => producto.nombre.toLowerCase() === searchTerm.toLowerCase());
  
    if (productoEncontrado) {
      Swal.fire({
        icon: 'success',
        title: 'Producto Encontrado',
        html: `<strong>Nombre:</strong> ${productoEncontrado.nombre}<br><strong>Precio:</strong> $${productoEncontrado.precio}<br><strong>Cantidad:</strong> ${productoEncontrado.cantidad}`,
        confirmButtonText: 'Cerrar'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'El producto no se encuentra en el inventario.'
      });
    }
  }
  
  function agregarStock() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const cantidad = parseInt(document.getElementById('cantidadProducto').value);
  
    if (!nombre || isNaN(precio) || isNaN(cantidad)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.'
      });
      return;
    }
  
    const nuevoProducto = new Producto(nombre, precio, cantidad);
    inventario.push(nuevoProducto);
    actualizarInventario();
  
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Stock agregado correctamente.'
    });
  }
  
  
  function actualizarInventario() {
    localStorage.setItem('productos', JSON.stringify(inventario));
  }

  
function actualizarInventario() {
    localStorage.setItem('productos', JSON.stringify(inventario));
    mostrarInventario();
  }
  
  function mostrarInventario() {
    const inventarioList = document.getElementById('inventarioList');
    inventarioList.innerHTML = '';
  
    inventario.forEach(producto => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${producto.nombre}</strong> - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`;
      inventarioList.appendChild(listItem);
    });
  }

  function eliminarProducto(nombre) {
    const indice = inventario.findIndex(producto => producto.nombre === nombre);
  
    if (indice !== -1) {
      inventario.splice(indice, 1);
      actualizarInventario();
      Swal.fire({
        icon: 'success',
        title: 'Producto Eliminado',
        text: 'El producto ha sido eliminado del inventario.'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'El producto no se encuentra en el inventario.'
      });
    }
  }
  
  
function mostrarInventario() {
    const inventarioList = document.getElementById('inventarioList');
    inventarioList.innerHTML = '';
  
    inventario.forEach(producto => {
      const listItem = document.createElement('li');
      listItem.className = 'dark-text';
      listItem.innerHTML = `
      <strong>${producto.nombre}</strong> - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}
      <button class="eliminar-button" onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
      <button class="editar-button" onclick="editarProducto('${producto.nombre}')">Editar</button>`;
      inventarioList.appendChild(listItem);
    });
  }
  
  
  function editarProducto(nombre) {
    const producto = inventario.find(producto => producto.nombre === nombre);
  
    if (!producto) {
      Swal.fire({
        icon: 'error',
        title: 'Producto no encontrado',
        text: 'El producto no se encuentra en el inventario.'
      });
      return;
    }
  
  
    Swal.fire({
      title: `Editar Producto - ${producto.nombre}`,
      html: `
        <label for="editarPrecio">Nuevo Precio:</label>
        <input id="editarPrecio" type="number" step="0.01" value="${producto.precio}" class="swal2-input">
        <label for="editarCantidad">Nueva Cantidad:</label>
        <input id="editarCantidad" type="number" value="${producto.cantidad}" class="swal2-input">`,
      focusConfirm: false,
      customClass: {
        popup: 'swal2-edit-product'
      },
      preConfirm: () => {
        const nuevoPrecio = parseFloat(document.getElementById('editarPrecio').value);
        const nuevaCantidad = parseInt(document.getElementById('editarCantidad').value);
  
        if (isNaN(nuevoPrecio) || isNaN(nuevaCantidad)) {
          Swal.showValidationMessage('Por favor, ingrese valores numéricos válidos.');
        }
  
        producto.precio = nuevoPrecio;
        producto.cantidad = nuevaCantidad;
        actualizarInventario();
  
        Swal.fire({
          icon: 'success',
          title: 'Producto Editado',
          text: 'El producto ha sido editado en el inventario.'
        });
      }
    });
  }
function calcularTotal() {
  let total = 0;
  inventario.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });
  return total;
}

function mostrarTotal() {
  const totalElement = document.getElementById('totalInventario');
  const total = calcularTotal();
  totalElement.textContent = `Total del inventario: $${total.toFixed(2)}`;
}

function actualizarInventario() {
  localStorage.setItem('productos', JSON.stringify(inventario));
  mostrarInventario();
  mostrarTotal(); // Llama a la función para mostrar el total después de actualizar el inventario.
}


// Cargar productos almacenados en localStorage al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  inventario = productosGuardados;
  mostrarInventario();
  mostrarTotal(); // Llama a la función para mostrar el total al cargar la página.
});

  //botonera
  const buscarBtn = document.getElementById("buscarproducto");
  buscarBtn.addEventListener("click", () => {
    buscarProducto();
  });
  const agregarBtn = document.getElementById("addStock");
  agregarBtn.addEventListener("click", () => {
    agregarStock();
  });
