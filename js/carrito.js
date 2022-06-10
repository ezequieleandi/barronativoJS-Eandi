fetch("https://raw.githubusercontent.com/ezequieleandi/DesafioJsObligatorio/main/productos.json")
.then((response) => response.json())
.then((data)=>{
    function guardarProducLS(data) {
        localStorage.setItem("produc", JSON.stringify(data));
    }
    guardarProducLS(data)
})

function cargarProducLS() {
    return JSON.parse(localStorage.getItem("produc"));
}

function buscarProducto(id) {
    let productos = cargarProducLS();
    return productos.find(x => x.id == id);
}

function cargarProductosCarrito() {
    if (localStorage.getItem("carrito")) {
        return JSON.parse(localStorage.getItem("carrito"));
    }
    return [];
}

function eliminarCarrito() {
    localStorage.removeItem("carrito");
    actualizarBotonCarrito();
    dibujarProductoEnCarrito();
    actualizarBotonComprar();
}

function agregarAlCarrito(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);

    if (posicion_carrito === -1) {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        productos_carrito.push(producto);
    } else {
        productos_carrito[posicion_carrito].cantidad += 1;
    }    
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito()
    dibujarProductoEnCarrito()
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background:'#FED2AA',
    }) 
    Toast.fire({
        icon: 'success',
        title: 'Producto agregado'
    })
}

function agregarProducto(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);
    productos_carrito[posicion_carrito].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito();
    cargarProductosSeleccionados();
}

function eliminarProducto(id) {
    let productos_carrito = cargarProductosCarrito();
    const posicion_carrito = productos_carrito.findIndex(elemento => elemento.id == id);
    productos_carrito[posicion_carrito].cantidad -= 1;

    if (productos_carrito[posicion_carrito].cantidad == 0) {
        productos_carrito = productos_carrito.filter(x => x.id != id);
    }
    
    localStorage.setItem("carrito", JSON.stringify(productos_carrito));
    actualizarBotonCarrito();
    dibujarProductoEnCarrito();
    actualizarBotonComprar();
}

function actualizarBotonCarrito() {
    let productos_carrito = cargarProductosCarrito();
    let contenido = `<button type="button" class="position-relative"><img src="../imgBarronativo2/carritoImg.svg" alt="Carrito"><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${productos_carrito.length}</span></button>`;
    document.getElementById("iconoCarrito").innerHTML = contenido;
}

function actualizarBotonComprar(){
    let btnComprar = document.getElementById("btnComprar");
    let prodCarrito = cargarProductosCarrito();
    if(prodCarrito.length == 0){
        btnComprar.innerText = `$0 COMPRAR`
    }
}

function dibujarProductoEnCarrito(){
    if(document.getElementById("cuerpoCarrito")){
        let cuerpoCarrito = document.getElementById("cuerpoCarrito");
        let aModal = document.getElementById("aModal");
        let productosCarrito = cargarProductosCarrito();
        let contenido = "";
        let total = 0;
        if(productosCarrito.length === 0){
            contenido = "<p class='text-center'>El carrito de compras esta vacio</p>";
            cuerpoCarrito.innerHTML = contenido
        }else{
            contenido = `<table class="table caption-top table-borderless">
            <thead>
              <tr class="table-dark">
                <th scope="col">#</th>
                <th scope="col">PRODUCTO</th>
                <th scope="col">LINEA</th>
                <th scope="col">PRECIO</th>
                <th scope="col">CANT.</th>
                <th scope="col">SUBTOTAL</th>
                <th scope="col">QUITAR</th>
              </tr>
            </thead>`
          for(const productos of productosCarrito){
              contenido += `<tbody>
              <tr>
                <th scope="row"></th>
                <td>${productos.producto}</td>
                <td>${productos.linea}</td>
                <td>$${productos.precio}</td>
                <td>${productos.cantidad}</td>
                <td>$${productos.precio * productos.cantidad}</td>
                <td><button class='btn' onclick='eliminarProducto(${productos.id});'><img src="../imgBarronativo2/xEliminar.svg" alt='Eliminar' width='24'></button></td>
              </tr>
            </tbody>`
            total += productos.precio * productos.cantidad
          }
          contenido += `</table>`
          aModal.innerHTML = `<button type="button" class="btn btnFinal" id="btnComprar">$${total} COMPRAR</button>`
          cuerpoCarrito.innerHTML = contenido
        }
    }
}
document.getElementById("iconoTrash").addEventListener("click", eliminarCarrito);