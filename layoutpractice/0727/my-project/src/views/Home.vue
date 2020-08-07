<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="$store.getters.fullName"/>
    <a href="javascript:;" @click="clickHandler">click</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState , mapMutations, mapActions } from "vuex"

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState({
      firstName(state) {
        return state.firstName
      },
      lastName: state => state.lastName
    }) 
  },
  methods: {
    clickHandler() {
      // samura

      // mutation
      // let m = this.$store.commit('CHANGE_NAME','samura render')
      // console.log(m)

      // action , action 回傳的是 promise
      // let a = this.$store.dispatch('CHANGE_NAME','samura render')     //可以在後面可以加上 .then()  or 在前面加上 await
      // console.log(a)


      this.change("samura render")
    },
    ...mapMutations({
      // change: "CHANGE_NAME"
    }),
    ...mapActions({
      change: "CHANGE_NAME"
    })
  }
}
</script>
