    
<template>
  <div id="app">
    <h1>购物车示例</h1>
    <p>账号: {{email}}</p>
    <hr>
    <h2>产品</h2>
    <ProductList/>
    <hr>
    <ShopCart/>
  </div>
</template>

<script> 
import { mapState } from 'vuex';
import ProductList from './components/productList.vue';
import ShopCart from './components/shopCart.vue';

export default {
  name: 'app',
  components: {
    ProductList,
    ShopCart
  },

  computed: mapState({
    email: state => state.userInfo
  })

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
