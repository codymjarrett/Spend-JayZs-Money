<template>
	<div class=" bg-yellow-600 p-4 text-center lg:fixed lg:right-5 lg:top-1 lg:z-10 lg:rounded-sm lg:min-w-custom-330px">
		<span class="text-2xl uppercase">cart</span>
        <ul>
            <li class="p-2 border-t first:border-t-0 border-solid border-black" v-for="item in displayCurrentCard" :key="item.id" >
                <div >
                    <span >{{ item.name}} - </span>
                    <span>{{item.purchased}}x</span>
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
        displayCurrentCard: function(){
            const cart = this.allInventory.filter(i => i.purchased)
            return cart
        }
    },
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
