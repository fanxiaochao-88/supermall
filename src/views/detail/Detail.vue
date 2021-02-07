<template>
  <div id='detail'>
    <!-- 放导航 -->
    <detail-nav-bar ref='navbar' class="detail-nav-bar" @titleClick='titleClick'></detail-nav-bar>
    <scroll :probeType='3' @scroll='contentScroll' class="content" ref='scroll'>
      <detail-swiper :topImages='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info ref='params' :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info ref='comment' :commentInfo='commentInfo'></detail-comment-info>
      <goods-list ref="recommend" :goods='recommends'></goods-list>
      <!-- <DetailCommentInfo :commentInfo='commentInfo'></DetailCommentInfo> -->
    </scroll>
    <DetailBottomBar @addToCart='addToCart'></DetailBottomBar>
    <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>

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
  import { itemListeberMixin } from 'common/mixin'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'
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
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false
      }
    },

    // 混入的属性 和  生命周期函数 同级
    mixins: [itemListeberMixin],

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

        /**
         *  图片还没有加载 
         */
        // this.$nextTick(() => {

        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);

        // })

      })

      // 请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        this.recommends = res.data.list
      })


    },
    mounted() {

    },
    updated() {

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
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    methods: {
      addToCart() {
        // console.log('父组件收到');
        // 购物车需要什么信息,就把详情页中什么信息添加到购物车中
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 获取完需要展示的数据,将商品添加到购物车里面
      },
      titleClick(index) {
        // console.log(index);
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      imageLoad() {
        // console.log('-------------');
        this.$refs.scroll.refresh()

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);


        this.currentIndex = this.themeTopYs.length - 1

      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {

        if (Math.abs(position.y) > 1000) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }

        const positionY = -position.y
        // for (let i = 0; i < this.themeTopYs.length; i++) {
        //   if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //     console.log(i);
        //   }
        // }
        for (let i = this.themeTopYs.length - 1; i >= 0; i--) {
          if (positionY >= this.themeTopYs[i]) {
            console.log(i);
            this.$refs.navbar.currentIndex = i
            break
          }
        }
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
    height: calc(100% - 44px - 49px);
  }
</style>