<script context="module">
	import { selection } from "../store/store.js";
	export function OpenModalFicha(id) {
		selection.update(u => u = id);
		//console.log(selection)
	  UIkit.modal('#modal-container-ficha').show();
	}
</script>