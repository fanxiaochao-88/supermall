<template>
  <div class="goods">
    <goods-list-item v-for='item in goods' :goodsItem='item'></goods-list-item>
    <!-- {{goods}} -->
  </div>
</template>

<script>

  import GoodsListItem from './GoodsListItem'
  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {

      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>