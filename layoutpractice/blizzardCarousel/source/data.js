let imgs = require('../img/*.*')
let bannerMap = {
    mobile: [
        {id: 0,src: imgs['hero1-xs'].jpg},
        {id: 1,src: imgs['hero2-xs'].jpg},
        {id: 2,src: imgs['hero3-xs'].jpg},
        {id: 3,src: imgs['hero4-xs'].jpg}
    ],
    desk: [
        {id: 4,src: imgs['hero1'].jpg},
        {id: 5,src: imgs['hero2'].jpg},
        {id: 6,src: imgs['hero3'].jpg},
        {id: 7,src: imgs['hero4'].jpg}
    ],
    logo: [
        {id:8,src: imgs['hero1-logo'].png},
        {id:9,src: imgs['hero2-logo'].png},
        {id:10,src: imgs['hero3-logo'].png},
        {id:11,src: imgs['hero4-logo'].png},
    ],
    text: [
        {id: 12,title:"全新資料片",btn:"立即購買"},
        {id: 13,title:"有玩 , 有看 , 有得拿",btn:"瞭解詳情"},
        {id: 14,title:"陪你上山下海的好夥伴!",special:"限時優惠",btn:"立即購買"},
        {id: 15,title:"第四季正式上線",btn:"瞭解詳情"},
    ],
    // btn: [
    //     {id: 16,text:"全新資料片"},
    //     {id: 17,text:"有玩 , 有看 , 有得拿"},
    //     {id: 18,text:"陪你上山下海的好夥伴"},
    //     {id: 19,text:"第四季正式上線"},
    // ]
  
}
function showImgs() { console.log( bannerMap )}


module.exports = {
    bannerMap,
    showImgs
}
