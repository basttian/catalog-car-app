<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import { Router, Route, Link } from 'yrv';
export let router;
let marcas;
let marca;
let promise;
/* Buscar en tabla */
import {myFunction} from "./buscar.js";
</script>

<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container uk-margin-large-bottom">
<Collection path={`marcas`} let:data={marcas} let:ref on:ref log>
<div slot="loading"><div uk-spinner></div></div>

<div class="uk-clearfix">
    <div class="uk-float-right">
        <Link uk-tooltip="title:Atras; pos:bottom" class="uk-link-reset" go="back" ><span uk-icon="icon: arrow-left; ratio: 2"></Link>
    </div>
    <div class="uk-float-left">
        <h1 class="uk-heading-divider">Marcas</h1>
    </div>
</div>
<!-- Formulario -->
<form on:submit|preventDefault>
<input class="uk-input uk-text-capitalize" type="text" name="" bind:value={marca} placeholder="Añadir nueva marca de vehículo">
<button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-top uk-button-large" on:click={async () => {
    promise = ref.add( {
	    nombre: `${marca.charAt(0).toUpperCase().concat(marca.substring(1, marca.length))}`,//capitalizamos el registro
	    createdAt : new Date().getTime(),
	    }).then((resp)=>{
	    UIkit.notification({message: "<span uk-icon='icon: check'></span> Agregado con éxito.", pos: 'bottom-center', status: 'primary'})
	    marca = "";
	})
}}
disabled={!marca} >Añadir nuevo&nbsp;{#await promise}<div uk-spinner></div>{/await}</button>
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
	<caption>Marcas de vehículos</caption>
    <thead>
        <tr>
            <th>Marcas</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
    </thead>
    <tbody>
    	{#each marcas as item}
        <tr>
            <td>
            <input class="uk-input uk-form-blank uk-form-expand" bind:value={item.nombre} type="text">
            </td>
            <td>
            	<a uk-icon="icon: pencil"
            		on:click={()=>{
	                    item.ref.update({
	                    nombre: `${item.nombre}`,
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
				    item.ref.delete().then(()=>{
				    UIkit.notification({message: `<span uk-icon='icon: trash'></span> ${item.nombre} eliminado éxitosamente.`, pos: 'bottom-center', status: 'primary'})
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