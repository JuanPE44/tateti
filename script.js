

class Jugador {
    constructor(xo,color,msgWin){
        this.xo = xo;
        this.color = color;
        this.puntaje = 0;
        this.txt = msgWin;
        this.mostrarPuntos = document.getElementById(xo);
    }

    gano() {
        this.puntaje++;
        this.mostrarPuntos.innerHTML = `${this.txt}: ${this.puntaje}`;        
    }
}

const j1 = new Jugador('X','#5db8cf','Jugador 1');
const j2 = new Jugador('O','#61cf5d','Jugador 2');



class Tablero {
    constructor (filas,columnas) {
        this.tablero = [];
        this.tableroObj = [];        
        this.filas = filas;
        this.columnas = columnas;
        this.jugador = j2;
        this.win = false;
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
        let tableroObj = this.crearTablero();
        for (let i=0;i<this.filas;i++) {
            for (let j=0;j<this.columnas;j++) {
                let c = new Casilla('casilla','#222',i.toString()+j.toString());
                let casilla = c.crearCasilla()
                tableroObj[i][j] = c;
                tablero[i][j] = casilla;
                divTablero.appendChild(casilla);
            }
        }
        console.log(tablero);
        this.tablero = tablero;
        this.tableroObj = tableroObj;
    }

    jugadorActual() {
        this.jugador === j1 ? this.jugador = j2 : this.jugador = j1;
        return this.jugador;
    }

  
    recorrerTablero() {
        let fila = [];
        let columna = [];
        let diagonal0 = [];
        let diagonal1 = [];
        let j2 = 2;
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {
                fila.push(this.tablero[i][j]);
                columna.push(this.tablero[j][i]);                
            } 
            diagonal0.push(this.tablero[i][i])   
            diagonal1.push(this.tablero[i][j2])                 
            this.tresIguales(fila);            
            this.tresIguales(columna);
            fila = [];
            columna = [];
            j2--;               
        }
        this.tresIguales(diagonal0);
        this.tresIguales(diagonal1);
        diagonal0 = [];        
        diagonal1 = [];        
    }

    limpiarTablero() {
        for(let i=0;i<this.filas;i++) {
            for(let j=0;j<this.columnas;j++) {
                this.tablero[i][j].innerHTML = '';
                this.tablero[i][j].style.background = '#222';
                this.tableroObj[i][j].pintado = false;
            }
        }
    }

    

    tresIguales(casillas) {
        let XOanterior='';
        let cont=1;
        let contRevancha =1;

        
        
        casillas.forEach(e=> {
            let XO = e.innerHTML;
            if(XO===XOanterior && XOanterior!=='') {
                cont++;
                if(cont===3) {
                    this.win = true;
                    this.jugador.gano();  
                    this.btnRevancha(); 
                    this.clicks = 0;                 
                }                
            }
            XOanterior=XO;
        })
    }

    btnRevancha() {
        const contRevancha = document.querySelector('.contenedor-revancha');
        this.win === true ? contRevancha.style.display = 'flex' : contRevancha.style.display = 'none';

        document.querySelector('.btn-revancha').addEventListener('click',()=>{
            this.revancha()
        })
    }

    revancha() {
        this.win = false;
        this.btnRevancha();
        this.limpiarTablero();
        this.clicks = 0;
    }
    
}

const t = new Tablero(3,3);


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
        
        if(this.pintado === false && t.win === false) {
            t.jugadorActual()
            this.pintarCasilla(casilla,t.jugador);
            t.recorrerTablero()  
        }
              
    }

    pintarCasilla(casilla,jugador) {
        casilla.innerHTML = jugador.xo;
        casilla.style.background = jugador.color;
        this.pintado = true;
    }

}

t.rellenarTablero();