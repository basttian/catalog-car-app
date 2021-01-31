<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional




import { Router, Route, Link, router, navigateTo } from 'yrv';
import home from "./Home.svelte";




</script>

<Router>
<Route path="/" exact component={home}/>

</Router> 


