import carouselControlPoints from './carousel-control-points'
import carouselControlArrow from './carousel-control-arrow'


 

const carouselControl = {
    props: {
        total: {
            type: Number,
            default: 0
        },
        active: {
            type: Number,
        },
    },
    components: {
        carouselControlPoints,
        carouselControlArrow
    },
    template: 
    `
    <div class="carousel__control">
        <carousel-control-points 
        :total="total" 
        :active="active" 
        @click="click" 
        @mouseenter="$emit('mouseHover')" 
        @mouseleave="$emit('mouseLeave')"
        ></carousel-control-points>
    
        <carousel-control-arrow class="next" 
        direct="next" 
        @next="$emit('next')" @mouseenter="$emit('mouseHover')" @mouseleave="$emit('mouseLeave')"
        ></carousel-control-arrow>
        <carousel-control-arrow class="prev" 
        direct="prev" 
        @prev="$emit('prev')" @mouseenter="$emit('mouseHover')" @mouseleave="$emit('mouseLeave')"
        ></carousel-control-arrow>
    </div>
    `,
    methods: {
        click(val) {this.$emit('click',val)}
    }
}


export default carouselControl