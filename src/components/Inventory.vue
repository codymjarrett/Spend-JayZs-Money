<template>
  <div class="container">
    <ul class="flex flex-wrap mb-4 -mx-2">
      <li class="w-1/3 px-2 mb-4" v-for="item in inventory" :key="item.id" :data-id="item.id">
        <div class="rounded overflow-hidden shadow-lg min-h-full">
          <div
            class="bg-white bg-no-repeat bg-center h-40"
            :class="item.fullSize ? 'bg-cover' : 'bg-contain'"
            :style="{backgroundImage: `url(${item.image})` }"
          ></div>
          <div class="p-4 bg-primary-light text-center text-2xl max-h-full">{{item.name}}</div>
          <div class="text-center p-4 text-2xl">${{formatNumber(item.price)}}</div>
          <div class="flex flex-wrap justify-around pb-4">
            <!-- find out how to break this out into a computed function -->
            <button v-on:click="alert('hello')" class="bg-secondary p-4 text-white rounded" :class="renderDisabledButton(item)">Sell</button>
            <div class="relative">
              <button
                class="decrement bg-tetriary text-white p-4 absolute top-0 left-0"
                :class="item.quantity == 0 &&'opacity-50 cursor-not-allowed pointer-events-none'"
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
              v-on:click="sendPurchase(item.id)"
            >Buy</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { inventory } from "../inventory/inventory";
import { eventBus } from "../event-bus";

export default {
  name: "Inventory",
  props: {
    msg: String
  },
  data: () => {
    return {
      inventory: inventory,
      purchaseMade: false
    };
  },
  methods: {
    getItemAmount: function(id) {
      const item = this.inventory
        .filter(item => item.id === id)
        .map(item => item.price);
      return item[0];
      // eventBus.$emit('item-purchased', data)
    },
    getItemQuantity: function(id) {
      const item = this.inventory
        .filter(item => item.id === id)
        .map(item => item.quantity);
      return item[0];
    },
    clearQuantity: function() {
      this.inventory.map(i => {
        i.quantity = 0;
      });
    },
    sendPurchase: function(id) {
      const price = this.getItemAmount(id);
      const quantity = this.getItemQuantity(id);
      const total = price * quantity;
      eventBus.$emit("total-purchase", total);
      this.clearQuantity();
    },
    // sellPurchase: function(id) {
    //   if()
    // }
    formatNumber: function(price) {
      return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    increment: function(arg) {
      arg.quantity++;
      this.purchaseMade = true;
    },
    decrement: function(arg) {
      return arg.quantity--;
    },

    renderDisabledButton: function(arg) {
      if (arg.quantity > 0 && this.purchaseMade) {
        return "cursor-pointer opacity-100";
      } else if (arg.quantity == 0) {
        return "opacity-50 cursor-not-allowed";
      }
    }
  },
  computed: {},
  watch: {
    // getItemQuantity: function() {}
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
