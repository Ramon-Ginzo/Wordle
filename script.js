class Wordle {
    constructor() {
        this.filaActual = 0;
        this.columnaActual = 0;
        this.palabraAAdivinar = obtenerPalabraCincoLetras();
        // this.palabraAAdivinar = "RAMON";
        console.log("Fin Constructor " + this.palabraAAdivinar);
        this.init();
        this.leerTecla();
        this.verde = 0;
    }

    init() {
        this.construirTablero();
        this.construirTeclado();
    }

    construirTablero() {
        console.log("2. Construir Tablero");
        const tablero = document.getElementById("tablero");
        for (let i = 0; i < 5; i += 1) {
            const fila = document.createElement("div");
            fila.className = "fila";
            for (let j = 0; j < 5; j += 1) {
                const cajita = document.createElement("div");
                cajita.className = "caja";
                fila.appendChild(cajita);
            }
            tablero.appendChild(fila);
        }
    }

    construirTeclado() {
        console.log("3. Construir Teclado");
        const teclado = document.getElementById("teclado");
        for (let i = 0; i < 3; i++) {
            const fila = document.createElement("div");
            fila.className = "fila-letras";
            for (let j = 0; j < letras[i].length; j++) {
                const boton = document.createElement("button");
                boton.innerHTML = letras[i][j];
                boton.addEventListener("click", (e) => this.write(e));
                fila.appendChild(boton);
            }
            teclado.appendChild(fila);
        }
    }

    leerTecla(){
        console.log("Leer Tecla");
        document.addEventListener("keydown", event => this.escribirWordleDesdeTeclado(event));
    }

    escribirWordleDesdeTeclado(e){
        const key = e.key;
        console.log("Escribir Wordle desde teclado " + key);
        this.accionarPorLetra(key);
    }

    write(e) {
        const key = e.target.innerHTML;
        this.accionarPorLetra(key);
    }
    
    accionarPorLetra(key){
        console.log("Accionar por letra " + key);
        const filas = document.getElementsByClassName("fila");
        const cajitasActual = filas[this.filaActual].getElementsByClassName("caja");
            if  (!letras[0].includes(key) && !letras[1].includes(key) && !letras[2].includes(key) && key !== 'ENTER' && key !== 'Backspace'){
                alert("Letra no permitida. Entrada rechazada");
            } else  if (key === "Del"  || key === "Backspace" ){
                this.del(cajitasActual);
            } else if (key === "Enter") {
                // Verificar la palabra. Ver letras de acuerdo a palabra del diccioanario e ir a siguiente linea
                console.log("Columna Actual " + this.columnaActual);
                if  (this.columnaActual !== 5){
                    alert("Debe completar la linea para verificar");
                } else {
                    // this.verificarPalabra(cajitasActual);
                    if  (this.verificarPalabra(cajitasActual) === 5){
                        alert("Ganador");
                        return
                    };
                    if  (this.filaActual === 4){
                        if  (confirm("Fin del juego.  Siga participando.")){
                            this.limpiarYVolverAEmpezar();
                        }
                    } else {
                        this.filaActual ++;
                        this.columnaActual = 0;
                    }
                }
            } else if (this.columnaActual < 5) {
                this.agregarLetra(cajitasActual, key);
            }
        }

    limpiarYVolverAEmpezar(){
        console.log("Limpiar");
    }

    verificarPalabra(cajitasActual) {
        const palabra = Array.from(cajitasActual).map((caja) => caja.innerHTML.toLowerCase() );
        this.verde = 0;
        for (let i = 0; i < 5; i++) {
            const letra = palabra[i];
            if (letra === this.palabraAAdivinar[i]) {
                //VERDE
                cajitasActual[i].style.backgroundColor = "green";
                this.verde ++
                console.log("Verdes encontrados " + this.verde);
            } else if (this.palabraAAdivinar.includes(letra)) {
                // AMARILLO
                cajitasActual[i].style.backgroundColor = "yellow";
            } else {
                // ROJO
                cajitasActual[i].style.backgroundColor = "red";
            }
        }
        return this.verde;
    }
    
    del(cajitasActual) {
        if (this.columnaActual > 0) {
            this.columnaActual--;
            cajitasActual[this.columnaActual].innerHTML = "";
        }
    }
        
    agregarLetra(cajitasActual, letra) {
        cajitasActual[this.columnaActual].innerHTML = letra;
        this.columnaActual++;
    }
    
}
    async function obtenerPalabraCincoLetras() {
        try {
            // URL de una API pública que devuelve palabras aleatorias
            const response = await fetch("https://random-word-api.herokuapp.com/word?lang=es&length=5");
            
            if  (!response.ok) {
                throw new Error("Error al acceder a la API");
            }
            
            const [palabra] = await response.json(); // API devuelve una lista de palabras
            // console.log("Palabra de cinco letras:", palabra);
            console.log("Dentro de la funcion obtenerPalabra " + palabra)
            return palabra;
            
        } catch (error) {
            console.error("Error:", error);
            return "Error";
        }
    }


const letras = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"], ["Del", "Z", "X", "C", "V", "B", "N", "M", "Enter"]];
console.log("1. Entrada");

const juego = new Wordle();


 // Llamada a la función
console.log(obtenerPalabraCincoLetras());