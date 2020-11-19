const xhr = new XMLHttpRequest();
// const error = [{
//      URL: '/ERROR',
//      imgURL: "https://picsum.photos/seed/picsum/200/300",
//      title: "ERROR",
//      name: "ERROR",
//      sub: "NOT FOUND DATA",
//      content: "NOT FOUND DATA",
//      date: new Date().Now,
//      btnContent: "",
// }];

///GET DATA FROM SERVER
document.getElementById('notify').innerText = "K1, K2, K4, K6 nodeand K8 will be shipped out in three business days. K3 pre-orders will be shipped out in early January.";
getData().then(App); //THEN ACTIVE FUNCTION APP DOING DOM DATA IN WEB


//function Promise GET DATA from http://localhost:300/data
function getData() {
     return new Promise(async(resolve, reject) => {
          try {
               xhr.open('GET', '/data'); // method GET, http://localhost:300/data
               xhr.setRequestHeader('Content-Type', 'application/json'); // get json
               xhr.onreadystatechange = function() {
                    if (this.readyState == 4) // 4 == DONE
                         resolve(JSON.parse(this.responseText));
               }
               xhr.send(); // send XmlHttpRequest
          } catch (error) {
               reject(error); // error => reject 
          }
     })
}


// function APP is render data <REACT />
function App(data){
     try {
          ReactDOM.render(<Slide list={data.slide}/>, $('#slide')[0], () => $('#slide').children().first().addClass('active'));

          ReactDOM.render(<HightLight list={data.hightlights}/>, $('#hightlights')[0]);
          ReactDOM.render(<LogoBrand list={data.logo}/>, $('#logoBrand')[0]);
     
          ReactDOM.render(<Various data={data.various}/>, $('#various')[0])
          ReactDOM.render(<Blog blog={data.Blog} />, $('#blog')[0]);

          AOS.init(); // animation on scroll 
     } catch (error) {
          AOS.init(); // animation on scroll
     }
}

//component render Carousel 
class Slide extends React.Component{
     render(){
          return this.props.list.map((item) => <this.SlideItem data={item} />); 
     }
     SlideItem(props){
          var data = props.data;
          return (
          <div className="carousel-item">
               <div className="img-slide" style={{backgroundImage: `url(${data.imgURL})`}}></div>
               <div className="carousel-caption">
                    <div className="title"><span dangerouslySetInnerHTML={{__html: data.title}} /></div>
                    <div className="subtitle"><span>{data.sub}</span></div>
                    <button className="button"><span>{data.btnContent}</span></button>
               </div>
          </div>
          );
     }
}
class HightLight extends React.Component {
     render(){
          return this.props.list.map((item, index) => <this.Item data={item} index={index}/>);
     }
     Item(props) {
          var data = props.data, index = props.index;
          return (
          <div className={"flex-container" + (index%2 != 0 ? ' reverse' : "")}>
               <div className="flex-item" data-aos="fade-up-right" data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
                    <img src={data.imgURL}/>
               </div>
               <div class="flex-item" data-aos="fade-up-left" data-aos-duration="1000" data-aos-anchor-placement="center-bottom">
                    <h2 className="title">{data.title}</h2>
                    <p className="subtitle">{data.content}</p>
                    <button className="button"><span>{data.btnContent}</span></button>
               </div>
          </div>
          )
     }
}

class LogoBrand extends React.Component {
     render() {
          return this.props.list.map((item, index) => <this.Logo data={item} index={index}/>);
     }
     Logo(props){
          var data = props.data, index = props.index;
          return <img src={data.imgURL} alt={data.name} data-aos="flip-right" data-aos-delay={(index + 1) * 100} data-aos-duration="1000"/>
     }
}

class Various extends React.Component{
     render(){
          return this.props.data.map((item) => <Product product={item}/>);
     }
}

class Product extends React.Component{
     render(){
          var product = this.props.product;
          return (
               <a href={product.URL} className="flex-item-col">
                    <img src={product.imgURL} alt={product.name}/>
                    <div className="detail col">
                         <p className="name__product">{product.name}</p>
                         <div className="reviews">{<this.StarReview star={product.star} reviews={product.reviews} />}</div>
                         <div className="price"><span>{product.sale > 0 ? "$" + product.price.toFixed(2) : ""}</span> form ${(product.price - product.sale).toFixed(2)}</div>
                    </div>
               </a>
          )
     }
     StarReview(props) {
          var starHTML = [];
          for(var i = 1; i <= 5; i++)
               starHTML.push(i <= props.star ? <span className="fa fa-star checked"></span> : <span className="fa fa-star"></span>)
          starHTML.push(<span>{props.reviews} reviews</span>)
          return starHTML;
     }
}

class Blog extends React.Component{
     render(){
          return <this.itemBlog blog={this.props.blog}/>;
     }
     itemBlog(props){
          var data = props.blog;
          return data.map(function(item){
               return (
               <a className="flex-item-col">
                    <img src={item.imgURL} alt={item.title} />
                    <div className="detail">
                         <p className="date__upload">{item.date}</p>
                         <p className="title">{item.title}</p>
                    </div>
               </a>
               );
          })
     }
}