<template>
  <div class="goods-item">
    <div class="img-div">
      <img :src="goodsItem.show.img" alt="">
    </div>
    <div>
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">
        {{goodsItem.cfav}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {

      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    /* flex: 35%; */
    padding: 5px 0;
    text-align: center;
  }

  .img-div {
    border-radius: 10px;
    overflow: hidden;
  }

  .goods-item img {
    width: 100%;
  }

  .goods-item p {
    margin-top: 5px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-item .price {
    color: var(--color-tint);
    font-size: 14px;
    margin-right: 15px;
  }

  .goods-item .collect {
    font-size: 14px;
    position: relative;
  }

  .goods-item .collect::before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;

    top: 0px;
    left: -10px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    /* background-color: red; */
  }
</style>