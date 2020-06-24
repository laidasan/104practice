;(() => {
    const $topBtn = document.querySelector('.btn--top');
    
    function debounce(func,delays) {
        let timeout;
        let delay = delays || 100;
        
        return function() {
            let context = this;
            let args = arguments;
            clearTimeout(timeout);
            
            timeout = setTimeout(function(){
                func.apply(context,args);
            },delay) }
    }

    function show(e) {
        let windowBottom = window.scrollY + window.innerHeight
        if(windowBottom >= document.body.clientHeight) {
            $topBtn.style.setProperty('transform','translateY(0)')
            console.log('go')
        } else {
            $topBtn.style.removeProperty('transform')
            console.log('return')
        }
    }

    $topBtn.addEventListener('click',(e) => {
        window.scroll(0,0)
    })


    window.addEventListener('scroll',debounce(show))
})()