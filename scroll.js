const iconBar = document.getElementById('icon__bar')
window.onscroll = function() {
     if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
          document.getElementById('top').className = "top top__nav";
          document.getElementById('up__top').className = "up__top visible";
     } else {
          document.getElementById('top').className = "top";
          document.getElementById('up__top').className = "up__top";
     }
}

showMenuBar();

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
     document.getElementById('container').className = 'top__container active'
}