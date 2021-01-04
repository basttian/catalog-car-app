<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional

let usuario;
let clave;
let promise;


</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<div slot="signed-out">
<div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
    data-src="images/frente.jpg"
    data-srcset="images/frente.jpg"
    data-sizes="(min-width: 650px) 650px, 100vw" uk-img>
    <div class="uk-text-center uk-padding-small">
        <h1 class="uk-margin-remove">MyCar</h1>
        <p class="uk-margin-remove"></p>
    </div>
    <div class="uk-position-top uk-padding-small">
      <a href="#modal-container" uk-toggle class="uk-float-right" uk-icon="icon:user; ratio: 1.5"></a>
    </div>
</div>


<div class="uk-container uk-margin-medium-top">
	
<div class="uk-card uk-card-default uk-card-hover uk-cover-container">	
<div class="uk-card-header">
<h1 class="uk-card-title uk-text-center">Tu nuevo vehículo está acá</h1>
</div>
<div class="uk-card-body">
<form class="uk-grid-small" uk-grid>
	
    <div class="uk-width-1-2@s">
        <input class="uk-input" type="text" placeholder="Categoria">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Marca">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Modelo">
    </div>
   <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Precio desde">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Precio hasta">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Año desde">
    </div>
    <div class="uk-width-1-4@s">
        <input class="uk-input" type="text" placeholder="Año hasta">
    </div>
    <div class="uk-width-1-1">
    	<button class="uk-button uk-button-primary uk-width-1-1 uk-button-large">Buscar</button>
	</div>

</form>
</div>
</div>


<div class="uk-child-width-1-2@m uk-margin-top" uk-grid>
    <div>
        <div class="uk-card uk-card-default">
            <div class="uk-card-media-top">
                <img src="images/light.jpg" alt="">
            </div>
            <div class="uk-card-body">
                <h3 class="uk-card-title">Media Top</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
        </div>
    </div>
    <div>
        <div class="uk-card uk-card-default">
            <div class="uk-card-body">
                <h3 class="uk-card-title">Media Bottom</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div class="uk-card-media-bottom">
                <img src="images/light.jpg" alt="">
            </div>
        </div>
    </div>
</div>


</div>

<!-- MODAL LOGIN -->
<div id="modal-container" class="uk-modal-container" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">Bienvenido!!</h2>
        <p>Ingresa tu usuario y contraseña.</p>
        <form class="uk-grid-small" uk-grid on:submit|preventDefault>
          <div class="uk-width-1-1">
              <input class="uk-input" bind:value={usuario} type="email" placeholder="Email">
          </div>
          <div class="uk-width-1-1">
              <input class="uk-input" bind:value={clave} type="password" autocomplete="password" placeholder="Contraseña">
          </div>
          <div class="uk-width-1-1">
            <button class="uk-button uk-button-primary uk-width-1-1 uk-button-large"
              on:click={async ()=>{
                promise = auth.signInWithEmailAndPassword( `${usuario}` , `${clave}`).then(even=>{
                   //console.log("Login correcto") 
                   UIkit.modal('#modal-container').hide().then(()=>{
                    usuario="";
                    clave="";
                   })
                }).catch(error=>{
                  //console.log(error);
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  UIkit.notification({message: `<span uk-icon='icon: warning'></span> ${errorMessage}`,
                    pos: 'bottom-center', 
                    status: 'danger',
                    timeout: 1000
                  })
                })
              }}
            >Ingresar&nbsp;{#await promise}<div uk-spinner></div>{/await}
          </button>
          </div>
        </form>
    </div>
</div>




</div><!-- slot signed-out  -->
</User>
</FirebaseApp>