<template>
	<div>
		<span>cart</span>
        <ul>
            <li v-for="item in allInventory" :key="item.id">
                <div v-if="item.purchased">
                    <span >{{ item.name}}</span>
                    <span>{{item.purchased}} x</span>
                </div>
            </li>
        </ul>
	</div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
	name: 'Cart',
	props: {
		msg: String,
	},
	computed: {
		...mapGetters(['allInventory']),
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
