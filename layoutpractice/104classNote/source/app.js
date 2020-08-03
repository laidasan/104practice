const ClipboardJS = require('./clipboard.min')
const JsonDatas = require('../json/*.json')


let data = {
    isMenuActive: false
}


new Vue({
    el: '#app',
    data,
    methods: {
        toggleMenu() { this.isMenuActive = !this.isMenuActive },
        goTarget(e) {
            let target = this.$refs[e.target.moveTo]

            if(!target) { return }
            let headerHeight = this.$refs['header'].getBoundingClientRect().height
            let move = target.offsetTop - headerHeight
            window.scrollTo({
              top: move,
              behavior: "smooth"
            })
          },
    }
})


const $menuItems = document.querySelectorAll('.header__menu-list__item')
const $listJson = document.querySelector('.article__list--json')

let types = [
    {id:0,type:'Html',text:'Html.json',copy:true},
    {id:1,type:'Scss',text:'Scss.json',copy:true}
]

function addMenuItemTarget(items) {
    let charCode = 65
    items.forEach(item => {
        let a = item.querySelector('a')
        a.moveTo = String.fromCharCode(charCode)
        charCode += 1
    })
}

function createTextArea(val,id) {
    let textarea = document.createElement('textarea')
    textarea.value = val
    textarea.id = id
    textarea.style.width = 0
    textarea.style.height = 0
    textarea.style['font-size'] = 0
    textarea.style.margin = 0
    textarea.style.padding = 0
    textarea.style['border-color'] = 'transparent'


    return textarea
}


function createA(text,type,copy) {
    let a = document.createElement('a')
    a.href="javascript:;"
    a.textContent = text
    type ? a.type = type.toLowerCase() : ''
    copy ? a.setAttribute('data-clipboard-target',`#${a.type}`) : ''
    copy ? document.body.append(createTextArea(JSON.stringify(JsonDatas[a.type]),a.type)) : ''
    copy ? new ClipboardJS(a) : ''

    return a
}

function listItem(data) {

    let li = document.createElement('li')
    let a = createA(data.text,data.type,data.copy)
    li.append(a)

    return li
}


function createListItem($list,datas) {
    if(!$list || !(datas instanceof Array) ) { return }
    
    datas.forEach(data => { $list.append(listItem(data)) })
}




window.onload = function () {
    addMenuItemTarget($menuItems)
    createListItem($listJson,types)
}




