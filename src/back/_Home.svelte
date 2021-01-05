<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional

import NAV from "./_Nav.svelte";

//RUTAS
import { Router, Route, Link } from 'yrv';
import Front from './_New.svelte';
import Cat from './_Cat.svelte';

</script>
<FirebaseApp {firebase} perf analytics>
<User let:user let:auth>
<NAV email={user.email}/>


<Router>
  <Route path="/" exact component={Front}/>
  <Route fallback>Not found</Route>
  <Route path="/categorias" exact component={Cat} />
</Router>


</User>
</FirebaseApp>