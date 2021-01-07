<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import { Router, Route, Link } from 'yrv';
export let router = {};
let id = null;
$: {
    id = router.params ? router.params.id : null;
 }

var storage = firebase.storage();
var storageRef = storage.ref();

const borrarIMG = (a) =>{
	var desertRef = storageRef.child(a);
	desertRef.delete().then(function() {
		console.log("File deleted successfully")
	}).catch(function(error) {
		console.log(error.message)
	});
}


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


// Variables
let estado,tipo,marca,modelo,anio,precio,motor,kilometros,descripcion;
//Select
let selectTipos;
let selectMarcas;
let selectedtra;
let selectedcomb;
let selectedmoney;

let transmision = [
	{valor: "Manual", texto:"Manual"},
	{valor: "Automática", texto:"Automática"}
];

let combustible =[
	{valor: "Nafta", texto: "Nafta"},
	{valor: "Diésel", texto: "Diésel"},
	{valor: "Etanol o Bioetanol", texto: "Etanol o Bioetanol"},
	{valor: "GLP", texto: "GLP"},
	{valor: "Electricidad", texto: "Electricidad"}
];

let moneda = [
	{valor: "$", texto: "$"},
	{valor: "$USD", texto: "$USD"}
];

let files = [];
let promise;

</script>

<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div class="uk-container uk-margin-large-bottom">
<Doc path={`autos/${id}`} let:data={autoData} let:ref={autoRef} log>
<div slot="loading">Loading...</div>

<div class="">
<h3 class="uk-heading-divider">{autoData.marca}&nbsp;{autoData.modelo}&nbsp;{autoData.año}&nbsp;-&nbsp;{autoData.kilometros}Km
<span class="uk-float-right uk-visible@s">{autoData.moneda}&nbsp;{autoData.precio}</span></h3>
</div>	

<div class="uk-grid-divider" uk-grid>
<!-- Imagenes grid-->
<div class="uk-width-auto@m">
<span class="uk-margin-small-bottom" uk-icon="icon: thumbnails; ratio: 1.5"></span>
{#await storageRef.child(`${autoData.folder}`).listAll()}
<div uk-spinner></div>
{:then res}

	{#each res.items as item,i}
	<div uk-grid>
    <div>

		<div uk-lightbox>
		{#await item.getDownloadURL()}
			<div uk-spinner></div>
			{:then url}	
				<div class="uk-margin">
				<a class="uk-inline" href={url} data-caption={item.name}>
					<img src={url} width="100" alt="">
				</a>
				</div>
		{/await}
		</div>
		
</div>
<div><a uk-icon="icon: trash" on:click={()=>borrarIMG(item.fullPath)}></a></div>
</div>
	{/each}	

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<hr>
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
          <p><span uk-icon="image"></span>&nbsp;{file.name}</p>
        {/each}
      {/if}
  </div>


</div>
<!-- Datos grid-->
<div class="uk-width-expand@m">
	<form on:submit|preventDefault class="uk-grid-small" uk-grid>
    <div class="uk-width-1-1">
	    <label><input class="uk-radio" type="radio" name="radio2" bind:group={estado} value={true} checked={autoData.nuevo===true ? estado = true : ''} > Nuevo</label>
	    <label><input class="uk-radio" type="radio" name="radio2" bind:group={estado} value={false} checked={autoData.nuevo===false ? estado = false: '' } > Usado</label>
    </div>
    <div class="uk-width-1-2@s"> 
        <Collection path={`categoria`} let:data={selectTipos} let:ref on:ref log>
		<div slot="loading"><div uk-spinner></div></div>
        <select class="uk-select" bind:value={tipo}>
        	{#each selectTipos as item, index}
        		{#if autoData.tipo===item.nombre}
        			<option value={item.nombre} selected>{item.nombre}</option>
        		{:else}
        			<option value={item.nombre} >{item.nombre}</option>
        		{/if}
        	{/each}
    	</Collection>
    </div>
    <div class="uk-width-1-2@s"> 
        <Collection path={`marcas`} let:data={selectMarcas} let:ref on:ref log>
		<div slot="loading"><div uk-spinner></div></div>
        <select class="uk-select" bind:value={marca}>
        	{#each selectMarcas as item, index}
        		{#if autoData.marca===item.nombre}
        			<option value={item.nombre} selected>{item.nombre}</option>
        		{:else}
        			<option value={item.nombre} >{item.nombre}</option>
        		{/if}
        	{/each}
    	</Collection>
    </div>
    <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" bind:this={modelo} value={autoData.modelo} placeholder="Modelo">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="number" bind:this={anio} value={autoData.año} placeholder="Año">
    </div>
    <div class="uk-width-1-1@s">
    	<div class="uk-flex uk-flex-middle">
    	<div class="uk-link uk-margin-small-right" uk-form-custom="target: true">
          <select bind:value={selectedmoney}>
              {#each moneda as item}
              	{#if autoData.moneda === item.texto }
              		<option value={item.valor} selected >{item.texto}</option>
              	{:else}
					<option value={item.valor}>{item.texto}</option>
              	{/if}
              {/each}
          </select>
          <span></span>
      	</div>
        <input class="uk-input" type="number" bind:this={precio} value={autoData.precio} placeholder="Precio">
        </div>
    </div>
    <div class="uk-width-1-4@s">
        <select class="uk-select" bind:value={selectedcomb}>
        	{#each combustible as item,i}
        		{#if autoData.combustible === item.texto}
        			<option value={item.valor} selected >{item.texto}</option>
        		{:else}
        			<option value={item.valor}>{item.texto}</option>
        		{/if}
        	{/each}
    	</select>
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="number" step="0.1" bind:this={motor} value={autoData.motor} placeholder="Motor">
    </div>
    <div class="uk-width-1-4@s">
        <select class="uk-select" bind:value={selectedtra}>
        	{#each transmision as item,i}
        		{#if autoData.transmision === item.texto}
        			<option value={item.valor} selected >{item.texto}</option>
        		{:else}
        			<option value={item.valor}>{item.texto}</option>
        		{/if}
        	{/each}
    	</select>
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="number" bind:this={kilometros} value={autoData.kilometros}  placeholder="Km">
    </div>
    <div class="uk-width-1-1">
    	<textarea class="uk-textarea" rows="5" bind:this={descripcion} placeholder="Descripcion">{autoData.descripcion}</textarea>
    </div>
    <div class="uk-width-1-1">
    	<button class="uk-button uk-button-primary uk-width-1-1 uk-margin-small-top uk-button-large" on:click={()=>

      	promise = autoRef.update({
          nuevo:estado,
          tipo:tipo,
          marca:marca,
          modelo:modelo.value,
          año:anio.value,
          moneda:selectedmoney,
          precio:precio.value,
          combustible:selectedcomb,
          motor:motor.value,
          transmision:selectedtra,
          kilometros:kilometros.value,
          descripcion:descripcion.value,
          folder: autoData.folder,
          }).then(()=>{
            Upload(autoData.folder, files);
            UIkit.notification({message: "<span uk-icon='icon: check'></span> Actualizado con éxito.", pos: 'bottom-center', status: 'primary'});
          }).catch((e)=>{
            console.log(e);
          })

      	}>Actualizar registro&nbsp;{#await promise}<div uk-spinner></div>{/await}</button>
    </div>
</form>
</div>
</div>
</Doc>
</div>
</User>
</FirebaseApp>