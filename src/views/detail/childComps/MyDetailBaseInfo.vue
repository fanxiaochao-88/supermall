<template>
  <div v-if='Object.keys(goods).length!==1' class="base-info">
    <!-- 第一行标题 -->
    <div>{{goods.title}}</div>
    <!-- 第二行价格 -->
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if='goods.discount' class="discount">{{goods.discount}}</span>
    </div>
    <!-- 第三行,销量,收藏,等信息 -->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 第四行特性补充 -->
    <div class="info-service">
      <span v-for='index in goods.services.length-1' class="info-service-item">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyDetailBaseInfo',
    props: {
      goods: {
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
  .base-info {
    margin-top: 10px;
    padding: 0 8px;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: #f00;
  }

  .info-price .o-price {
    font-size: 13px;
    text-decoration: line-through;
    margin-left: 7px;
  }

  .info-price .discount {
    font-size: 14px;
    background-color: #f00;
    color: #fff;
    padding: 2px;
    border-radius: 5px;
    position: relative;
    top: -8px;
    margin-left: 10px;
  }

  .info-other {
    margin-top: 15px;
    color: #666;
    font-size: 13px;
    line-height: 30px;
    border-bottom: 1px solid rgba(100, 100, 100, .5);
    display: flex;
    justify-content: space-between;
    /* text-align: center; */
  }

  .info-other span {
    flex: 1;
  }

  .info-other span:nth-child(3) {
    text-align: right;
  }

  .info-other span:nth-child(2) {
    text-align: center;
  }

  .info-service {
    display: flex;
    font-size: 13px;
    /* height: 60px; */
    line-height: 60px;
    justify-content: space-between;
    padding: 0 0 20px;
    border-bottom: 3px solid #ccc;
  }

  .info-service-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .info-service-item {
    /* flex: 1; */
  }
</style>