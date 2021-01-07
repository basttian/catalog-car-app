<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional
import { Router, Route, Link } from 'yrv';
export let router;
let autos;
/* Buscar en tabla */
import {buscarTabla} from "./buscar.js";

</script>

<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container uk-margin-large-bottom">
<Collection path={`autos`} let:data={autos} let:ref on:ref log>
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-overflow-auto">
<!-- Formulario Buscar  -->
<div class="uk-background-muted uk-margin-small uk-padding-small">
    <form on:submit|preventDefault class="uk-search uk-search-navbar">
        <span uk-search-icon></span>
        <input class="uk-search-input uk-text-capitalize" type="search" placeholder="Buscar..." id="myInput" on:keyup={buscarTabla}>
    </form>
</div>
<table class="uk-table uk-table-hover uk-table-small uk-table-divider" id="myTable">
	<caption>Catálogo de vehículos</caption>
    <thead>
        <tr>
        	<th>op</th>
        	<th>Tipo</th>
        	<th>Condicion</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Combustible</th>
            <th>Kilometros</th>
            <th>Motor</th>
            <th>Transmision</th>
            <th>Precio</th>
        </tr>
    </thead>
    <tbody>
    	{#each autos as item}
	        <tr>
	        	<td>
	        	<ul class="uk-iconnav">
					<li><Link href="/lista/{item.id}"><span uk-icon="pencil"></span></Link></li>
					<li><a uk-icon="icon: trash"
                            on:click={()=>{
                                    UIkit.modal.confirm('Esta seguro que desea eliminar este registro!').then(function() {
                                        item.ref.delete().then(()=>{
                                        UIkit.notification({message: `<span uk-icon='icon: trash'></span> ${item.modelo} eliminado éxitosamente.`, pos: 'top-right', status: 'primary'})
                                        })
                                    }, function () {
                                        UIkit.notification({message: "<span uk-icon='icon: warning'></span> Cancelado por el usuario.", pos: 'top-right', status: 'danger'})
                                    });
                                }  
                            }
                        ></a>
                    </li>
				</ul>
	        	</td>
	        	<td>{item.tipo}</td>
	        	<td>{item.nuevo?"0 km":"Usado"}</td>
	            <td>{item.marca}</td>
	            <td>{item.modelo}</td>
	            <td>{item.año}</td>
	            <td>{item.combustible}</td>
	            <td>{item.kilometros}</td>
	            <td>{item.motor}</td>
	            <td>{item.transmision}</td>
	            <td>{item.moneda}&nbsp;{item.precio}</td>
	        </tr>
        {/each}
    </tbody>
</table>
</div>
</Collection>
</div>
</User>
</FirebaseApp>