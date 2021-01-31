<script context="module">
	import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
	import firebase from "firebase/app";
	import UIkit from 'uikit';
	import Icons from 'uikit/dist/js/uikit-icons';
	let idReg;
	export function OpenModalFicha(id) {
	  idReg = id;
	  UIkit.modal('#modal-ficha').show();
	}
</script>

<div id="modal-ficha" class="uk-modal-container" uk-modal>

	<Doc path={`autos/${idReg}`} let:data let:ref log>
	<div slot="loading">Loading...</div>
	    <div class="uk-modal-dialog uk-modal-body">
	        <button class="uk-modal-close-default" type="button" uk-close></button>
	        <h2 class="uk-modal-title"> <span class="uk-float-left">{data.marca} - {data.modelo} </span><span class="uk-float-right">{data.moneda} {data.precio}</span></h2>
	    
				 <table class="uk-table uk-table-divider">
			    <thead>
			        <tr>
			            <th colspan="2">Ficha técnica</th>
			        </tr>
			    </thead>
			    <tbody>
			        <tr>
			        	<td>Año</td>
			            <td>{data.año}</td>
			        </tr>
			        <tr>
			        	<td>Kilometros</td>
			            <td>{data.kilometros}</td>
			        </tr>
			        <tr>
			        	<td>Tipo de combustible</td>
			            <td>{data.combustible}</td>
			        </tr>
			        <tr>
			        	<td>Motor</td>
			            <td>{data.motor}</td>
			        </tr>
			        <tr>
			        	<td>Transmision</td>
			            <td>{data.transmision}</td>
			        </tr>
			    </tbody>
			    <tfoot>
			    	<tr>
			    		<td colspan="2"><span class="uk-text-uppercase uk-text-bolder">Información adicional: </span>{data.descripcion}</td>
			    	</tr>
			    </tfoot>
			</table>

	    </div>
	</Doc>

</div>


