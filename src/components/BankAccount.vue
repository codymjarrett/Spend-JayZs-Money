<template>
  <div class="container bg-primary mb-8">
    <div
      class="text-center p-2 h-24 flex justify-center items-center text-white text-4xl"
    >${{formatNumber}} left</div>
  </div>
</template>

<script>
import { eventBus } from "../event-bus";

export default {
  name: "BankAccount",
  props: {
    msg: String
  },
  data: () => {
    return {
      balance: 1000000000
    };
  },
  methods: {
    // makePurchase: function() {
    //   EventBus.$on("item-purchased", data => {
    //     alert('data', data)
    //   });
    // }
  },
  computed: {
    formatNumber: function() {
      return this.balance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  created() {
      eventBus.$on('total-purchase', data => {
          this.balance = this.balance - data
      })
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
