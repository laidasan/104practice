<template>
  <div id="app">
    <div id="nav">

      <!-- <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link> -->
    </div>
    <!-- <router-view /> -->




  <!-- router 在這裡使用 -->
  <!-- router 按鈕 -->
  <router-link to="/">
  Home
  </router-link>
  |
  <router-link to="/about">
  <!-- to 也可以使用 設定好的 name -->
  About
  </router-link>


  <!-- router-view -->
  <!-- <transition name="opacity" mode="out-in"> -->
    <router-view v-for=" num in 2" :key="num"></router-view>
  <!-- </transition> -->




  <!-- <a href="javascript:;" @click="testHandler">test btn</a> -->
  </div>
  
</template>

<script>
// export default {
  // methods: {
    // testHandler() {
      // console.log
      // console.log(this.$route)

      // console.log(this.$router)
      // 有這兩個可以用 , 但這兩個是不一樣的東西

      // 抓資料 , ex: get 的 rul 資料
      // 處理網址 , 讓 SPA 就像網頁一樣 or like application
      // this.$route


      // 做得像網頁
      // this.$route.push()
      // this.$route.push(./about)

      // 做得像 app
      // this.$route.replace()
      // this.$route.replace(./about)


      // History.go() , 逼不得已才使用


      // 路由器
      // this.$router


      // 這兩個不是原本自帶ㄗㄜ
    // }
//   }
// }
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

