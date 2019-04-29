<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br>
      <button  :disabled="!product.inventory" @click="addProductToCart(product)">加入购物车</button>
      <button  :disabled="getCart(product.id).length === 0" @click="removeProductFromCart(product.id)">移除</button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.$store.dispatch("products/getAllProducts");
  },
  computed: {
    ...mapState({
      products: state => state.products.all,
    }),
    ...mapGetters({
      getCart: "cart/getCartQuantity"
      
    })
  },
  // computed: {
  //   products(){
  //     return this.$store.state.products.all
  //   }
  // },
  methods: {
   ...mapActions('cart', [
    'addProductToCart', 
    'removeProductFromCart' 
    ])
  }

  // methods: {
  //   addProductToCart(product){
  //     this.$store.dispatch('cart/addProductToCart', product)
  //   }
  // },
};
</script>