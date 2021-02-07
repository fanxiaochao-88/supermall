<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   // return this.$store.state.cartList.length
      //   return this.$store.getters.cartLength
      // }
      // 把vuex的getters转化为组件内的computed
      // mapGetters是一个函数,返回一个数组
      // ...mapGetters([
      //   'cartLength'
      // ])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: deeppink;
    color: #fff;
    font-weight: 700;
  }
</style>