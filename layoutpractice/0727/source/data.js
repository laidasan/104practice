let list = [
    {id: '0',text:'test'},
    {id: '0',text:'world'}
]
function myFn() { console.log(list) }

let obj = {
    list : list,
    myFn: myFn
}
// 喜好使用排名
// export default { list , myFn }
// export default {list:list,myFn:myFn}
// export default obj
// export { list }
// export { myFn }
// export { list , myFn }
// export { list as default , myFn as name }
// export default class xxx {}

// export default obj

// let default = {

// }
// export {default}
// import {default} from ...
export default list
