/**
* Parallax.js
* @author Matthew Wagerfield - @wagerfield, René Roth - mail@reneroth.org
* @description Creates a parallax effect between an array of layers,
*              driving the motion from the gyroscope output of a smartdevice.
*              If no gyroscope is available, the cursor position is used.
*/

const rqAnFr = require('raf')
const objectAssign = require('object-assign')

// 主要就兩種物件
// helpers --- 工具包
// parallax --- parallax 主體


const helpers = {
    propertyCache: {},
    vendors: [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']],



    // 控制 value 在 min 與 max 之間
    // 若超過 ｍax 則回傳 max
    // 若過小 min  則回傳 min 
    // 在區間內則回傳 value
    clamp(value, min, max) {
        // 因為傳進來的 min 與 max 沒辦法確定順序 , 所以當
        // max > min 的時候為正常情況 , 
        // max < min 的時候代表這時傳進來的 min 才是 最大 , max 才是最小
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value)
    },



    // data 與 deserialize 為一組
    // data 內引用 deserialize,
    // get Attribue data-name 後 , 在 deserialize 內做處理

    // data
    // data 從 element 取得 tag上的屬性 data-name
    // 可以讓使用者直接在 tag 上下屬性達成設定 parallax

    // deserilize 做的處理
    // true , false , null => return true / false / null
    // ! isNaN(parseFloat(value)) && isFinite(value) => return parseFloat
    // 檢查轉換成 Number 是否為 NaN , 與檢查傳進來的 value 是不是『 有限數 』
    // 以上都不是的話直接回傳 value(串進來的值)
    data(element, name) {
        return helpers.deserialize(element.getAttribute('data-' + name))
    },

    deserialize(value) {
        if (value === 'true') {
            return true
        } else if (value === 'false') {
            return false
        } else if (value === 'null') {
            return null
        } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value)
        } else {
            return value
        }
    },

    // 轉換駝峰命名
    camelCase(value) {
        return value.replace(/-+(.)?/g, (match, character) => {
            return character ? character.toUpperCase() : ''
        })
    },

    // accelerate => 加速的意思
    // 引用了 css 這個 function css(element , 屬性名稱 , 值)
    // 這個 function 沒什麼 , 字面上意思一樣 『 加速 』 , 把處理包在一起而已
    accelerate(element) {
        helpers.css(element, 'transform', 'translate3d(0,0,0) rotate(0.0001deg)')
        helpers.css(element, 'transform-style', 'preserve-3d')
        helpers.css(element, 'backface-visibility', 'hidden')
    },

    // 為傳入的 element 設定 property 值 為 value
    // 很像是 element.setProperty(property,value)
    // 不過這裡有做支援性上的楚利
    css(element, property, value) {
        // 從 propertyCache 取值 , 取的到代表有檢查過 , 不用 run 檢查流程
        let jsProperty = helpers.propertyCache[property]
        if (!jsProperty) {

            // 檢查流程
            // 檢查對於 property 的支援度
            for (let i = 0, l = helpers.vendors.length; i < l; i++) {

                // null 就沒有前綴
                if (helpers.vendors[i] !== null) {
                    jsProperty = helpers.camelCase(helpers.vendors[i][1] + '-' + property)
                } else {
                    jsProperty = property
                }

                // 檢查支援度 , 一檢查到能夠支援 , 就將該 property 加入到 propertyCache
                // 這樣就不用重新 run 檢查流程
                if (element.style[jsProperty] !== undefined) {
                    helpers.propertyCache[property] = jsProperty
                    break
                }
            }
        }
        // 設置屬性
        // 可以想像成是 element.setProperty(property,value)
        element.style[jsProperty] = value
    },

    // value 傳進 2D or 3D
    // 並檢查在 style 屬性（<div style=".."></div) 是否支援 transform or trandform 3d （依照 value 帶進的值）（包含加上前綴）
    // return true / false
    transformSupport(value) {
        let element = document.createElement('div'),
            propertySupport = false,
            propertyValue = null,
            featureSupport = false,
            cssProperty = null,
            jsProperty = null

        // 檢查 trnasfrom 在 style 支援度
        // vender 為一堆前綴字符
        for (let i = 0, l = helpers.vendors.length; i < l; i++) {
            // null 代表無前綴
            if (helpers.vendors[i] !== null) {
                cssProperty = helpers.vendors[i][0] + 'transform'
                jsProperty = helpers.vendors[i][1] + 'Transform'
            } else {
                cssProperty = 'transform'
                jsProperty = 'transform'
            }
            if (element.style[jsProperty] !== undefined) {
                propertySupport = true
                // 找到支援的就直接跳出迴圈
                break
            }
        }


        switch (value) {
            case '2D':
                featureSupport = propertySupport
                break
            case '3D':
                if (propertySupport) {

                    // 是否有 body , 沒有則將自己建立的 body , 並加入 document
                    let body = document.body || document.createElement('body'),
                        documentElement = document.documentElement,
                        documentOverflow = documentElement.style.overflow,
                        isCreatedBody = false

                    if (!document.body) {
                        isCreatedBody = true
                        documentElement.style.overflow = 'hidden'
                        documentElement.appendChild(body)
                        body.style.overflow = 'hidden'
                        body.style.background = ''
                    }

                    body.appendChild(element)
                    element.style[jsProperty] = 'translate3d(1px,1px,1px)'


                    // 檢查是否支援 3d
                    // window.getComputedStyle 可以取得該元素正在套用的 class 之 css 樣式 (回傳 CSSStyleDeclaration)
                    // getPropertyValue 則可以從 CSSStyleDeclaration 取得某項 css 的值
                    propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty)

                    // featureSupport 檢查 css 樣式中是否有設定了 transform , 有的話則 return true , else return false
                    featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== 'none'


                    // 移除剛剛建立的 body , element , 與剛剛在 documentElement (HTML) 加上的 overflow
                    documentElement.style.overflow = documentOverflow
                    body.removeChild(element)

                    // 如果是程式自己建立了 body , 則將該 body 從 document 中移除
                    if (isCreatedBody) {
                        body.removeAttribute('style')
                        body.parentNode.removeChild(body)
                    }
                }
        }
        return featureSupport
    }
} // helpers 結束


