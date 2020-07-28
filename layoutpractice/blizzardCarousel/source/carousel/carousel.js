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

let intervalTime = 6000;
const carousel = {
    props: {
        map: {
            type: Object,
            default: null
        },
        baseBkColors: {
            type: Object,
            default: []
        },
    },
    mounted() {
        console.log(getLogo(1))
    },
    data() {
        return {
            active: -1,
            total: this.map ? this.map['desk'].length : 1,
            direct: 0,
            isHover: false,
            timeout: null,
            transType: 'slide'
        }
    },
    components: {
        carouselItem,
        carouselControl
    },
    mounted() {
        this.active = 0
        this.setTimer()
    },
    beforeDestory() {
        this.stopTimer()
    },
    template: 
    `
    <div class="carousel" @mouseenter="mouseHover" @mouseleave="mouseLeave">
        <div class="carousel-container">

            
            <transition-group tag="div" class="carousel-pane" name="opacity">
                <carousel-item 
                v-for="n in total" 
                :key="getDeskList(n - 1).id"
                :srcMobile="getMobileList(n - 1).src"
                :srcDesk="getDeskList(n - 1).src"
                :srcLogo="getLogo(n - 1).src"
                :title="getTitle(n - 1)"
                :btntext="getBtnText(n - 1)"
                :special="getSpecial(n - 1)"
                v-show="active === n - 1"
                :baseColor="getBaseBkColor(n)"
                :trans="trans"
                :index="n - 1"
                :active="active"
                :direct="direct"
                :total="total"
                ></carousel-item>
            </transition-group>
            

            <carousel-control
            :total="total"
            :active="active"
            @click="changeItem"
            @next="nextHandler"
            @prev="prevHandler"
            @moushover="mouseHover"
            ></carousel-control> 
        </div>
    </div>
    `,
    computed: {
        trans() {
            let type = this.transType || 'move'
            return this.direct ? `${type}-left` : `${type}-right`
            //  return this.direct ? 'move-left' : 'move-right' 
            }
    },
    methods: {
        getMobileList(index) { return this.map['mobile'][index] },
        getDeskList(index) { return this.map['desk'][index] },
        getBaseBkColor(index) { return this.baseBkColors[`hero${index}`]},
        getLogo(index) { return this.map['logo'][index] },
        getTitle(index) { return this.map['text'][index].title },
        getBtnText(index) { return this.map['text'][index].btn },
        getSpecial(index) { return this.map['text'][index].special ? this.map['text'][index].special : '' },
        setTimer() {
            clearInterval(this.timeout)
            this.timeout = setInterval(() => {
                this.go()
            },intervalTime)
        },
        stopTimer() { clearInterval(this.timeout) },
        mouseHover() {this.isHover = true },
        mouseLeave() { this.isHover = false },
        changeItem(val) {
            this.active = (val + this.total) % this.total
            
        },
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



