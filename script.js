let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let palabra = obtenerPalabraAleatoria(diccionario);

window.addEventListener('load', init);

function init() {
    console.log('Esto se ejecuta solo cuando se carga la página web');

    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);

    // Crear filas iniciales
    crearFilaInicial();
}

function crearFilaInicial() {
    const GRID = document.getElementById("grid");

    for (let i = 0; i < 2; i++) {
        const ROW = document.createElement('div');
        ROW.className = 'row';

        for (let j = 0; j < palabra.length; j++) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.textContent = ' ';
            ROW.appendChild(SPAN);
        }

        GRID.appendChild(ROW);
    }
}

function intentar() {
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) { // VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { // AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      // GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);

    let aciertos = 0;
    for (let i = 0; i < palabra.length; i++) {
        if (INTENTO[i] === palabra[i]) {
            aciertos++;
        }
    }

    intentos--;

    if (aciertos === palabra.length) {
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }

    if (intentos === 0) {
        terminar("<h1>PERDISTE!😖</h1>");
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function obtenerPalabraAleatoria(diccionario) {
    return diccionario[Math.floor(Math.random() * diccionario.length)];
}
