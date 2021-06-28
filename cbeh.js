function hide(elements) {
    (elements || []).map(e => e.setAttribute('style', 'display: none'))
}

let elements = $$('.dm-adjust').filter(e => !e.getAttribute('data-nick'))
    .concat($$('a').filter(e => e.href.includes('external')))
    .concat($$('.dm-adjust').filter(e => e.getAttribute('data-nick')).filter(e => e.innerText.includes('***') || e.innerText.includes('---')))

hide(elements)
clear()
