<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional

import { Router, Route, Link } from 'yrv';
let files;

</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>

<div class="uk-container">
<h1 class="uk-heading-divider">Añadir nuevo</h1>

<form class="uk-grid-small" uk-grid>
  <div class="uk-width-1-1">
    <label><input class="uk-radio" type="radio" name="radio2" checked> Nuevo</label>
    <label><input class="uk-radio" type="radio" name="radio2"> Usado</label>
  </div>
  <div class="uk-width-1-1">
    <div class="uk-flex uk-flex-middle">
      <Link href="/categorias"><a class="uk-padding-small" href="" uk-icon="icon: plus"></a></Link>
      <select class="uk-select">
          <option>Categorias</option>
          <option>Option 02</option>
      </select>
    </div>
  </div>
  <div class="uk-width-1-2@s">
      <select class="uk-select">
          <option>Marca</option>
          <option>Option 02</option>
      </select>
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input" type="text" placeholder="Modelo">
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input" type="number" placeholder="Año">
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input" type="number" placeholder="Precio">
  </div>
  <div class="uk-width-1-1">
    <div class="uk-margin">
      <span class="uk-text-middle"><span uk-icon="camera"></span> Añadir fotos</span>
      <div uk-form-custom>
        <input type="file" bind:files multiple>
        <span class="uk-link"> seleccionar</span>
      </div>
    </div>
      {#if files}
        {#each Array.from(files) as file}
          <span uk-icon="image"></span>&nbsp;{file.name}&nbsp;
        {/each}
      {/if}
  </div>
  <div class="uk-width-1-4@s">
    <input class="uk-input" type="text" placeholder="Tipo de combustible">
  </div>
  <div class="uk-width-1-4@s">
    <input class="uk-input" type="number" placeholder="Motor">
  </div>
  <div class="uk-width-1-4@s">
    <select class="uk-select">
      <option>Manual</option>
      <option>Automatica</option>
    </select>
  </div>
  <div class="uk-width-1-4@s">
    <input class="uk-input" type="number" placeholder="Kilómetros">
  </div>
  <div class="uk-width-1-1">
    <textarea class="uk-textarea" rows="5" placeholder="Descripcion"></textarea>
  </div>
  <div class="uk-width-1-1">
    <button class="uk-button uk-button-primary uk-width-1-1 uk-button-large">Agregar</button>
  </div>
</form>

</div>
</User>
</FirebaseApp>