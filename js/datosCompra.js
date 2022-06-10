let prodCarrito = cargarProductosCarrito();
let carritoFinal = document.getElementById("prodSeleccionados");
let formuCompra = document.getElementById("formuCompra");
let contenido = "";
let total = 0;
if(prodCarrito.length == 0){
    contenido = "<p class='text-center pOculto'>NO HAY PRODUCTOS SELECCIONADOS PARA COMPRAR</p>";
    carritoFinal.innerHTML = contenido
    formuCompra.innerHTML = "";
}else{
    contenido = `<h2 id="contactoH2">Datos para el envio</h2>
    <form id="formularioId">
      <div class="row mb-3 divBarraGral">
        <label for="nombre" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-6">
          <input type="text" class="form-control formBarra" id="nombre" placeholder="NOMBRE Y APELLIDO">
        </div>
      </div>
      <div class="row mb-3 divBarraGral">
        <label for="email" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-6">
          <input type="email" class="form-control formBarra" id="email" placeholder="EMAIL">
        </div>
      </div>
      <div class="row mb-3 divBarraGral">
        <label for="telefono" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-6">
          <input type="number" class="form-control formBarra" id="telefono" placeholder="TELEFONO">
        </div>
      </div>
      <div class="row mb-3 divBarraGral">
        <label for="ayuda" class="col-sm-2 col-form-label"></label>
        <div class="col-sm-6">
          <input type="text" class="form-control formBarra" id="direccion" placeholder="DIRECCION">
        </div>
      </div>
      <div class="divBotones">
        <a href="./finalCompra.html" id="">
          <button id="botonEnviar" href="./finalCompra.html" class="btn">Enviar</button>  
        </a>
        <button type="reset" class="btn">Resetear</button>
      </div>
    </form>`
    formuCompra.innerHTML = contenido    
}

function mostrarError(palabra1, palabra2){
    Swal.fire({
        icon: 'error',
        title: 'Error!!!',
        text: 'Complete el campo: ' + palabra1 + palabra2,
    })
}

function mostrarFinal(){
    let datosFormulario = cargarDatosFormu();
    let totalPagar = 0;
    contenido = `<div class='divFinalizarCompra' id="divProdFinal">
    <h3 class="center">Productos</h3>
    <ul class="list-group center">`;
    
    for (let producto of prodCarrito) {
        contenido += `<li class="list-group-item center">${producto.producto} - ${producto.linea} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</li>`;
        totalPagar += producto.precio * producto.cantidad;
    }
    
    contenido += `</ul>
    <p class='list-group-item center'>Total a Pagar: <b>$${totalPagar}</b></p>
    </div>`;
    contenido += `<div class='divFinalizarCompra' id="divDatosFinal">
    <h3 class="center">Datos del Comprador</h3>`
    for (let datos of datosFormulario) {
        contenido += `<ul class="list-group center">
        <li class="list-group-item center">Nombre: <b>${datos.nombre}</b></li>
        <li class="list-group-item center">Email: <b>${datos.email}</b></li>
        <li class="list-group-item center">Teléfono: <b>${datos.telefono}</b></li>
        <li class="list-group-item center">Dirección: <b>${datos.direccion}</b></li>
        </ul>
        </div>
        <div class='col-md-12 text-center p-5' id="divBtnFinal">
        <a href="./carrito.html">
        <button class='btn btnFinal'>CAMBIAR DATOS</button>
        </a>
        <button class='btn btnFinal' id="finalizar">FINALIZAR COMPRA</button>
        </div>`;
    }
    carritoFinal.innerHTML = contenido;
    document.querySelector("#finalizar").addEventListener("click", finalizarCompra);
}

function guardarDatosFormu(data){
    localStorage.setItem("dataFormuCarrito", JSON.stringify(data))
}

function cargarDatosFormu(){
    return JSON.parse(localStorage.getItem("dataFormuCarrito"));
}   

function validarFormulario(e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let contactoH2 = document.querySelector ("#contactoH2");
    let formulario = document.querySelector ("#formularioId");

    if (nombre.length == 0) {
        mostrarError("Nombre", "")
        return false;
    }else
    if (email.length == 0) {
        mostrarError("email", "")
        return false;
    }else
    if ((telefono.length < 10)) {
        mostrarError("telefono", " con uno valido")
        return false;
    }else
    if (direccion.length == 0) {
        mostrarError("direccion", "")
        return false;
    }else{
        contactoH2.remove();
        formulario.remove();
        let datosFormulario = [{nombre, email, telefono, direccion}];
        guardarDatosFormu(datosFormulario);
        mostrarFinal();
    }
}
document.getElementById("botonEnviar").addEventListener("click", validarFormulario);

function finalizarCompra(){
  let divProdFinal = document.getElementById("divProdFinal");
  let divDatosFinal = document.getElementById("divDatosFinal");
  let divBtnFinal = document.getElementById("divBtnFinal");
  let contenido = "";
  divProdFinal.remove();
  divDatosFinal.remove();
  divBtnFinal.remove();
  contenido += `<div class="text-center pOculto">
  <p class="">MUCHAS GRACIAS POR SU COMPRA</p>
  <p>PRONTO NOS ESTAREMOS COMUNICANDO POR TELEFONO O WPP PARA INDICARLE LA FECHA DE ENTREGA</p>
  </div>`
  carritoFinal.innerHTML = contenido;
  setTimeout(()=> {
    location.pathname = "https://raw.githubusercontent.com/ezequieleandi/barronativoJS-Eandi/index.html";
  }, 4000)
  eliminarCarrito();
}