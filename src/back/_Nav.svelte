<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional

import { Router, Route, Link, router, navigateTo } from 'yrv';
router.subscribe(e => {
if (!e.initial) console.log(e);
});
export let email;
</script>
<!-- Nav -->
<nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-reveal">
            <span uk-navbar-toggle-icon></span>
        </a>
    </div>
    <!-- Oculto si no se encuentra en /home -->
    <div class="uk-navbar-right">
		{#if  $router.path != "/" }
		    <Link uk-tooltip="title:Atras; pos:bottom" class="uk-link-reset uk-margin-small-right" go="back" ><span uk-icon="icon: arrow-left; ratio: 2"></Link>
	  	{:else}
	  		<Link class="uk-margin-small-right" href="/lista" uk-tooltip="title: Catálogo de autos; pos: bottom"><span uk-icon="icon: file-text; ratio: 2"></span></Link>
	  	{/if}
  	</div>
</nav>

<!-- Cambas -->
<div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h4>{email}</h4>
		<FirebaseApp {firebase} perf analytics>
		<User let:user let:auth>
	        <p>
				<span class="uk-icon-link uk-margin-small-right" uk-icon="list"></span>
				<a on:click={() => navigateTo(router.path =`/system`) }
				class="uk-icon-link uk-margin-small-right" uk-icon="cog" uk-tooltip="title: Configuración; pos: bottom"></a>
				<a on:click={() => 
		          UIkit.modal.confirm('Cerrar sesión.').then(function() {
		            //console.log('Confirmed.')
		          auth.signOut().then(resp => {
		          UIkit.notification({
		          message: '<span uk-icon=\'icon: check\'></span> Desconexión satisfactoria.', 
		          status: 'secondary',
		          pos: 'bottom-center',
		          timeout: 1000
		          });  
		            navigateTo(router.path =`/`);
		          });
		          }, function () {
		            //console.log('Rejected.')
		          })}
		          class="uk-icon-link uk-float-right" uk-icon="sign-out" uk-tooltip="title: Salir; pos: bottom"></a>
	        </p>
	        <div>
	        	<hr>
		        <ul class="uk-list uk-list-large uk-list-divider">
		        	<li><Link href="/">Añadir nuevo vehículo</Link></li>
		            <li><Link href="/categorias">Tipos de vehículos</Link></li>
		            <li><Link href="/marcas">Marcas de coches</Link></li>
		            <li><Link href="/lista">Catálogo de autos</Link></li>
		        </ul>
		    </div>


	        <div class="uk-position-bottom uk-margin-small-left uk-margin-small-bottom">
	        	<a on:click={() => 
		          UIkit.modal.confirm('Cerrar sesión.').then(function() {
		            //console.log('Confirmed.')
		          auth.signOut().then(resp => {
		          UIkit.notification({
		          message: '<span uk-icon=\'icon: check\'></span> Desconexión satisfactoria.', 
		          status: 'secondary',
		          pos: 'bottom-center',
		          timeout: 1000
		          }); 
		          	navigateTo(router.path =`/`);   
		          });
		          }, function () {
		            //console.log('Rejected.')
		          })}
		      	><span uk-icon="icon: sign-out"></span> Salir</a>
	        </div>
	    </User>
		</FirebaseApp>
    </div>
</div>