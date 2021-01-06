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

export function buscarTabla() {
  var input, filter, table, tr, td, i, j, visible;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    visible = false;
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        visible = true;
      }
    }
    if (visible === true) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}