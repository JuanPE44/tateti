

class Jugador {
    constructor(actual,color){
        this.actual = actual;
        this.color = color;
    }
}

const j = new Jugador('O','');

class Tablero {
    constructor (filas,columnas,color,jugador) {
        this.filas = filas;
        this.columnas = columnas;
        this.color = color;
        this.jugador = jugador;
    }

    crearTablero() {
        let tablero = [];
        for (let i=0;i<this.filas;i++) {
            tablero[i] = [];	
        }
        return tablero
    }

    rellenarTablero() {
        const divTablero = document.getElementById('tablero');
        let tablero = this.crearTablero();
        for (let i=0;i<this.filas;i++) {
            for (let j=0;j<this.columnas;j++) {
                let c = new Casilla('casilla','#222',i.toString()+j.toString());
                let casilla = c.crearCasilla()
                tablero[i][j] = casilla;
                divTablero.appendChild(casilla);
            }
        }
        console.log(tablero)
    }

    jugadorActual() {
        this.jugador.actual === 'X' ? this.jugador.actual = 'O' : this.jugador.actual = 'X';
        this.jugador.actual === 'X' ? this.jugador.color = '#5db8cf' : this.jugador.color = '#61cf5d';
        return this.jugador;
    }

    
}

const t = new Tablero(3,3,'#fff',j);


class Casilla {
    constructor(clase,color,id) {
        this.clase = clase;
        this.color = color;
        this.id = id;
        this.pintado = false;
    }

    crearCasilla() {
        const casilla = document.createElement('div');
        casilla.classList.add(this.clase);
        casilla.style.background = this.color;
        casilla.id = this.id;
        
        casilla.addEventListener('click',(e)=>{
            this.clickCasilla(casilla)
        });
        return casilla;
    }

    clickCasilla(casilla) {
        t.jugadorActual()
        if(this.pintado === false) {
            this.pintarCasilla(casilla,t.jugador);
        }
    }

    pintarCasilla(casilla,jugador) {
        casilla.innerHTML = jugador.actual;
        casilla.style.background = jugador.color;
        this.pintado = true;
    }

}

t.rellenarTablero();