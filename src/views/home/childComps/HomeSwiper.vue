<template>
  <div>
    <swiper>
      <swiper-item v-for='item in banners'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load='imageLoad'>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: '',
    data() {
      return {
        isEmitImageLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        if (!this.isEmitImageLoad) {
          this.$emit('swiperImageLoad')
          this.isEmitImageLoad = true
        }
      }
    },
    components: {
      Swiper,
      SwiperItem,
    }
  }
</script>

<style scoped>


</style>