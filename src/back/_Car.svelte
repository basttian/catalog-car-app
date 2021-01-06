<script>
import { Router, Route, Link } from 'yrv';
export let router = {};
let id = null;
$: {
    id = router.params ? router.params.id : null;
 }
</script>
{id}