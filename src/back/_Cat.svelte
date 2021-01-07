<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import { Router, Route, Link } from 'yrv';
export let router;
let categoria;
let tipos_de_vehiculo;
let promise;
/* Buscar en tabla */
import {myFunction} from "./buscar.js";
</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container uk-margin-large-bottom">
<Collection path={`categoria`} let:data={tipos_de_vehiculo} let:ref on:ref log>
<div slot="loading"><div uk-spinner></div></div>

<h1 class="uk-heading-divider">Tipos de vehículos</h1>
   
<!-- Formulario -->
<form on:submit|preventDefault>
<input class="uk-input uk-text-capitalize" type="text" name="" bind:value={categoria} placeholder="Tipo de vehículo">
<button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-top uk-button-large" on:click={async () => {
    promise = ref.add( {
	    nombre: `${categoria.charAt(0).toUpperCase().concat(categoria.substring(1, categoria.length))}`,//Capitalizamos el registro
	    createdAt : new Date().getTime(),
	    }).then((resp)=>{
	    UIkit.notification({message: "<span uk-icon='icon: check'></span> Agregado con éxito.", pos: 'bottom-center', status: 'primary'})
	    categoria = "";
	})
}}
disabled={!categoria} >Añadir nuevo&nbsp;{#await promise}<div uk-spinner></div>{/await}</button>
</form>
<hr>

<!-- Formulario Buscar  -->
<div class="uk-background-muted uk-margin-small uk-padding-small">
    <form class="uk-search uk-search-navbar">
        <span uk-search-icon></span>
        <input class="uk-search-input uk-text-capitalize" type="search" placeholder="Buscar..." id="buscar" on:keyup={myFunction}>
    </form>
</div>

<div class="uk-overflow-auto">
<table class="uk-table uk-table-striped uk-table-hover" id="tabla">
	<caption>Lista de vehículos</caption>
    <thead>
        <tr>
            <th>Tipos</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
    </thead>
    <tbody>
    	{#each tipos_de_vehiculo as tipo}
        <tr>
            <td>
            <input class="uk-input uk-form-blank uk-form-expand" bind:value={tipo.nombre} type="text">
            </td>
            <td>
            	<a uk-icon="icon: pencil"
            		on:click={()=>{
	                    tipo.ref.update({
	                    nombre: `${tipo.nombre}`,
	                    updatedAt : new Date().getTime()
	                    }).then(resp=>{
	                        UIkit.notification({message: `<span uk-icon='icon: pencil'></span> Registro actualizado con éxito.`, pos: 'bottom-center', status: 'primary'})
	                    })
                    }}
            	></a>
            </td>
            <td>
                <a uk-icon="icon: trash"
				on:click={()=>{
				UIkit.modal.confirm('Esta seguro que desea eliminar este registro!').then(function() {
				    tipo.ref.delete().then(()=>{
				    UIkit.notification({message: `<span uk-icon='icon: trash'></span> ${tipo.nombre} eliminado éxitosamente.`, pos: 'bottom-center', status: 'primary'})
				    })
				}, function () {
				    UIkit.notification({message: "<span uk-icon='icon: warning'></span> Operación cancelada por el usuario.", pos: 'bottom-center', status: 'danger'})
				});
				}  
				}
            	></a></td>
        </tr>
        {/each}
    </tbody>
</table>
</div>

</Collection>
</div>
</User>
</FirebaseApp>