<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional
import { Router, Route, Link, router, navigateTo } from 'yrv';

let selTipos,selMarca,selModelo ;
let selectedTipo,selectedMarca,selectedModelo;

let busquedas=[];

let show = true;
let showbrand = true;

function HideTipeVehicle(){
  show = false;
  showbrand = true;
}

function HideBrandVehicle(){
  show = false;
  showbrand = false;
}

var storage = firebase.storage();
var storageRef = storage.ref();

// Todos los vehiculos
import TODOS from "./Todos.svelte";
// Vehiculos destacados
import DESTACADOS from "./Featured.svelte";


import {OpenModalFicha} from "./Ficha.svelte"

</script>

<FirebaseApp {firebase} perf analytics >
<div class="uk-container uk-margin-medium-top uk-margin-xlarge-bottom">
	
<div class="uk-card uk-card-default uk-card-hover uk-cover-container">	
<div class="uk-card-header">
<h1 class="uk-card-title uk-text-center">Tu nuevo vehículo está acá</h1>
</div>

<div class="uk-card-body">
<form on:submit|preventDefault class="uk-grid-small" uk-grid>

  <Collection path={`categoria`} query={(ref) => ref.orderBy("nombre", "asc")} let:data={selTipos} let:ref log>
    <div slot="loading"><div uk-spinner></div></div>
    <div class="uk-width-1-2@s">
      <select class="uk-select" bind:value={selectedTipo} on:change={()=>show=true} >
        <option value="" selected>Seleccionar tipo de vehículo</option>
        {#each selTipos as tipo, i}
          <option value={tipo.nombre}>{tipo.nombre}</option>
        {/each}
      </select>
    </div>
    <div slot="fallback">Unable to display...</div>
  </Collection>

  <Collection path={`marcas`} query={(ref) => ref.where("tipo","==",`${selectedTipo}`)} let:data={selMarca} let:ref log>
  <div slot="loading"><div uk-spinner></div></div>
    <div class="uk-width-1-4@s">
      <select class="uk-select" bind:value={selectedMarca} on:change={()=> HideTipeVehicle()}>
        <option value="" selected>Marcas disponibles</option>
        {#each selMarca as marca, i}
          <option value={marca.nombre}>{marca.nombre}</option>
        {/each}
      </select>
    </div>
    <div slot="fallback">Unable to display...</div>
  </Collection> 

  <Collection path={`autos`} 
  query={ref => ref.where('tipo', '==', `${selectedTipo}` ).where('marca', '==', `${selectedMarca}` )} let:data={selModelo} let:ref log>
  <div slot="loading"><div uk-spinner></div></div>
    <div class="uk-width-1-4@s">

      {#if selModelo.length >= 1}
      <select class="uk-select" bind:value={selectedModelo} disabled={!selectedTipo || !selectedMarca} on:change={()=> HideBrandVehicle()}>
          <option value="">Modelos disponibles</option>
          {#each selModelo as modelo, index}
            <option value={modelo.modelo}>{modelo.modelo}</option>
          {/each}
      </select>
      {:else}
        <select class="uk-select" disabled={true}>
          <option value="">Modelos disponibles</option>
        </select>
      {/if}

    </div>
  </Collection> 
</form>
</div>
</div>

<!-- --------------------------------Resultados----------------------------- -->


{#if show}

<Collection path={'autos'} let:data={busquedas} let:ref log  
query={(ref) => ref.where("tipo","==",`${selectedTipo}`)} >
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-child-width-1-3@m uk-margin-top" uk-grid>
{#each busquedas as item, index}
  <div>
    <!-- Producto -->
    <div class="uk-card uk-card-default uk-width-1@m">
      <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                  <a href="" class="uk-icon-button" uk-icon="whatsapp"></a>
              </div>
              <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">{item.modelo}</h3>
                  <p class="uk-text-meta uk-margin-remove-top">{item.año} | {item.kilometros} Km | <span class="uk-text-bold">{item.moneda}&nbsp;{item.precio}</span> </p>
              </div>
          </div>
      </div>
      <div class="uk-card-body">
          <!-- Imagen -->
          {#await storageRef.child(`${item.folder}`).listAll()}
            <div uk-spinner></div>
              {:then result}
          <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow>
              <div uk-lightbox="autoplay:true" >
                <ul class="uk-slideshow-items">
                    {#each result.items as item,i}
                    <li>
                        {#await item.getDownloadURL()}
                            <div uk-spinner></div>
                            {:then url} 
                              <a class="uk-inline" href={url} data-caption={item.name} data-type="image">
                                <img src={url} alt="">
                              </a>
                        {/await}
                    </li>
                    {/each}
                </ul>
              </div>
              <a class="uk-slidenav-large uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
              <a class="uk-slidenav-large uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a> 
          </div>
              {:catch error}
                  <p style="color: red">{error.message}</p>
          {/await}
          <!-- Fin Imagen -->
      </div>
      <div class="uk-card-footer">
        <a class="uk-button uk-button-text" on:click={()=> OpenModalFicha(item.id) } >Ver ficha técnica</a>
      </div>
    </div>
    <!-- Fin producto -->
  </div>
{/each}
</div>
</Collection>

{/if}

{#if !show && showbrand}

<Collection path={'autos'} let:data={busquedas} let:ref log  
query={(ref) => ref.where("tipo","==",`${selectedTipo}`).where("marca","==",`${selectedMarca}`)} >
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-child-width-1-3@m uk-margin-top" uk-grid>
{#each busquedas as item, index}
  <div>
      <div class="uk-card uk-card-default">
          <div class="uk-card-media-top">
              <img src="images/light.jpg" alt="">
          </div>
          <div class="uk-card-body">
              <h3 class="uk-card-title">{item.modelo}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
      </div>
  </div>
{/each}
</div>
</Collection>

{/if}

<Collection path={'autos'} let:data={busquedas} let:ref log  
query={(ref) => ref.where("tipo","==",`${selectedTipo}`).where("marca","==",`${selectedMarca}`).where("modelo","==",`${selectedModelo}`)} >
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-child-width-1-3@m uk-margin-top" uk-grid>
{#each busquedas as item, index}
  <div>
      <div class="uk-card uk-card-default">
          <div class="uk-card-media-top">
              <img src="images/light.jpg" alt="">
          </div>
          <div class="uk-card-body">
              <h3 class="uk-card-title">{item.modelo}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          </div>
      </div>
  </div>
{/each}
</div>
</Collection> 

</div>
</FirebaseApp>


<!-- Section Todos los productos -->
<TODOS/>
<!-- Section destacados -->
<DESTACADOS/>