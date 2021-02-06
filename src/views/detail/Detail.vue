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
      <detail-comment-info :commentInfo='commentInfo'></detail-comment-info>
      <goods-list :goods='recommends'></goods-list>
      <!-- <DetailCommentInfo :commentInfo='commentInfo'></DetailCommentInfo> -->
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
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        imgListener: null
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.发送网络请求,请求详情页数据
      getDetail(this.iid).then(res => {
        // console.log(res);
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
        // 取出商品的品论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // 取出推荐商品的信息
      })

      // 请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {
      // 1.监听图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.imgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.imgListener)
    },
    // deactivated() {
    //   console.log('detail lose active');
    //   // home组件停止监听全局事件
    //   this.$bus.$off('itemImageLoad', this.imgListener)
    // },
    destroyed() {
      // home组件停止监听全局事件
      this.$bus.$off('itemImageLoad', this.imgListener)
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
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
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