<template src="./template.html" />
<style lang="css" src="./style.css">
/* scoped 會讓 css 只限制在此 component 裡面 */
/* 而達成此目的的法就是使用 [] 屬性選擇器去限制 */
/* [ data-v-0df0d564 ] */


</style>
<script>
export default {
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