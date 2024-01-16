import './index.scss'

const footer_mobile = document.querySelector('.footer_mobile')

footer_mobile.addEventListener('click', (e) => {
    const target = e.target
    if (target.className === 'footer_nav_link') {
        target.closest('.footer_nav_content__block').classList.toggle('active')
    }
})