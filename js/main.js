//funcionalidad del formulario de la pagina principal (index.html)
const personas = []
const consultas = []
let formulario = document.querySelector ("#formularioId");
let botonEnviar = document.querySelector ("#botonEnviar")
let seccionContacto = document.querySelector ("#contacto");
let contenedorContacto = document.querySelector ("#contenedorContacto")
let contactoH2 = document.querySelector ("#contactoH2");
let persona
let consulta

class Persona{
    constructor (nombre, email, telefono){
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
    }
}
class Consulta{
    constructor (nombre, telefono, consulta){
        this.nombre = nombre
        this.telefono = telefono
        this.consulta = consulta
    }
}

function mostrarError(palabra, hola){
    Swal.fire({
        icon: 'error',
        title: 'Error!!!',
        text: 'Complete el campo: ' + palabra + hola,
    })
}

function validar(e){
    e.preventDefault()
    let nombreInput = document.querySelector ("#nombre").value;
    let emailInput = document.querySelector ("#email").value;
    let telefonoInput = document.querySelector ("#telefono").value;
    let consultaInput = document.querySelector ("#ayuda").value;

    if(nombreInput.length == 0){
        mostrarError("NOMBRE", "")
    }else if(emailInput.length == 0){
        mostrarError("EMAIL", "")
    }else if(telefonoInput.length < 10){
        mostrarError("TELEFONO", " con mas de 10 digitos")
    }else if(consultaInput.length == 0){
        mostrarError("AYUDA", "")
    }else{
        persona = new Persona (nombreInput, emailInput, telefonoInput)
        consulta = new Consulta (nombreInput, telefonoInput, consultaInput)
        personas.push (persona)
        consultas.push (consulta)
        formulario.remove()
        contactoH2.remove()
        contenedorContacto.innerHTML = `<p class="contactoContent">${nombreInput} MUCHAS GRACIAS</p>
        <p class="contactoContent">Hemos tomado su consulta</p>
        <p class="contactoContent">Pronto nos estarmenos comunicando al numero: ${telefonoInput}</p>`
    }
}
botonEnviar.addEventListener ("click", validar)