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
$("#notify").text(
	"K1, K2, K4, K6 nodeand K8 will be shipped out in three business days. K3 pre-orders will be shipped out in early January."
);
getData().then((data) =>
	ReactDOM.render(<App data={data} />, document.getElementById("main"))
); //THEN ACTIVE FUNCTION APP DOING DOM DATA IN WEB

//function Promise GET DATA from http://localhost:300/data
function getData() {
	return new Promise(async (resolve, reject) => {
		try {
			xhr.open("GET", "/data"); // method GET, http://localhost:300/data
			xhr.setRequestHeader("Content-Type", "application/json"); // get json
			xhr.onreadystatechange = function () {
				if (this.readyState == 4)
					// 4 == DONE
					resolve(JSON.parse(this.responseText));
			};
			xhr.send(); // send XmlHttpRequest
		} catch (error) {
			reject(error); // error => reject
		}
	});
}

function App(props) {
	// console.log(<Slide list={props.data.slide} />);
	// console.log(props.)
	return <Slide list={props.data.slide} />;
}

// function APP is render data <REACT />
// function App(data) {
// 	ReactDOM.render(<Slide list={data.slide} />, $("#slide")[0], () =>
// 		$("#slide").children().first().addClass("active")
// 	);

// 	ReactDOM.render(
// 		<HightLight list={data.hightlights} />,
// 		$("#hightlights")[0]
// 	);
// 	ReactDOM.render(<LogoBrand list={data.logo} />, $("#logoBrand")[0]);

// 	ReactDOM.render(<Various data={data.various} />, $("#various")[0]);

// 	ReactDOM.render(<BlogList blog={data.Blog} />, $("#blog")[0]);

// 	AOS.init(); // animation on scroll
// }

//component render Carousel
class Slide extends React.Component {
	render() {
		var item = this.props.list.map((item) => (
			<this.SlideItem data={item} />
		));
		console.log(item);
		console.log(this.props);
		return <Slide>{item}</Slide>;
	}
	Slide(props) {
		return (
			<div id="mySlide" class="carousel" data-ride="carousel">
				<div class="carousel-inner" id="slide">
					{props.children}
				</div>
				<a
					class="carousel-control left"
					href="#mySlide"
					role="button"
					data-slide="prev"
				>
					<span
						class="glyphicon glyphicon-chevron-left"
						aria-hidden="true"
					></span>
					<span class="sr-only">Previous</span>
				</a>
				<a
					class="carousel-control right"
					href="#mySlide"
					role="button"
					data-slide="next"
				>
					<span
						class="glyphicon glyphicon-chevron-right"
						aria-hidden="true"
					></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		);
	}
	SlideItem(props) {
		var data = props.data;
		return (
			<div className="carousel-item">
				<Image imgURL={data.imgURL} class="img-slide" />
				<CaptionSilde data={data} />
			</div>
		);
		function CaptionSilde(props) {
			return (
				<div className="carousel-caption">
					<Title title={props.data.title} />
					<Subtitle subtitle={props.data.sub} />
					<BtnSlide
						btnContent={props.data.btnContent}
						URL={props.data.URL}
					/>
				</div>
			);
		}
		function Subtitle(props) {
			return (
				<div className="subtitle">
					<span>{props.subtitle}</span>
				</div>
			);
		}
		function BtnSlide(props) {
			return (
				<button
					className="button"
					onClick={() =>
						(window.location.href = `product/${props.URL}`)
					}
				>
					<span>{props.btnContent}</span>
				</button>
			);
		}
	}
}

class HightLight extends React.Component {
	render() {
		return this.props.list.map((item, index) => (
			<this.Item index={index}>
				<this.ImageHL imgURL={item.imgURL} />
				<this.ContentHL
					title={item.title}
					content={item.content}
					btnContent={item.btnContent}
				/>
			</this.Item>
		));
	}
	Item(props) {
		return (
			<div
				className={
					"flex-container" +
					(props.index % 2 != 0 ? " reverse" : "")
				}
			>
				{props.children}
			</div>
		);
	}
	ImageHL(props) {
		return (
			<div
				className="flex-item"
				data-aos="fade-up-right"
				data-aos-duration="1000"
				data-aos-anchor-placement="top-bottom"
			>
				<img src={props.imgURL} />
			</div>
		);
	}
	ContentHL(props) {
		return (
			<div
				class="flex-item"
				data-aos="fade-up-left"
				data-aos-duration="1000"
				data-aos-anchor-placement="top-bottom"
			>
				<h2 className="title">{props.title}</h2>
				<p className="subtitle">{props.content}</p>
				<button className="button">
					<span>{props.btnContent}</span>
				</button>
			</div>
		);
	}
}
class LogoBrand extends React.Component {
	render() {
		return this.props.list.map((item, index) => (
			<this.Logo data={item} index={index} />
		));
	}
	Logo(props) {
		var data = props.data,
			index = props.index;
		return (
			<img
				src={data.imgURL}
				alt={data.name}
				data-aos="flip-right"
				data-aos-delay={(index + 1) * 100}
				data-aos-duration="1000"
			/>
		);
	}
}

class Various extends React.Component {
	render() {
		return this.props.data.map((item) => <Product product={item} />);
	}
}

class Product extends React.Component {
	render() {
		var product = this.props.product;
		return (
			<a href={product.URL} className="flex-item-col">
				<Image imgURL={product.imgURL} />
				<div className="detail col">
					<p className="name__product">{product.name}</p>
					<div className="reviews">
						<this.StarReview
							star={product.star}
							reviews={product.reviews}
						/>
					</div>
					<div className="price">
						<span>
							{product.sale > 0
								? `$${product.price.toFixed(2)}`
								: ""}
						</span>
						<span>
							&nbsp; form $
							{(product.price - product.sale).toFixed(2)}
						</span>
					</div>
				</div>
			</a>
		);
	}
	StarReview(props) {
		var starHTML = [];
		for (var i = 1; i <= 5; i++)
			starHTML.push(
				i <= props.star ? (
					<i className="fa fa-star checked"></i>
				) : (
					<i className="fa fa-star"></i>
				)
			);
		starHTML.push(<span>{props.reviews} reviews</span>);
		return starHTML;
	}
}

class BlogList extends React.Component {
	render() {
		return this.props.blog.map((item) => <this.Blog blog={item} />);
	}
	Blog(props) {
		return (
			<a className="flex-item-col">
				<Image imgURL={props.blog.imgURL} />
				<BlogDetail data={props.blog} />
			</a>
		);
		function BlogDetail(props) {
			return (
				<div className="detail">
					<DateDetail date={props.data.date} />
					<Title title={props.data.title} />
				</div>
			);
		}
		function DateDetail(props) {
			return <p className="date__upload">{props.date}</p>;
		}
		// function TitleDetail(props) {
		// 	return <p className="title">{props.title}</p>;
		// }
	}
}

function Image(props) {
	var image = React.createElement("div", {
		style: { backgroundImage: `url('${props.imgURL}')` },
	});
	// if (props.class) image.props.className = props.class;
	props.class ? (image.props.className = props.class) : null;

	return image;
}

function Title(props) {
	return (
		<div className="title">
			<span
				dangerouslySetInnerHTML={{
					__html: props.title,
				}}
			/>
		</div>
	);
}
