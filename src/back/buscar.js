export function myFunction() {

	  // Declare variables
 	var table, inputs, buscar, filter;

	buscar = document.getElementById("buscar");
	filter = buscar.value.toUpperCase();

	table = document.getElementById( 'tabla' );
	inputs = table.querySelectorAll( 'input' );
	var arr = [].slice.call( inputs ).map(function ( node ) {
		return node.value; 
	})
	
	var filas = document.getElementById("tabla").getElementsByTagName("tbody")[0].rows;

	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
	
		//console.log(element.indexOf(filter) >= 0)

		if ((element.toUpperCase().indexOf(filter) > -1)) {
			filas[index].style.display = "";
		} else {
			filas[index].style.display = "none";
		}
	}
}

export let tot = 0.00;
export function calcular() {
    /** sumamos las filas **/
    // obtenemos todas las filas del tbody
    const filas=document.querySelectorAll("#miTabla tbody tr");
    // bucle por cada una de las filas
    filas.forEach((fila) => {
        // obtenemos los tds de cada fila
        const tds=fila.querySelectorAll("td");
        let total=0;
        // bucle por cada uno de los tds con excepcion el primero (producto) y ultimo (total)
        for(let i=1; i<tds.length-1; i++) {
            // sumamos los tds
            total+=parseFloat(tds[i].innerHTML);
        }
		// mostramos el total en la ultima casilla
		tds[tds.length-1].getElementsByClassName("uk-label")[0].innerText=(total/3).toFixed(2);
	});
}
export function clean() {
    const filas=document.querySelectorAll("#miTabla tbody tr");
    filas.forEach((fila) => {
        const tds=fila.querySelectorAll("td");
		tds[tds.length-1].getElementsByClassName("uk-label")[0].innerText='';
	});
}