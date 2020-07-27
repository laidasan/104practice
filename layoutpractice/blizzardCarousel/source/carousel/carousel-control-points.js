const carouselControlPoints = {
    props: {
        total: {
            type: Number,
            default: 0
        },
        active: {
            type: Number,
        }
    },
    template: `
    <ul class="carousel__control__points">
        <li 
        v-for="num in total" 
        :key="num + 'a'" 
        @click="$emit('click',num - 1)" 
        :class="{active: num - 1 === active}"
        @mouseenter="$emit('mouseenter')"
        @mouseleave="$emit('mouseleave')"
        ></li>
    </ul>`
}

export default carouselControlPoints