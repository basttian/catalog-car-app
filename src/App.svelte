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

import HOME from "./front/Home.svelte";
import BACKHOME from "./back/_Home.svelte";

// Todos los vehiculos

import TODOS from "./front/Todos.svelte";


</script>

<main>

<FirebaseApp {firebase} perf analytics>
	<User let:user let:auth>
	<!-- Si no se encuentra logueado -->
		<div slot="signed-out">
			<HOME/>
            <TODOS/>
    	</div>
    <!-- Si esta logueado -->
    <BACKHOME/>
	</User>
</FirebaseApp>

</main>

