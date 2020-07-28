import carousel from './carousel/carousel'
let bannerData = require('./data')

let timeout = null
let intervalTime = 3000
let data = {
    bannerMap : bannerData.bannerMap,
    baseBkColors : {
        hero1: '#0b0c22',
        hero2: '#c2bbb1',
        hero3: '#080c0a',
        hero4: '#515f50'
    },
}

new Vue({
    el: '#app',
    data,
    // mounted() {
    //     timeout = setInterval(() => {
    //         this.carouselGo()
    //     },intervalTime)
    // },
    // beforeDestory() {
    //     clearInterval(timeout)
    // },
    components: {
        carousel
    },
    methods: {
        toggleMenu() { this.activeMenu = !this.activeMenu },
        goPage(index) { this.nowPath = index },
        carouselGo() { this.$children.forEach((com) => com.go()) }
    }
})