<script>
import { FirebaseApp, Doc, Collection, User, UploadTask, StorageRef } from "sveltefire";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance"; // Optional
import "firebase/analytics"; // Optional
import { Router, Route, Link, router, navigateTo } from 'yrv';

let autos;

var storage = firebase.storage();
var storageRef = storage.ref();

import {OpenModalFicha} from "./Ficha.svelte"

</script>


<div class="uk-container uk-container-expand uk-margin-medium-bottom">
<div class="uk-slider-container-offset" uk-slider>
<h1 class="uk-heading-bullet">Destacados</h1>

<FirebaseApp {firebase} perf analytics>
<Collection path={`autos`} query={ref => ref.where('featured', '==', true)} let:data={autos} let:ref on:ref log>
<div slot="loading"><div uk-spinner></div></div>


    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

        <ul class="uk-child-width-1-2@s uk-child-width-1-3@m uk-slider-items uk-child-width-1-4@s uk-grid">
        {#each autos as item}    
            <li>
                <div class="uk-card uk-card-default uk-card-hover">
                    <div class="uk-card-media-top">

                        {#await storageRef.child(`${item.folder}`).listAll()}
                        <div uk-spinner></div>
                            {:then result}
                        <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow>
                            <ul class="uk-slideshow-items">
                                {#each result.items as item,i}
                                <li>
                                    {#await item.getDownloadURL()}
                                        <div uk-spinner></div>
                                        {:then url} 
                                            <img src={url} alt="">
                                    {/await}
                                </li>
                                {/each}
                            </ul>
                            <a class="uk-slidenav-large uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
                            <a class="uk-slidenav-large uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
                        </div>

                            {:catch error}
                                <p style="color: red">{error.message}</p>
                        {/await}

                    </div>
                    <div class="uk-card-body hand" on:click={()=> OpenModalFicha(item.id) }>
                        <div class="uk-card-badge uk-label">{item.nuevo?"0 km":"Usado"}</div>
                        <h3 class="uk-card-title">{item.marca} {item.modelo}</h3>
                        <p>Año:{item.año}</p>
                        <p>{item.kilometros}Km</p>
                    </div>
                </div>
            </li>
        {/each}
        </ul>

        <a class="uk-dark uk-position-top-left" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-dark uk-position-top-right" href="#" uk-slidenav-next uk-slider-item="next"></a>

    </div>

    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>



</Collection>
</FirebaseApp>

</div>
</div>