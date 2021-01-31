<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional
var firebaseConfig = {
    apiKey: "AIzaSyCGPgiPCoDhHI65zXdCVHOqbawy9TFlz64",
    authDomain: "svelte-8a252.firebaseapp.com",
    projectId: "svelte-8a252",
    storageBucket: "svelte-8a252.appspot.com",
    messagingSenderId: "676731534792",
    appId: "1:676731534792:web:0b97621cb8b8946491d4fd"
	};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let usuario;
let clave;
let promise;

import PAGE from "./front/Page.svelte";
import BACKHOME from "./back/_Home.svelte";

</script>
<main uk-height-viewport="expand: true">

<FirebaseApp {firebase} perf analytics>
	<User let:user let:auth>
	<!-- Si no se encuentra logueado -->
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
            <PAGE/>
    	</div>
    <!-- Si esta logueado -->
    <BACKHOME/>
	</User>
</FirebaseApp>

</main>

<footer>
    <div class="uk-background-muted uk-padding uk-panel">
        <span class="uk-float-right uk-text-meta">Cybernetically enhanced web apps | <a href="https://svelte.dev/" target="_blank"><span class="uk-text-warning"> svelte</span></a></span>
    </div>
</footer>