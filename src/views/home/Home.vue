<template>
  <div id='home'>
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">常晶晶Show</div>
    </nav-bar>

    <!-- 封装的滚动组件 -->
    <scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll' :pull-up-load='true'
      @pullingUp='loadMore'>
      <!-- 轮播图 -->
      <home-swiper :banners='banners'></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends='recommends'></recommend-view>
      <!-- 流行大图 -->
      <feature-view></feature-view>
      <!-- 选项卡 -->
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick='tabClick'></tab-control>
      <!-- 真实数据 -->
      <goods-list :goods='showGoods'></goods-list>
    </scroll>

    <!-- 回到顶部按钮 -->
    <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>




  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  // 这样引用,本组件对第三方框架依赖性过高
  // import BScroll from 'better-scroll'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        // 动态给GoodsList组件传递不同分类的数据
        allType: ['pop', 'new', 'sell'],
        allTypeIndex: 0,
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.allType[this.allTypeIndex]].list
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      // 请求轮播图,推荐数据
      this.getHomeMultidata()

      // 请求首页真实商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // this.goods[type].list = res.data.list
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },

      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // console.log(index);
        this.allTypeIndex = index
        this.currentType = this.allType[this.allTypeIndex]
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
      contentScroll(position) {
        if (Math.abs(position.y) > 1000) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }
      },
      loadMore() {
        // console.log('爸爸说:知道你到底了,这就开始加载更多');
        this.getHomeGoods(this.currentType)
        // console.log(this.goods[this.currentType].list.length);
      }
    },

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: deeppink;
    color: white;
    font-size: 20px;
    letter-spacing: 2px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px + 44px);
    height: 100%;
    height: calc(100% - 90px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>