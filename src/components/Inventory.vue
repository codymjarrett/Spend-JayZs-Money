<template>
  <div class="container">
    <ul class="flex flex-wrap mb-4 -mx-2">
      <li
        class="w-full lg:w-1/3 px-2 mb-4"
        v-for="item in allInventory"
        :key="item.id"
        :data-id="item.id"
      >
        <div class="rounded overflow-hidden shadow-lg min-h-full">
          <div
            class="bg-white bg-no-repeat bg-center h-40"
            :class="item.fullSize ? 'bg-cover' : 'bg-contain'"
            :style="{ backgroundImage: `url(${item.image})` }"
          ></div>
          <div class="p-4 bg-primary-light text-center text-2xl max-h-full">{{ item.name }}</div>
          <div class="text-center p-4 text-2xl">${{ formatNumber(item.price) }}</div>
          <div class="flex flex-wrap justify-around pb-4">
            <!-- find out how to break this out into a computed function -->
            <button
              v-on:click="sellItem(item)"
              class="bg-secondary p-4 text-white rounded"
              :class="renderDisabledButton(item)"
            >Sell</button>
            <div class="relative">
              <button
                class="decrement bg-tetriary text-white p-4 absolute top-0 left-0"
                :class="
									item.quantity == 0 &&
										'opacity-50 cursor-not-allowed pointer-events-none'
								"
                v-on:click="decrement(item)"
                tabindex="0"
              >&#45;</button>
              <input class="text-center p-4" type="number" min="0" v-model="item.quantity" />
              <button
                class="increment bg-tetriary text-white p-4 absolute top-0 right-0"
                v-on:click="increment(item)"
                v-on:keyup.enter="item.quantity++"
                tabindex="0"
              >&#43;</button>
            </div>

            <button
              class="bg-secondary hover:bg-primary p-4 text-white rounded"
              v-on:click="sendPurchase(item)"
            >Buy</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Inventory",
  props: {
    msg: String
  },
  data: () => {
    return {
      purchaseMade: false
    };
  },
  computed: {
    ...mapGetters(["allInventory", "getItemQuantity", "getItemAmount"]), 
  },
  methods: {
    ...mapActions([
      "makePurchase",
      "sellPurchase",
      "increaseNumberOfPurchase"
	]),
	formatNumber: function(price) {
      return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    clearQuantity: function() {
      this.allInventory.forEach(i => {
        i.quantity = 0;
      });
    },
    sendPurchase: function(item) {
      const price = this.getItemAmount(item.id);
      const quantity = this.getItemQuantity(item.id);
      const total = price * quantity;
      const payload = { id: item.id, quantity};
      this.increaseNumberOfPurchase(payload);
      this.makePurchase(total);
      this.clearQuantity();
    },
    sellItem: function(item) {
      const quantity = this.getItemQuantity(item.id);
      const price = this.getItemAmount(item.id);
      const total = price * quantity;
      const payload = { id: item.id, quantity, total };
      this.sellPurchase(payload);
      this.clearQuantity();
    },
    increment: function(arg) {
      arg.quantity++;
      // this.purchaseMade = true
    },
    decrement: function(arg) {
      return arg.quantity--;
    },

    renderDisabledButton: function(arg) {
      if (arg.purchased > 0) {
        return "cursor-pointer opacity-100";
      } else if (arg.purchased == 0 || arg.quantity > arg.purchased) {
        return "opacity-50 cursor-not-allowed pointer-events-none";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
