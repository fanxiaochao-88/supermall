<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: '',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 不是限制button的  而是限制span  div等等
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // 监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('孩子说:到底了!');
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
    components: {

    }
  }
</script>

<!-- scoped代表以下样式是当前组件的作用域内的样式,不会对外界起作用 -->
<style scoped>


</style>