<template>
  <div id="app">
    <Header />
    <BankAccount />
    <Inventory />
    <Cart />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header";
import BankAccount from "./components/BankAccount";
import Inventory from "./components/Inventory";
import Cart from "./components/Cart";

export default {
  name: "app",
  components: {
    BankAccount,
    Header,
    Inventory,
    Cart
  },
  methods: {
    updateBalance(e) {
      alert('balance', e)
    }
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
