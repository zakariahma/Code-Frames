const logo = document.querySelector('.logo');
setTimeout(() => {
    logo.classList.add('disapear');
}, 1000);

setTimeout(() => {
    logo.innerHTML = 'Code Frames'
    logo.classList.remove('disapear');
}, 2800)