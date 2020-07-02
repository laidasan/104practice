;(() => {
    const $floatBtnResume = document.querySelector('.float-btn--med')
    const $floatBtnSkfh = document.querySelector('.float-btn--skfh')

    console.log($floatBtnResume)
    console.log($floatBtnSkfh)

    function goForm(type) {
        let targetForm = document.querySelector(`.${type}`)

        window.scrollTo({
            top: targetForm.offsetTop,
            behavior: 'smooth'
        })

        // console.log(targetForm.getBoundingClientRect().top)
        // console.log(targetForm.offsetParent)

        
    }

    $floatBtnResume.addEventListener('click',(e) => {
        let type = e.currentTarget.dataset['type']
        goForm(type)

    })
    $floatBtnSkfh.addEventListener('click',(e) => {
        let type = e.currentTarget.dataset['type']
        goForm(type)
    })

})()