<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional

import { Router, Route, Link } from 'yrv';
let files = [];
let data;
export let router;

//Data
let vehiculo = 
{ nuevo:true,
  tipo:"",
  marca:"",
  modelo:"",
  anio:"",
  precio:"",
  combustible:"Nafta",
  motor:"",
  transmision:"Manual",
  km:"",
  descripcion:"",
};

let promise;

// upload img

var storage = firebase.storage();
var storageRef = storage.ref();

async function Upload (f,archivos) {

       var metadata = {
        contentType: 'image/jpeg',
        };

    for (var i = 0; i < archivos.length; i++) {
        var uploadTask = storageRef.child(`/${f}/` + archivos[i].name).put(archivos[i], metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
           var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              //console.log('File available at', downloadURL);
            });
      })
    }
}


</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container">
<Collection path={'autos'} log let:data let:ref >
<div slot="loading"><div uk-spinner></div></div>

<h1 class="uk-heading-divider">Añadir nuevo</h1>

<form on:submit|preventDefault class="uk-grid-small" uk-grid>
  <div class="uk-width-1-1">
    <label><input class="uk-radio" type="radio" name="radio2" bind:group={vehiculo.nuevo} value={true}> Nuevo</label>
    <label><input class="uk-radio" type="radio" name="radio2" bind:group={vehiculo.nuevo} value={false}> Usado</label>
  </div>
  <div class="uk-width-1-1">
    <div class="uk-flex uk-flex-middle">
      <Link href="/categorias"><a class="uk-padding-small" href="" uk-icon="icon: plus"></a></Link>
      <!-- Categorias -->
      <Collection path={'categoria'} query={ (ref) => ref.orderBy("nombre", "asc")} log let:data let:ref >
      <div slot="loading"><div uk-spinner></div></div>
      <select class="uk-select" bind:value={vehiculo.tipo}>
            <option value="" selected="">Seleccionar tipo</option>}
            option
          {#each data as item, index}
            <option value={item.id}>{item.nombre}</option>
          {/each}
      </select>
      </Collection>
    </div>
  </div>
  <div class="uk-width-1-2@s">
    <div class="uk-flex uk-flex-middle">
      <Link href="/marcas"><a class="uk-padding-small" href="" uk-icon="icon: plus"></a></Link>
      <!-- Marca -->
      <Collection path={'marcas'} query={ (ref) => ref.orderBy("nombre", "asc")} log let:data let:ref >
      <div slot="loading"><div uk-spinner></div></div>
      <select class="uk-select" bind:value={vehiculo.marca}>
          <option value="" selected>Seleccionar marca</option>}
        {#each data as item, index}  
          <option  value={item.id}>{item.nombre}</option>
        {/each}
      </select>
      </Collection>
    </div>
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input uk-text-capitalize" type="text" bind:value={vehiculo.modelo} placeholder="Modelo">
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input" type="number" bind:value={vehiculo.anio} placeholder="Año">
  </div>
  <div class="uk-width-1-2@s">
      <input class="uk-input" type="number" bind:value={vehiculo.precio} placeholder="Precio">
  </div>
  <!-- Imagenes -->
  <div class="uk-width-1-1">
    <div class="uk-margin">
      <span class="uk-text-middle"><span uk-icon="camera"></span> Añadir fotos</span>
      <div uk-form-custom>
        <input type="file" bind:files accept=".jpg" multiple>
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
    <select class="uk-select" bind:value={vehiculo.combustible}>
      <option value="Nafta">Nafta</option>
      <option value="Diésel">Diésel</option>
      <option value="Etanol o Bioetanol">Etanol o Bioetanol</option>
      <option value="GLP">GLP</option>
      <option value="Electricidad">Electricidad</option>
    </select>
  </div>
  <div class="uk-width-1-4@s">
    <input class="uk-input" type="number" step="0.1" bind:value={vehiculo.motor} placeholder="Motor">
  </div>
  <div class="uk-width-1-4@s">
    <select class="uk-select" bind:value={vehiculo.transmision}>
      <option value="Manual">Manual</option>
      <option value="Automatica">Automática</option>
    </select>
  </div>
  <div class="uk-width-1-4@s">
    <input class="uk-input" type="number" bind:value={vehiculo.km} placeholder="Kilómetros">
  </div>
  <div class="uk-width-1-1">
    <textarea class="uk-textarea" rows="5" bind:value={vehiculo.descripcion} placeholder="Descripcion"></textarea>
  </div>
  <div class="uk-width-1-1">
    <button class="uk-button uk-button-primary uk-width-1-1 uk-button-large"
      on:click={(()=>{
        var folder_img = new Date().getTime();
        promise = ref.add({
          nuevo:vehiculo.nuevo,
          tipo:vehiculo.tipo,
          marca:vehiculo.marca,
          modelo:vehiculo.modelo,
          año:vehiculo.anio,
          precio:vehiculo.precio,
          combustible:vehiculo.combustible,
          motor:vehiculo.motor,
          transmision:vehiculo.transmision,
          kilometros:vehiculo.km,
          descripcion:vehiculo.descripcion,
          folder: folder_img,
          }).then(()=>{
            Upload(folder_img, files);
            vehiculo.nuevo=true;
            vehiculo.tipo="";
            vehiculo.marca="";
            vehiculo.modelo="";
            vehiculo.anio="";
            vehiculo.precio="";
            vehiculo.combustible="Nafta";
            vehiculo.motor="";
            vehiculo.transmision="Manual";
            vehiculo.km="";
            vehiculo.descripcion="";
            files=null;
            UIkit.notification({message: "<span uk-icon='icon: check'></span> Agregado con éxito.", pos: 'bottom-center', status: 'primary'});
          }).catch((e)=>{
            console.log(e);
          })

      })}
    >Agregar</button>
  </div>
</form>


<!-- Si hay un error -->
<div slot="fallback">
    Unable to display data...
</div>
</Collection>

<!-- Promise -->
{#await promise}
    <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle">
        <div uk-spinner="ratio: 3"></div>
    </div>
{/await}



</div>
</User>
</FirebaseApp>