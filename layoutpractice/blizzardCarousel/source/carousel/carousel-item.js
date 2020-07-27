const carouselItem = {
    props: {
        src: {
            type: String,
            required: true
        }
    },
    template: 
    `
    <div class="carousel__item"  :style="getSrc">
        <div class="carousel__item__bk" :style="getSrc"></div>
        <div class="carousel__item__content"></div>
    </div>
    `,
    computed: {
        getSrc() { return `background-image: url('${this.src}')` }
    },
}

export default carouselItem