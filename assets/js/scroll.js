const iconBar = document.getElementById('icon__bar');
const close = document.getElementById('close__menu');
const menu = document.getElementById('menu');
const main = document.getElementById('main');


//start....

topBar();
showMenuBar();
window.onscroll = topBar();

function topBar() {
     if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
          document.getElementById('top').className = "top top__nav";
          document.getElementById('up__top').className = "up__top visible";
     } else {
          document.getElementById('top').className = "top";
          document.getElementById('up__top').className = "up__top";
     }
}

document.body.onresize = showMenuBar;

function showMenuBar() {
     if (screen.width < 900) {
          iconBar.children[0].classList.add('hidden');
          iconBar.children[2].classList.remove('hidden');
     } else {
          iconBar.children[0].classList.remove('hidden');
          iconBar.children[2].classList.add('hidden');
     }
}

function show() {
     menu.className = 'top__container active';
     document.body.classList.add('open__menu__right');
     main.onclick = () => {
          menu.classList.remove('active');
          document.body.removeAttribute('class');

     }
}

close.addEventListener('click', (e) => {
     menu.classList.remove('active');
     document.body.removeAttribute('class');
});