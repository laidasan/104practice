const carouselControlArrow = {
    props: {
        direct: {
            type: String,
            required: true
        }
    },
    template:
        `
    <div class="carousel__control__arrow" 
    @click="$emit(getDirect)"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
    ></div>
    `,
    computed: {
        getDirect() { return this.direct }
    }
}

export default carouselControlArrow