<template>
  <div id='detail'>
    <!-- 放导航 -->
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <scroll class="content" ref='scroll'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo'></detail-param-info>
    </scroll>

    <h2>{{iid}}</h2>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'

  import Scroll from 'components/common/scroll/Scroll'


  import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.发送网络请求,请求详情页数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages
        // 获取商品信息模块数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息对象
        this.shop = new Shop(data.shopInfo)
        // 保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 保存商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 该看199了
      })
    },
    activated() {
      // this.iid = this.$route.params.iid
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    methods: {
      imageLoad() {
        // console.log('-------------');
        this.$refs.scroll.refresh()
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>