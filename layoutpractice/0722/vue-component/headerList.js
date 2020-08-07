const headerListItem = {
    props: {
        text: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: ''
        }
    },
    template:
    `
    <li class="header-sub__menu-list__item-f1" :class="{logo:imgSrc}">
        <a href="javascript:;" v-if="text">{{ text }}</a>
    </li>
    `
}

const headerList = {
    props: {
        headerList: {
            type: Array,
            default: null
        }
    },
    components: {
        headerListItem
    },
    methods: {
        imgSrc(index) { return headerList[index].imgSrc }
    },
    template: 
    `
    <ul class="header-sub__menu-list" v-if="headerList">
        <header-list-item
        v-for="item in headerList"
        :key="item.id"
        :text="item.text"
        :img-src="item.imgSrc"
        ></header-list-item>
    </ul>
    `
}