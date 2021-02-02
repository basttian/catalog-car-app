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

let dataAsesores;
let contacto = false;

import PAGE from "./front/Page.svelte";
import BACKHOME from "./back/_Home.svelte";

import { selection } from "./store/store.js";

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
           
            <!-- Modal Ficha -->            
            <div id="modal-container-ficha" class="uk-modal-container" uk-modal>    
              <Doc path={`autos/${$selection}`} let:data let:ref log>
                <div slot="loading">Loading...</div>
                    <div class="uk-modal-dialog uk-modal-body">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h2 class="uk-modal-title"> <span class="uk-float-left">{data.marca} - {data.modelo} </span><span class="uk-float-right">{data.moneda} {data.precio}</span></h2>
                   <table class="uk-table uk-table-divider">
                    <thead>
                        <tr>
                            <th colspan="2">Ficha técnica</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>Año</td>
                            <td>{data.año}</td>
                        </tr>
                        <tr>
                          <td>Kilometros</td>
                            <td>{data.kilometros}</td>
                        </tr>
                        <tr>
                          <td>Tipo de combustible</td>
                            <td>{data.combustible}</td>
                        </tr>
                        <tr>
                          <td>Motor</td>
                            <td>{data.motor}</td>
                        </tr>
                        <tr>
                          <td>Transmision</td>
                            <td>{data.transmision}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2"><span class="uk-text-uppercase uk-text-bolder">Información adicional: </span>{data.descripcion}</td>
                      </tr>
                    </tfoot>
                </table>

                
                <h3 class="uk-heading-divider">Solicitar información <span uk-icon="chevron-double-right"></span> {data.marca} - {data.modelo}</h3>

                <Collection path={'asesores'} let:data={dataAsesores} let:ref log 
                query={(ref) => ref.where("contactoEnLinea","==",true).limit(1)} >
                <div slot="loading"><div uk-spinner></div></div>
                {#each dataAsesores as value}
                  <a on:click={()=>UIkit.modal('#modal-container-ficha').hide()} href="https://api.whatsapp.com/send?phone={value.telefono}&text=Consulta%20por%20el%20{data.marca}%20-%20{data.modelo}" class="uk-icon-button uk-margin-small-right" uk-icon="whatsapp" target="_blank"></a>
                  <a on:click={()=>UIkit.modal('#modal-container-ficha').hide()} href="https://www.messenger.com/t/{value.facebook}" class="uk-icon-button  uk-margin-small-right" uk-icon="facebook" target="_blank"></a>
                  <a on:click={()=>UIkit.modal('#modal-container-ficha').hide()} href="mailto:{value.email}?subject=Consulta&body={data.marca}-{data.modelo}" class="uk-icon-button  uk-margin-small-right" uk-icon="mail" target="_blank"></a>
                {/each}
                </Collection>

                <Collection path={'asesores'} let:data let:ref log query={(ref) => ref.where("contactoEnLinea","==",false)} >
                  <div slot="loading"><div uk-spinner></div></div>
                  <button on:click={()=> contacto = true } class="uk-icon-button" uk-icon="receiver"></button>
                  {#if contacto}
                    <hr>
                    <ul class="uk-list uk-list-divider">
                      {#each data as value}
                        <li><a class="uk-link-heading" href="tel:+{value.telefono}" > <span uk-icon="icon: phone"></span> {value.nombre} | {value.telefono}</a></li>
                      {/each}
                    </ul>
                  {/if}
                </Collection>
                <p></p>
                </div>
              </Doc>
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