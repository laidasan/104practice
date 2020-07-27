import carouselItem from './carousel-item'
import carouselControl from './carousel-control'



// `
// <carousel-control
//             :total="total"
//             :active="active"
//             @click="changeContent"
//             @mouseenter="mouseHover"
//             @mouseleave="mouseLeave"
//             @next="nextHandler"
//             @prev="prevHandler"
//             ></carousel-control>
//             `

const carousel = {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            active: 0,
            total: this.list.length,
            direct: 0,
            isHover: false
        }
    },
    components: {
        carouselItem,
        carouselControl
    },
    template: 
    `
    <div class="carousel">
        <div class="carousel-container">
            <transition :name="trans">
                <carousel-item :src="list[active].src" :key="list[active].id"></carousel-item>
            </transition>  
            <carousel-control
            :total="total"
            :active="active"
            @click="changeItem"
            @next="nextHandler"
            @prev="prevHandler"
            ></carousel-control>
        </div>
    </div>
    `,
    computed: {
        trans() { return this.direct ? 'move-left' : 'move-right' }
    },
    methods: {
        mouseHover() {this.isHover = true },
        mouseLeave() { this.isHover = false },
        changeItem(val) { this.active = Math.abs(val) % this.total },
        nextHandler() {
            this.direct = 1
            this.changeItem(this.active + 1)
        },
        prevHandler() {
            this.direct = 0
            this.changeItem(this.active - 1)
        },
        go() { this.isHover ? '' : this.nextHandler() }
    }
}

export default carousel
