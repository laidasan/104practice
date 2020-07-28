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
    ><span></span></div>
    `,
    computed: {
        getDirect() { return this.direct }
    }
}

// @mouseleave="$emit('mouseleave')"

export default carouselControlArrow