<template src="./template.html" />
<style lang="css" src="./style.css">
/* scoped 會讓 css 只限制在此 component 裡面 */
/* 而達成此目的的法就是使用 [] 屬性選擇器去限制 */
/* [ data-v-0df0d564 ] */


</style>
<script>
export default {
    // 雖然都是 lifr cycle , 但這裡需要手動呼叫下一步
    // 這個常常在檢查 , 是否有照流程來進頁面 , 比如說登入頁面 etc...
    // from 來自哪裡 , to 要進的頁面 , next() 進到下一步
    beforeRouterEnter(to,from,next) {
        console.log(from)

        // from.name !== 'Class'
        if(from.path !== '/class') { 
            window.aleart('errer') 

            return next("/class")
            // this.$route.push() or this.$route.replace
        }

    },

    
    // 由於網址只有切換參數時 , 並不會重新進出 路由 , 所以 component 不會重新載入
    // 所以有需要的時候就可以用 update 來在載入 component 打API 來 render 畫面
    beforeRouterUpdate() {
        console.log(to,from)

        next()
    },
    // beforeRouterLeave() {

    // }
    props: {
        msg: {
            type: String,
            // default: ''
            required: true
        }
    },
    data() {
        return {
            // msg: "Hello Vue"
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    },
    // life cycle
    // life cycle 是由內到外的順序 , 裡面的 componet 還沒有好的時候 , 會以內層優先跑完
    // 所以不去讀 quereSelector 的目的就是 要確保 componet 以生成
}
</script>