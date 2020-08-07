const  headerLogo = {
    props: {
        imgSrc: {
            type: String,
            default: ''
        }
    },
    computed: {
        backgroundImage() {return this.imgSrc ? `background-image: url(${this.imgSrc})` : ''}
    },
    template: 
    `
    <div class="header-sub__logo-box">
        <div class="header-sub__logo" :style="backgroundImage"><a href="javascript:;"></a></div>
    </div>
    `
}