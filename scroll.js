window.onscroll = function() {
     if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
          document.getElementById('top').className = "top top_nav";
          document.getElementById('up__top').className = "up__top visible";
     } else {
          document.getElementById('top').className = "top";
          document.getElementById('up__top').className = "up__top hidden";
     }
}