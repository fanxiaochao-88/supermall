<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click='backClick'>
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for='(item,index) in titles' class="title-item" @click='titleClick(index)'
          :class='{active:currentIndex===index}'>{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        // this.$router.go(-1)
        this.$router.back()
      }
    },
    components: {
      NavBar

    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: red;
  }

  .back img {
    vertical-align: middle;
  }
</style>