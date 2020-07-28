const carouselItem = {
    props: {
        srcLogo: {
            type: String,
            default: ''
        },
        srcMobile: {
            type: String,
            required: true
        },
        srcDesk: {
            type: String,
            required: true
        },
        baseColor: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        btntext: {
            type: String,
            default: ''
        },
        special: {
            type: String,
            default: ''
        },
        trans: {
            type: String,
            default: ''
        },
        active: {
            type: Number,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        direct: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    },
    template: 
    `
    <div class="carousel__item">
        <div tag="div" class="carousel__item__bk-container" :style="getBkColor" :class="slideAni">
            <div class="carousel__item__bk mobile" :style="getMobile" :key="getMobile"></div>
            <div class="carousel__item__bk desk" :style="getDesk" :key="getDesk"></div>
            <div class="carousel__item__gradient">
                <div :class="getGradientClass"></div>
            </div>
        </div>
        <div class="carousel__item__content">
            <div class="carousel__item__content-group">
                <div class="carousel__item__content__logo img-box" :key="getLogo" :class="slideAni">
                    <img :src="srcLogo" alt="HeroLogo">
                    <a href="javascript:;"></a>
                </div>
                <h1 class="carousel__item__content__title" :key="title" :class="slideAni"><a href="javascript:;">{{ title }}<br>{{special}}</a></h1>
                <a href="javascript:;" class="carousel__item__content__btn" :key="btntext" :class="slideAni">{{btntext}}</a>
            </div>
        </div>
    </div>
    `,
    computed: {
        getMobile() { return `background-image: url('${this.srcMobile}')` },
        getDesk() { return `background-image: url('${this.srcDesk}')` },
        getBkColor() { return `background-color: ${this.baseColor}` },
        getLogo() { return `background-image: url('${this.srcLogo}')`},
        slideAni() {
            let result = ''
            let prev = this.direct ? -1 : 1
            let prevActice = (this.active + prev + this.total) % this.total
            console.log(this.index)
            console.log(this.index === this.active)
            console.log(this.direct)
            this.index === this.active ? this.direct ? result = "next-in" : result = "prev-in" : ''
            this.index === prevActice ? result = 'prev-out' : ''
            return result
        },
        getGradientClass() { return `carousel__item__gradient-mobile carousel__item__gradient-mobile--hero${this.index + 1}` }
    },
}

export default carouselItem