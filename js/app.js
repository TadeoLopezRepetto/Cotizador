
//constructores
function Seguro(marca,año,tipo) {
    this.marca = marca,
    this.año = año,
    this.tipo= tipo
}

function Ui() {}

Ui.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear() ;
        min = max - 20 ;

    const selectAño = document.querySelector('#year');

    for (let i = max ; i > min; i--) {

        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent= i;
        selectAño.appendChild(opcion); 
    }
}

Ui.mostrarMensaje = (mensaje,tipo) => {
    console.log(mensaje)

    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    //agregae mensaje en html 
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div , document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}

const usuario = new Ui();


document.addEventListener('DOMContentLoaded', () => {

    usuario.llenarOpciones()//llena selec con los años
})

eventListener()
function eventListener() {
    
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault()

    const marca = document.querySelector('#marca').value;
    const año = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if (marca===''|| year === '' || tipo === '') {
        Ui.mostrarMensaje('No paso la validacion','error')
    }else{
        Ui.mostrarMensaje('Cotizando...','correcto')
    }

    //intanciar seguro

    //prototype cotizar 
}