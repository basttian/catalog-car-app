<script>
	import { Router, Route, Link } from 'yrv';
	export let router = {};

	import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
	import firebase from "firebase/app";


let id = null;
let nombre;
let telefono;
let email;
let txtbuscar;

let contactoEnLinea = false;
let tagOnlineTrue = `<span class="uk-label"><span uk-icon="icon: check"></span></span>`;
let tagOnlineFalse = `<span class="uk-label uk-label-danger"><span uk-icon="icon: close"></span></span>`;

import {buscarTabla} from "./buscar.js";

</script>
<svelte:head>
	<title>System</title>
</svelte:head>

<FirebaseApp {firebase}>
<div class="uk-container uk-container-expand uk-margin-large-bottom">
	<h1 class="uk-heading-divider">Configuración</h1>
	<div class="uk-grid-divider" uk-grid>


		<!-- Colum1 -->
		<div class="uk-width-auto@m">
		<Collection path={`asesores`} log let:data let:ref={asesorRef} >
		<span slot="loading">Loading...</span>
    <span slot="fallback">Error...</span>	
		<fieldset class="uk-fieldset">
			<legend class="uk-legend">Asesores de venta</legend>
				<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label><input class="uk-checkbox" type="checkbox" bind:checked={contactoEnLinea} > Contacto en linea</label>
        </div>
				<div class="uk-margin">
					<label><input class="uk-input" bind:value={nombre} placeholder="Nombre" ></label>
				</div>
				<div class="uk-margin">
					<label><input class="uk-input" type="number" bind:value={telefono} placeholder="Telefono"></label>
				</div>
				<div class="uk-margin">
					<label><input class="uk-input" type="email" bind:value={email} placeholder="Email"></label>
				</div>
				<input bind:value={id} type="hidden">

				<div class="uk-margin">
					<button class="uk-button uk-button-default" on:click={ ()=> asesorRef.add({nombre:nombre,telefono:telefono,email:email.toLowerCase(),contactoEnLinea:contactoEnLinea}).then(()=>{nombre='';telefono=''; email='';contactoEnLinea=false}) } disabled="{!nombre || !telefono || id!=null }">Crear nuevo asesor de venta</button>
				</div>

				<Doc path={`asesores/${id}`} let:data let:ref log >
					<div slot="loading">Loading...</div>
					<div class="uk-button-group">
				    <button class="uk-button uk-button-default" on:click={ ()=> ref.update({nombre:nombre,telefono:telefono,email:email.toLowerCase(),contactoEnLinea:contactoEnLinea}).then(()=>{id = null; txtbuscar =''; nombre='';telefono=''; email='';contactoEnLinea=false})} disabled="{!nombre || !telefono || id===null }"
				    >Actualizar</button>
				    <button class="uk-button uk-button-default" on:click={ ()=> ref.delete().then(()=>{id = null; txtbuscar ='';nombre='';telefono=''; email=''})}>Delete</button>
					</div>
		 		</Doc>
		</fieldset>
    
		</Collection>
		</div>
    <!-- Colum2 -->
    <div class="uk-width-expand@m">
    <Collection path={'asesores'} log let:data let:ref >
    <div slot="loading">Loading...</div>
    <div slot="fallback">Unable to display asesores...</div>

		<!-- Formulario Buscar  -->
		<div class="uk-background-muted uk-margin-small uk-padding-small">
		    <form on:submit|preventDefault class="uk-search uk-search-navbar">
		        <span uk-search-icon></span>
		        <input class="uk-search-input uk-text-capitalize" bind:value={txtbuscar} type="search" placeholder="Buscar..." id="myInput" on:keyup={buscarTabla}>
		    </form>
		</div>

		<div class="uk-overflow-auto">
    	<table class="uk-table uk-table-small uk-table-divider uk-table-responsive uk-table-hover" id="myTable">
		    <caption>Lista de asesores</caption>
		    <thead>
		        <tr>
		          <th>Asesor</th>
		          <th>Teléfono</th>
		          <th>Email</th>
		          <th></th>
		        </tr>
		    </thead>
		    <tbody>
		    	{#each data as item}
		        <tr class="hand" on:click={()=> {id = item.id ;nombre = item.nombre ;telefono=item.telefono; email=item.email;contactoEnLinea=item.contactoEnLinea }}>
		          <td>{item.nombre}</td>
		          <td>{item.telefono}</td>
		          <td>{item.email}</td>
		          <td>{@html item.contactoEnLinea ? tagOnlineTrue : tagOnlineFalse }</td>
		        </tr>
		      {/each}
		    </tbody>  
			</table>
		</div>


    </Collection>
  	</div>
</div>
</div>
</FirebaseApp>
