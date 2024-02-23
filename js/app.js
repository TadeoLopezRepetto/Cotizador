
//constructores
function Seguro(marca,año,tipo) {
    this.marca = marca,
    this.año = año,
    this.tipo= tipo
}

//realizar la cotizacion con datos de seguro
Seguro.prototype.cotizarSeguro= function () {
    /**
        1=americano 1.15
        2= asiatico 1.05
        3= europeo 1.35

        cada año que es mas viejo se reduce el valor un 3%

        si el segururo es tipo "basico" se multiplica por un 30% 
        si el segururo es tipo "completo" se multiplica por un 50% 

     */
    
    let cantidad;
    const base = 2000;

    //resolviendo la marca
    switch (this.marca) {
        case '1':
            cantidad= base * 1.15
            break;

        case '2':
            cantidad= base * 1.05
            break;

        case '3':
            cantidad= base * 1.35
            break;
        default:
            break;
    }

    //resolviendo el año
    const diferencia = new Date().getFullYear() - Number.parseFloat(this.año);
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    //resolviendo el tipo
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    }else{
        cantidad *=1.50;
    }
    
    return cantidad

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

Ui.mostrarResultados= function (seguro,total) {

    //extraer marca tipo y año del auto 
    const {marca,año,tipo} = seguro

    let textoMarca;

    switch (marca) {
        case '1':
            textoMarca='Americano'
            break;
        case '2':
            textoMarca='Asiatico'
            break;
        case '3':
            textoMarca='Europeo'
            break;
    
        default:
            break;
    }

    const div = document.createElement('div')
    div.classList.add('mt-10'),
    div.innerHTML=`
        <p class="header">Tu Resumen</p>
        <p class="font-bold"> Marca: <span class="font-normal">${textoMarca} </span></p>
        <p class="font-bold"> Año: <span class="font-normal">${año} </span></p>
        <p class="font-bold"> Tipo: <span class="font-normal capitalize">${tipo} </span></p>

        <p class="font-bold"> Total: <span class="font-normal">$${total} </span></p>

    `;

    const resultado = document.querySelector('#resultado')

    const spinner = document.querySelector('#cargando');
    spinner.style.display= 'block'

    setTimeout(() => {
        spinner.style.display= 'none'
        //muestra resultado desp de borrar spinner
        resultado.appendChild(div)

    }, 3000);
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
        return;
    }

    Ui.mostrarMensaje('Cotizando...','correcto')

    //ocultar mensaje previo 
    const resultados = document.querySelector('#resultado div')
    if (resultados != null) {
        resultados.remove()
    }
    
    //intanciar seguro
    const seguro = new Seguro (marca,año,tipo)
    const total = seguro.cotizarSeguro()

    //prototype cotizar 

    Ui.mostrarResultados(seguro,total)
}