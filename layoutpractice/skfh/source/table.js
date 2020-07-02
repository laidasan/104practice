;(() => {
    const $tableResume = document.querySelector('.table--resume')
    const $tdFirst = $tableResume.querySelectorAll('td:first-child')

    $tdFirst.forEach((td) => {
        if(!td.dataset['type']) {
            td.dataset['type'] = ' (徵才說明會)';
        }
    })
})()