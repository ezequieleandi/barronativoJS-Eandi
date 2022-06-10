const cargarProductos = (idCardProduct) => {
    let contenido = "";
    fetch("https://raw.githubusercontent.com/ezequieleandi/DesafioJsObligatorio/main/productos.json")
    .then((response) => response.json())
    .then((data) =>{
        let tazas = data.filter((el) => el.producto.includes("TAZA"))
        let cuenco = data.filter((el) => el.producto.includes("CUENCO"))
        let mates = data.filter((el) => el.producto.includes("MATE"))
        function iterarProductos(articulo){
            for(producto of articulo){
                contenido += `
                    <div class="cardProductos">
                        <img src=${producto.imagen} alt="${producto.linea}">
                        <h3>${producto.linea}</h3>
                        <div class="container-fluid divContCard">
                            <div class="row">
                                <p class="col-12">${producto.capacidad}</p>
                                <p class="col-12">$${producto.precio}</p>
                                <button type="button" class="btn btn-secondary col-12" onclick="agregarAlCarrito(${producto.id})">Añadir</button>
                            </div>
                        </div>
                    </div>`
            }
            document.getElementById(idCardProduct).innerHTML = contenido;
        }
        if(idCardProduct == "articuloTazas"){
            iterarProductos(tazas)
        }
        if(idCardProduct == "articuloCuencos"){
            iterarProductos(cuenco)
        }
        if(idCardProduct == "articuloMates"){
            iterarProductos(mates)
        }
    })
}
cargarProductos("articuloTazas");
cargarProductos("articuloCuencos");
cargarProductos("articuloMates");
actualizarBotonCarrito();