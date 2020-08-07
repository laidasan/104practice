<template>
  <label>
    <input 
      v-bind="$attrs"
    ></label>

  <!-- type="text" -->
  <!-- 同一層 寫到重複屬性 ex type and :type -->
  <!-- 不會覆蓋 , 會出錯 -->

<!-- props v.s attritube -->
<!-- 有事先宣告的就是 props -->
<!-- 反之則是 attritube  $attrs-->
</template>
<style lang="scss">



</style>
<script>
export default {
    inheritAttrs: false,
    data() {
        return {
            obj: {
                type: 'checkbox',
                checked: 'checked'
            }
        }
    }
    // inherit
    // props: {
    //     type: {
    //         type: {
    //             type: String,
    //             default: 'text'
    //         }
    //     }
    // }
}
</script>