const xhr = new XMLHttpRequest();
const slideDOM = document.getElementById('slide');
const hl = document.getElementById('hightlights');
const logoBrand = document.getElementById('logoBrand');
const various = document.getElementById('various');
var data = "";

getData().then(async function(res) {
     console.log(res);
     data = res;
     various.innerHTML = data.product.filter((i) => {
          if (i.isVarious)
               return i;
     }).map(function(i) {
          return `<a href="${i.URL}" class="flex-item-col">
               <img src="${i.imgURL}">
               <div class="detail col">
                    <p class="name__product">${i.name}</p>
                    <div class="reviews">
                         ${renderStarReview(i.star)}
                         <span>${i.reviews} reviews</span>
                    </div>
                    ${Price(i.price, i.sale)}
               </div>
          </a>`
     }).join('');

     slideDOM.innerHTML = data.slide.map(function(i, e) {
          return `<div class="carousel-item">
               <div class="img-slide" style="background-image:url('${i.imgURL}');"></div>
               <div class="carousel-caption">
                    <div class="title"><span>${i.title}</span></div>
                    <div class="subtitle"><span>${i.sub}</span></div>
                    <button class="btn btn-outline-light button"><span>${i.btnContent}</span></button>
               </div>
          </div>`
     }).join('');
     slideDOM.children[0].classList.add('active');
     hl.innerHTML = data.hightlights.map(function(i, e) {
          return `<div class="flex-container ${e%2 != 0 ? 'reverse' : ''}">
               <div class="flex-item" data-aos="fade-up-right" data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
                    <img src="${i.imgURL}">
               </div>
               <div class="flex-item" data-aos="fade-up-left" data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
                    <h2 class="title">${i.title}</h2>
                    <p class="subtitle">${i.content}</p>
                    <button class="button"><span>${i.btnContent}</span></button>
               </div>
          </div>`
     }).join('');
     logoBrand.innerHTML = data.brandLogo.map(function(i, e) {
          return `<img data-aos="flip-right" data-aos-delay="${(e + 1) * 100}" data-aos-duration="1000" src="${i.imgURL}" alt="${i.name}">`
     }).join('');


})

function getData() {
     return new Promise(async(resolve, reject) => {
          try {
               xhr.open('GET', '/data');
               xhr.setRequestHeader('Content-Type', 'application/json');
               xhr.onreadystatechange = function() {
                    if (this.readyState == 4)
                         resolve(JSON.parse(this.responseText));
               }
               xhr.send();
          } catch (error) {
               reject(error);
          }
     })
}

function renderStarReview(star) {
     var starHTML = "";
     for (var i = 1; i <= 5; i++) {
          if (i <= star)
               starHTML += "<span class='fa fa-star checked'></span>"
          else
               starHTML += "<span class='fa fa-star'></span>"
     }
     return starHTML;
}

function Price(price, sale) {
     return sale > 0 ? `<p class='price'><span>$${price.toFixed(2)}</span> from $${(price * (1 - sale / 100)).toFixed(2)}</p>` : `<p class="price">from $${price.toFixed(2)}</p>`
}