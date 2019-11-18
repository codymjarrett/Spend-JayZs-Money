<template>
  <div class="container bg-primary mb-8">
    <div
      class="text-center p-2 h-24 flex justify-center items-center text-white text-4xl"
    >${{formatNumber}} left</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import { eventBus } from "../event-bus";

export default {
  name: "BankAccount",
  props: {
    msg: String
  },
  // data: () => {
  //   return {
  //     balance: 1000000000
  //   };
  // },
  methods: {
    // makePurchase: function() {
    //   EventBus.$on("item-purchased", data => {
    //     alert('data', data)
    //   });
    // }

  },
  computed: {
    formatNumber: function() {
      return this.allBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    ...mapGetters(['allBalance'])
  },
  created() {
   
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
