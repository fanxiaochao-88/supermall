import { debounce } from './utils'
export const itemListeberMixin = {
  data() {
    return {
      imgListener: null,
    }
  },
  mounted() {
    // 1.监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.imgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.imgListener)
  },
}