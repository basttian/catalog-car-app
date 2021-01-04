<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional
export let email;


</script>

<nav class="uk-navbar uk-navbar-container uk-margin">
    <div class="uk-navbar-left">
        <a class="uk-navbar-toggle" uk-toggle="target: #offcanvas-reveal">
            <span uk-navbar-toggle-icon></span>
        </a>
    </div>
</nav>



<div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h4>{email}</h4>
		<FirebaseApp {firebase} perf analytics>
		<User let:user let:auth>
	        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>


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