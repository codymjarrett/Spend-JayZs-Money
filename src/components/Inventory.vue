<template>
  <div class="container">
    <ul class="flex flex-wrap mb-4 -mx-2">
      <li class="w-1/3 px-2 mb-4" v-for="item in inventory" :key="item.id" :data-id="item.id">
        <div class="rounded overflow-hidden shadow-lg">
          <div
            class="bg-contain bg-white bg-no-repeat bg-center h-40"
            :style="{backgroundImage: `url(${item.image})` }"
          ></div>
          <div class="p-4 bg-primary-light text-center text-2xl">{{item.name}}</div>
          <div class="text-center p-4 text-2xl">${{item.price}}</div>
          <div class="flex justify-around">
            <button class="bg-secondary hover:bg-primary p-4 text-white rounded">Sell</button>
            <input class="text-center" type="number" min="0" v-model="item.quantity" />
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
      quantity: 0
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
            i.quantity = 0
        })
    },
    sendPurchase: function(id) {
      const price = this.getItemAmount(id);
      const quantity = this.getItemQuantity(id);
      const total = price * quantity;
      eventBus.$emit("total-purchase", total);
      this.clearQuantity()
    }
  },
  watch: {
    getItemQuantity: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
