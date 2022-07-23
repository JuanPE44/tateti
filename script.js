
// variables globales

const contCajas = document.querySelector('.contenedor-cajas');
const boton = document.querySelector('.boton');
const jugadorX = document.querySelector('.jugadorX');
const jugadorO = document.querySelector('.jugadorO');
const divEmpates = document.querySelector('.empates');
const botonReiniciar = document.querySelector('.reiniciar')

let bool = false;
let ganar = false;
let ganoX = false;
let ganoO = false;

let obtenerPuntosX = JSON.parse(localStorage.getItem('ganoX'));
let obtenerPuntosO = JSON.parse(localStorage.getItem('ganoO'));
let obtenerEmpates = JSON.parse(localStorage.getItem('empates'));

// matriz

// se crea la matriz m de tres dimensiones

let m = []
for (let i = 0; i < 3; i++) {
	m[i] = [];	
}

// se rellena la matris con ''

for (let j = 0; j<3; j++) {
	for (let i = 0; i < 3; i++) {
		m[i][j] = '';
	}
}

// se crea la matriz codigo de tres dimensiones

let codigo = []
for (let i = 0; i < 3; i++) {
	codigo[i] = [];	
}

// se rellena la matriz con los respectivos ids

for (let j = 0; j<3; j++) {
	for (let i = 0; i < 3; i++) {
		codigo[i][j] = '' + i + '' + j;
	}
}


// funciones


const pintarWin = (pintar) => {
	div0 = document.getElementById(pintar[0]);
	div1 = document.getElementById(pintar[1]);
	div2 = document.getElementById(pintar[2]);

	div0.classList.add('ganador');
	div1.classList.add('ganador');
	div2.classList.add('ganador');
}

const mostrarWinX = (puntos) => {
	if (obtenerPuntosX !== null) {
	    jugadorX.innerHTML = 'X: '+puntos;
	} 
	
}

const mostrarWinO = (puntos) => {
	if(obtenerPuntosO !== null) {
	    jugadorO.innerHTML = 'O: '+puntos;
	}
}

const mostrarEmpate = (puntos) => {
	if(obtenerEmpates !== null) {
	    divEmpates.innerHTML = 'Empates: '+puntos;
	}
}

const ganadorX = () => {
	if(ganoX) {
        if(obtenerPuntosX === null) {
            let puntosX = 1;
            jugadorX.innerHTML = 'X: '+puntosX;
            localStorage.setItem('ganoX', JSON.stringify(puntosX));    
        } else {
            let puntosX = obtenerPuntosX;
            puntosX++;
            localStorage.setItem('ganoX', JSON.stringify(puntosX));
            mostrarWinX(puntosX);  
        } 
           
    }
}

const ganadorO = () => {
	if(ganoO) {
        if(obtenerPuntosO === null) {
            let puntosO = 1;
            jugadorO.innerHTML = 'O: '+puntosO;
            localStorage.setItem('ganoO', JSON.stringify(puntosO));
        } else {
            let puntosO = obtenerPuntosO
            puntosO++;
            localStorage.setItem('ganoO', JSON.stringify(puntosO));
            mostrarWinO(puntosO)
        }
        
    }

}

const empate = () => {
    if(obtenerEmpates === null) {
        let empates = 1;
        divEmpates.innerHTML = 'Empates: '+empates;
        localStorage.setItem('empates', JSON.stringify(empates));    
    } else {
        let empates = obtenerEmpates;
        empates++;
        localStorage.setItem('empates', JSON.stringify(empates));
        mostrarEmpate(empates);
    } 
           
}

const contadorEmpate = () => {
	let contador = 0;
	for (let j = 0; j<3; j++) {
		for (let i = 0; i < 3; i++) {
			if(m[j][i] !== '') {
				contador++;
			}
		}
	}
	return contador;
}


const tresIguales = (array) => {
	if (array[0] === array[1] && array[1] === array[2] && array[0] !== '') {
		if (array[2] === 'x') {
			ganoX = true;
		} else {
			ganoO = true;
		}
	    return ganar = true;
	}
}

const rFilas = () => {
	let array = [];
	let pintar = [];
	for (let j = 0; j<3; j++) {
		for (let i = 0; i < 3; i++) {
			array.push(m[i][j]);
			pintar.push(codigo[i][j]);
		}
		if(tresIguales(array)) {
			pintarWin(pintar)
			break
		}
	    
	    array = [];
	    pintar = [];
	}

}

const rColumnas = () => {
	let array = [];
	let pintar = [];
	for (let i = 0; i<3; i++) {
		for (let j = 0; j < 3; j++) {
			array.push(m[i][j]);
			pintar.push(codigo[i][j])
		}
	    if(tresIguales(array)) {
			pintarWin(pintar)
			break
		}

	    array = [];
	    pintar = [];
	}
}

const rDiagonal0 = () => {
	let array = [];
	let pintar = [];
	for (let i = 0; i < 3; i++) {
	    array.push(m[i][i]);
	    pintar.push(codigo[i][i])
	}
	if(tresIguales(array)) {
		pintarWin(pintar)
	}

	array = [];
	pintar = [];
}

const rDiagonal1 = () => {
	let array = [];
	let pintar = [];
	let j = 2;
	for (let i = 0; i < 3; i++) {
	    array.push(m[i][j]);
	    pintar.push(codigo[i][j])
	    j--;		
	}
	if(tresIguales(array)) {
		pintarWin(pintar)
	}
	array = [];
	pintar = [];
}

const god = () => {

	contCajas.addEventListener('click', (e)=> {
		
		let caja = e.target 

		if(caja.classList.value === 'caja') {
			if(ganar!==true) {
    			if(caja.innerHTML === '') {
	    			if(bool === false) {
	    				caja.innerHTML = 'x';
	    				caja.classList.add('caja-x');
	    				bool = true;
	    		    } else {
	    			    caja.innerHTML = 'o';
	    			    caja.classList.add('caja-o');
	    			    bool = false;
	    		    }
	    		}
	    		let ids = caja.id;
	    		let id1 = parseInt(ids.charAt(0));
	    		let id2 = parseInt(ids.charAt(1));
	   
	    		m[id1][id2] = caja.innerHTML;
	    			
	    		rFilas();
	    		rColumnas();
	    		rDiagonal0();
	    		rDiagonal1();

	    		ganadorX();
	    		ganadorO();
	    		

	    		if(contadorEmpate() === 9 && ganar === false) {
	    			empate();
	    		}	
                   
    		} 
	    		
    		    
		} 
		
	})

	
	botonReiniciar.addEventListener('click', ()=>{
	    localStorage.removeItem('ganoX');
	    localStorage.removeItem('ganoO');
	    localStorage.removeItem('empates');
	    location.reload();
    })

	boton.addEventListener('click', ()=>{
	    location.reload();
    })

    
}

// ejecutar

mostrarWinX(obtenerPuntosX);
mostrarWinO(obtenerPuntosO);
mostrarEmpate(obtenerEmpates);

god()







