import carousel from './carousel/carousel'

let timeout = null
let intervalTime = 3000
let data = {
    activeMenu: false,
    nowPath: 0,
    menuList: [
        { id: 0, text: 'Home' },
        { id: 1, text: 'About' },
        { id: 2, text: 'Concat' }
    ],
    bannerList: [
        { id: 0, src: 'https://picsum.photos/id/100/1440/505' },
        { id: 1, src: 'https://picsum.photos/id/1000/1440/505' },
        { id: 2, src: 'https://picsum.photos/id/1001/1440/505' }
    ],
}

new Vue({
    el: '#app',
    data,
    mounted() {
        // timeout = setInterval(() => {
        //     this.carouselGo()
        // },intervalTime)
    },
    beforeDestory() {
        // clearInterval(timeout)
    },
    components: {
        carousel
    },
    methods: {
        toggleMenu() { this.activeMenu = !this.activeMenu },
        goPage(index) { this.nowPath = index },
        carouselGo() { this.$children.forEach((com) => com.go()) }
    }
})