const MAGIC_NUMBER = 30,

    // 預設設定 defalut config
    DEFAULTS = {
        relativeInput: false,
        clipRelativeInput: false,
        inputElement: null,
        hoverOnly: false,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10.0,
        scalarY: 10.0,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
        pointerEvents: false,
        precision: 1,
        onReady: null,
        selector: null
    }


// depthX / depthY --- 子項 move 相關參數
// originX / originY --- 計算 window / element 中心點（Ｘ,Y)相關參數

// 三個 window 事件
// deviceorientation
// devicemotion
// mousemove
class Parallax {
    constructor(element, options) {

        this.element = element

        // 取得傳進的 element 上所有的 data-xxx 的值
        const data = {
            calibrateX: helpers.data(this.element, 'calibrate-x'),
            calibrateY: helpers.data(this.element, 'calibrate-y'),
            invertX: helpers.data(this.element, 'invert-x'),
            invertY: helpers.data(this.element, 'invert-y'),
            limitX: helpers.data(this.element, 'limit-x'),
            limitY: helpers.data(this.element, 'limit-y'),
            scalarX: helpers.data(this.element, 'scalar-x'),
            scalarY: helpers.data(this.element, 'scalar-y'),
            frictionX: helpers.data(this.element, 'friction-x'),
            frictionY: helpers.data(this.element, 'friction-y'),
            originX: helpers.data(this.element, 'origin-x'),
            originY: helpers.data(this.element, 'origin-y'),
            pointerEvents: helpers.data(this.element, 'pointer-events'),
            precision: helpers.data(this.element, 'precision'),
            relativeInput: helpers.data(this.element, 'relative-input'),
            clipRelativeInput: helpers.data(this.element, 'clip-relative-input'),
            hoverOnly: helpers.data(this.element, 'hover-only'),
            inputElement: document.querySelector(helpers.data(this.element, 'input-element')),
            selector: helpers.data(this.element, 'selector')
        }

        // 處理 data , 將是 null 值得屬性從 data 中刪掉
        for (let key in data) {
            if (data[key] === null) {
                delete data[key]
            }
        }

        // Object.assign(this,DEFAULTS,data,options)
        // 將 DEFAULTS , data ,options 設定灌到 this (parallax 建構式出來的物件)
        // Object.assign 會將可列舉的 「 source object」們的屬性 overwrite 到 「 target 」 物件上面
        // 同時也會回傳改變後的 target 的物件參考（ 回傳之物件 === target => true )
        objectAssign(this, DEFAULTS, data, options)

        // 設定 inputElement 
        // 如果 沒有 inputElement 該特性的話 , 設定 inputElement 為建構式傳進來的 element 
        if (!this.inputElement) {
            this.inputElement = this.element
        }

        // calibration 中文意思為 [校準 , 刻度]
        this.calibrationTimer = null
        this.calibrationFlag = true
        this.enabled = false

        // depth 中文意思為深度
        this.depthsX = []
        this.depthsY = []
        this.raf = null

        this.bounds = null
        this.elementPositionX = 0
        this.elementPositionY = 0
        this.elementWidth = 0
        this.elementHeight = 0

        this.elementCenterX = 0
        this.elementCenterY = 0

        this.elementRangeX = 0
        this.elementRangeY = 0

        this.calibrationX = 0
        this.calibrationY = 0

        this.inputX = 0
        this.inputY = 0

        this.motionX = 0
        this.motionY = 0

        this.velocityX = 0
        this.velocityY = 0

        // 將事件導入建構出的 parallax 物件
        // Orientation 中文意思為 “方向”
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this)
        this.onDeviceMotion = this.onDeviceMotion.bind(this)
        this.onOrientationTimer = this.onOrientationTimer.bind(this)
        this.onMotionTimer = this.onMotionTimer.bind(this)
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this)
        this.onAnimationFrame = this.onAnimationFrame.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)

        this.windowWidth = null
        this.windowHeight = null
        this.windowCenterX = null
        this.windowCenterY = null
        this.windowRadiusX = null
        this.windowRadiusY = null


        // 以下可以先不看
        // 支援度低的事件 DeviceMontionEvent and DeviceOrientationEvent
        this.portrait = false
        this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i)
        this.motionSupport = !!window.DeviceMotionEvent && !this.desktop
        this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop
        this.orientationStatus = 0
        this.motionStatus = 0

        // 初始化設置
        this.initialise()
    }

    initialise() {
        if (this.transform2DSupport === undefined) {
            // 檢查 transform / transfrom3d 支援性
            this.transform2DSupport = helpers.transformSupport('2D')
            this.transform3DSupport = helpers.transformSupport('3D')
        }

        // Configure Context Styles
        // 預設為只用 transform3d （可支援的情況下）
        // 這裡就是傳進的 element 上面有 style 屬性的地方 , 在這裡設置的
        if (this.transform3DSupport) {
            helpers.accelerate(this.element)
        }

        // 如果樣式上沒有設置 position （預設為 static)
        // 則 setProperty('position,'relative)
        let style = window.getComputedStyle(this.element)
        if (style.getPropertyValue('position') === 'static') {
            this.element.style.position = 'relative'
        }

        // Pointer events
        // 是否需要加上 pointer-event
        if (!this.pointerEvents) {
            this.element.style.pointerEvents = 'none'
        }

        // Setup

        // 處理所有子項的 style 配置
        this.updateLayers()

        // 取得視窗大小
        this.updateDimensions()

        // 啟動 parallax
        this.enable()


        this.queueCalibration(this.calibrationDelay)
    }

    // 執行使用者有要啟動 parallax 前的 funciton
    doReadyCallback() {
        if (this.onReady) {
            this.onReady()
        }
    }

    // 處理所有子項的 style 配置
    updateLayers() {

        // 如果設置屬性 data-selector , 就照者條件 querySelectorAll
        if (this.selector) {
            this.layers = this.element.querySelectorAll(this.selector)
        } else {
            // 否則就是傳進來的 element 的子項
            // element.children 是動態的 , 注意一下
            this.layers = this.element.children
        }

        // 如果都沒有子項的話則 console.warn(.....)
        if (!this.layers.length) {
            console.warn('ParallaxJS: Your scene does not have any layers.')
        }


        this.depthsX = []
        this.depthsY = []

        for (let index = 0; index < this.layers.length; index++) {
            let layer = this.layers[index]

            if (this.transform3DSupport) {
                helpers.accelerate(layer)
            }

            // 設定子項 style
            layer.style.position = index ? 'absolute' : 'relative'
            layer.style.display = 'block'
            layer.style.left = 0
            layer.style.top = 0


            // 取得所有子項的 depthX (data-depth-x) 與 depthY (data-depth-y)
            let depth = helpers.data(layer, 'depth') || 0
            this.depthsX.push(helpers.data(layer, 'depth-x') || depth)
            this.depthsY.push(helpers.data(layer, 'depth-y') || depth)
        }
    }

    updateDimensions() {
        // 取得視窗寬高
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        // 計算視窗中心點位置 , originＸ / originY 使用者可以設定
        this.windowCenterX = this.windowWidth * this.originX
        this.windowCenterY = this.windowHeight * this.originY


        this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX)
        this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY)
    }

    updateBounds() {
        // 取得 inputElement(使用建構式的話是傳入的 element) 邊界
        this.bounds = this.inputElement.getBoundingClientRect()

        this.elementPositionX = this.bounds.left
        this.elementPositionY = this.bounds.top

        this.elementWidth = this.bounds.width
        this.elementHeight = this.bounds.height

        // 設置中心點 （x , y ） , 預設 originX origin Y 為 0.5 , 所以在正中間
        this.elementCenterX = this.elementWidth * this.originX
        this.elementCenterY = this.elementHeight * this.originY

        this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX)
        this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY)
    }

    queueCalibration(delay) {
        clearTimeout(this.calibrationTimer)
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay)
    }

    enable() {
        // mehotd : 啟動 parallax , 建構式創建時預設為啟動 , 但可以用 disable()關閉

        // 原本就是啟動狀態就直接 return
        if (this.enabled) {
            return
        }


        this.enabled = true

        // window.DeviceMotionEvent 與 window.OrientationEvent 支援度很低
        // 目前只看 mousemove 事件就好 2020 07 25
        if (this.orientationSupport) {
            this.portrait = false
            window.addEventListener('deviceorientation', this.onDeviceOrientation)
            this.detectionTimer = setTimeout(this.onOrientationTimer, this.supportDelay)
        } else if (this.motionSupport) {
            this.portrait = false
            window.addEventListener('devicemotion', this.onDeviceMotion)
            this.detectionTimer = setTimeout(this.onMotionTimer, this.supportDelay)
        } else {
            this.calibrationX = 0
            this.calibrationY = 0
            this.portrait = false
            window.addEventListener('mousemove', this.onMouseMove)
            this.doReadyCallback()
        }

        window.addEventListener('resize', this.onWindowResize)
        this.raf = rqAnFr(this.onAnimationFrame)
    }

    disable() {

        // enable 的相反
        if (!this.enabled) {
            return
        }
        this.enabled = false


        if (this.orientationSupport) {
            window.removeEventListener('deviceorientation', this.onDeviceOrientation)
        } else if (this.motionSupport) {
            window.removeEventListener('devicemotion', this.onDeviceMotion)
        } else {
            window.removeEventListener('mousemove', this.onMouseMove)
        }

        window.removeEventListener('resize', this.onWindowResize)
        rqAnFr.cancel(this.raf)
    }

    // methods
    calibrate(x, y) {
        this.calibrateX = x === undefined ? this.calibrateX : x
        this.calibrateY = y === undefined ? this.calibrateY : y
    }

    invert(x, y) {
        this.invertX = x === undefined ? this.invertX : x
        this.invertY = y === undefined ? this.invertY : y
    }

    friction(x, y) {
        this.frictionX = x === undefined ? this.frictionX : x
        this.frictionY = y === undefined ? this.frictionY : y
    }

    scalar(x, y) {
        this.scalarX = x === undefined ? this.scalarX : x
        this.scalarY = y === undefined ? this.scalarY : y
    }

    limit(x, y) {
        this.limitX = x === undefined ? this.limitX : x
        this.limitY = y === undefined ? this.limitY : y
    }

    origin(x, y) {
        this.originX = x === undefined ? this.originX : x
        this.originY = y === undefined ? this.originY : y
    }

    setInputElement(element) {
        this.inputElement = element
        this.updateDimensions()
    }

    // precision 中文意思為 「 精確 」
    setPosition(element, x, y) {
        // x y 轉換成 定點小數表示法 ,
        // precision 預設為 1 , 所以只取一位小數
        x = x.toFixed(this.precision) + 'px'
        y = y.toFixed(this.precision) + 'px'

        if (this.transform3DSupport) {
            helpers.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)')
        } else if (this.transform2DSupport) {
            helpers.css(element, 'transform', 'translate(' + x + ',' + y + ')')
        } else {
            element.style.left = x
            element.style.top = y
        }
    }


    // 這兩個 Timer callback function 可以先不看
    // onOrientationTimer and onMotionTimer
    onOrientationTimer() {
        if (this.orientationSupport && this.orientationStatus === 0) {
            this.disable()
            this.orientationSupport = false
            this.enable()
        } else {
            this.doReadyCallback()
        }
    }

    onMotionTimer() {
        if (this.motionSupport && this.motionStatus === 0) {
            this.disable()
            this.motionSupport = false
            this.enable()
        } else {
            this.doReadyCallback()
        }
    }



    onCalibrationTimer() {
        this.calibrationFlag = true
    }

    // window resize event callback function 重新抓取視窗大小
    onWindowResize() {
        this.updateDimensions()
    }

    // 主要動畫部分
    onAnimationFrame() {
        // 每次 onAnimationFrame 重新取得this.element.getBoundingClientRect() 
        // , 也只有執行 onAniamtionFrame 的時候會取得
        this.updateBounds()

        // calibrationX or Y 預設為 0
        // inputX or Y 為 mousemove 事件時會去變動
        let calibratedInputX = this.inputX - this.calibrationX,
            calibratedInputY = this.inputY - this.calibrationY

        // calibrationThreshold 預設為 100 
        if ((Math.abs(calibratedInputX) > this.calibrationThreshold) || (Math.abs(calibratedInputY) > this.calibrationThreshold)) {
            this.queueCalibration(0)
        }

        // portrait 可以不看 , device...and ori...才需要看
        if (this.portrait) {
            this.motionX = this.calibrateX ? calibratedInputY : this.inputY
            this.motionY = this.calibrateY ? calibratedInputX : this.inputX
        } else {
            // calibrateX or Y 預設為 0 所以這時候會 motionX or Y => thie.inputX or Y
            // 但有設置 calibrateX or Y 後 , 則 motionX or Y => calibratedInputX 
            // 這裡可以知道 calibrateX or Y 是用來調整 inputX or inputY 用的
            // 所以叫做精確X( 調整inuptX 更為精確 )
            this.motionX = this.calibrateX ? calibratedInputX : this.inputX
            this.motionY = this.calibrateY ? calibratedInputY : this.inputY
        }

        // scalarX or Y 預設為 10 , 10 / 100 => 10%
        // 調整 motionX or Y 幅度用的 
        // motion = motion * width or height * 10%
        this.motionX *= this.elementWidth * (this.scalarX / 100)
        this.motionY *= this.elementHeight * (this.scalarY / 100)

        // parseFloat(false) => NaN
        // limit X or Y 預設為 false
        if (!isNaN(parseFloat(this.limitX))) {
            this.motionX = helpers.clamp(this.motionX, -this.limitX, this.limitX)
        }
        if (!isNaN(parseFloat(this.limitY))) {
            this.motionY = helpers.clamp(this.motionY, -this.limitY, this.limitY)
        }

        // velocity 中文意思為「 速度 , 速率 」 , 預設為 0 (沒有任何加速)
        // friction 為摩擦係數
        this.velocityX += (this.motionX - this.velocityX) * this.frictionX
        this.velocityY += (this.motionY - this.velocityY) * this.frictionY
        for (let index = 0; index < this.layers.length; index++) {
            let layer = this.layers[index],


                depthX = this.depthsX[index],
                depthY = this.depthsY[index],
                
                // Offset 為真正的位移量
                // invert 為是否倒轉方向 , 預設為 true
                xOffset = this.velocityX * (depthX * (this.invertX ? -1 : 1)),
                yOffset = this.velocityY * (depthY * (this.invertY ? -1 : 1))
            this.setPosition(layer, xOffset, yOffset)
        }

        this.raf = rqAnFr(this.onAnimationFrame)
    }

    rotate(beta, gamma) {
        // Extract Rotation
        let x = (beta || 0) / MAGIC_NUMBER, //  -90 :: 90
            y = (gamma || 0) / MAGIC_NUMBER // -180 :: 180

        // Detect Orientation Change
        let portrait = this.windowHeight > this.windowWidth
        if (this.portrait !== portrait) {
            this.portrait = portrait
            this.calibrationFlag = true
        }

        if (this.calibrationFlag) {
            this.calibrationFlag = false
            this.calibrationX = x
            this.calibrationY = y
        }

        this.inputX = x
        this.inputY = y
    }

    onDeviceOrientation(event) {
        let beta = event.beta
        let gamma = event.gamma
        if (beta !== null && gamma !== null) {
            this.orientationStatus = 1
            this.rotate(beta, gamma)
        }
    }

    onDeviceMotion(event) {
        let beta = event.rotationRate.beta
        let gamma = event.rotationRate.gamma
        if (beta !== null && gamma !== null) {
            this.motionStatus = 1
            this.rotate(beta, gamma)
        }
    }


    onMouseMove(event) {
        let clientX = event.clientX,
            clientY = event.clientY

        // reset input to center if hoverOnly is set and we're not hovering the element
        if (this.hoverOnly &&
            ((clientX < this.elementPositionX || clientX > this.elementPositionX + this.elementWidth) ||
                (clientY < this.elementPositionY || clientY > this.elementPositionY + this.elementHeight))) {
            this.inputX = 0
            this.inputY = 0
            return
        }

        if (this.relativeInput) {
            // Clip mouse coordinates inside element bounds.
            if (this.clipRelativeInput) {
                clientX = Math.max(clientX, this.elementPositionX)
                clientX = Math.min(clientX, this.elementPositionX + this.elementWidth)
                clientY = Math.max(clientY, this.elementPositionY)
                clientY = Math.min(clientY, this.elementPositionY + this.elementHeight)
            }
            // Calculate input relative to the element.
            if (this.elementRangeX && this.elementRangeY) {
                this.inputX = (clientX - this.elementPositionX - this.elementCenterX) / this.elementRangeX
                this.inputY = (clientY - this.elementPositionY - this.elementCenterY) / this.elementRangeY
            }
        } else {
            // Calculate input relative to the window.
            if (this.windowRadiusX && this.windowRadiusY) {
                this.inputX = (clientX - this.windowCenterX) / this.windowRadiusX
                this.inputY = (clientY - this.windowCenterY) / this.windowRadiusY
            }
        }
        // input x or y = 滑鼠座標與中心點 x or y 的距離 / this.elementRange or this.window.Radius
        // elementRange 與 window.Radius 是一樣的東西, 只不過一個是相對於 element , 一個相對於視窗
    }

    // 關閉 parallax , 與 disable 不同 , disable 類似「 暫停 」
    // destroy 直接將 parallax 註銷掉 （ 連 element 都 delete 了）
    destroy() {
        this.disable()

        clearTimeout(this.calibrationTimer)
        clearTimeout(this.detectionTimer)

        this.element.removeAttribute('style')
        for (let index = 0; index < this.layers.length; index++) {
            this.layers[index].removeAttribute('style')
        }

        delete this.element
        delete this.layers
    }

    version() {
        return '3.1.0'
    }

}

module.exports = Parallax