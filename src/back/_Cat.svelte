<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import { Router, Route, Link } from 'yrv';
let categoria;
let promise;
</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container uk-margin-large-bottom">
<Collection path={`categoria`} let:data let:ref on:ref log>
<div slot="loading"><div uk-spinner></div></div>

<div class="uk-clearfix">
    <div class="uk-float-right">
        <Link uk-tooltip="title:Atras; pos:bottom" class="uk-link-reset" go="back" ><span uk-icon="icon: arrow-left; ratio: 2"></Link>
    </div>
    <div class="uk-float-left">
        <h1 class="uk-heading-divider">Tipos de vehículos</h1>
    </div>
</div>

<input class="uk-input" type="text" name="" bind:value={categoria} placeholder="Tipo de vehículo">
<button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-top uk-button-large" type="button" on:click={async () => {
    promise = ref.add( {
	    nombre: `${categoria}`,
	    createdAt : new Date().getTime(),
	    }).then((resp)=>{
	    UIkit.notification({message: "<span uk-icon='icon: check'></span> Agregado con éxito.", pos: 'bottom-center', status: 'primary'})
	    categoria = "";
	})
}}
disabled={!categoria} >Añadir nuevo&nbsp;{#await promise}<div uk-spinner></div>{/await}</button>

<hr>

<div class="uk-overflow-auto">
<table class="uk-table uk-table-striped">
	<caption>Lista de vehículos</caption>
    <thead>
        <tr>
            <th>Tipos</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
    </thead>
    <tbody>
    	{#each data as categoria}
        <tr>
            <td>
            <input class="uk-input uk-form-blank uk-form-expand" bind:value={categoria.nombre} type="text">
            </td>
            <td>
            	<a uk-icon="icon: pencil"
            		on:click={()=>{
	                    categoria.ref.update({
	                    nombre: `${categoria.nombre}`,
	                    updatedAt : new Date().getTime()
	                    }).then(resp=>{
	                        UIkit.notification({message: `<span uk-icon='icon: pencil'></span> Registro actualizado con éxito.`, pos: 'bottom-center', status: 'primary'})
	                    })
                    }}
            	></a>
            </td>
            <td><a uk-icon="icon: trash"
				on:click={()=>{
				UIkit.modal.confirm('Esta seguro que desea eliminar este registro!').then(function() {
				    categoria.ref.delete().then(()=>{
				    UIkit.notification({message: `<span uk-icon='icon: trash'></span> ${categoria.nombre} eliminado éxitosamente.`, pos: 'bottom-center', status: 'primary'})
				    })
				}, function () {
				    UIkit.notification({message: "<span uk-icon='icon: warning'></span> Operación cancelada.", pos: 'bottom-center', status: 'danger'})
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