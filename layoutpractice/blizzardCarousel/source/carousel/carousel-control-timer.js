const carouselControlTimer = {
    props: {
        total: {
            type: Number,
            default: 0
        },
        active: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            width: 0
        }
    },
    template: 
    `
    <div class="carousel__control__timer">
        <ul class="carousel__control__timer-list" v-if="total">
            <li v-for="n in total" 
            :key="n + 'li'"
            :class="{active:active === n -1}"
            ref="timerItem"
            >
            <div class="bar"></div
            ></li>
        </ul>
    </div>
    `,
    methods: {
        setWidth(index) { 
            return `${index === this.active ? 'width:100%;' : ''}`
        }
    }
}

export default carouselControlTimer