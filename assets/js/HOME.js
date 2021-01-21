const xhr = new XMLHttpRequest();

getData().then(render);
//* function Promise GET DATA from http://localhost:300/data
function getData() {
	return new Promise(async (resolve, reject) => {
		try {
			xhr.open("GET", "/data"); //* method GET, http://localhost:300/data
			xhr.setRequestHeader("Content-Type", "application/json"); //TODO get json
			xhr.onreadystatechange = function () {
				if (this.readyState == 4)
					resolve(JSON.parse(this.responseText));
			};
			xhr.send(); //TODO send XmlHttpRequest
		} catch (error) {
			reject(error); //! error => reject
		}
	});
}
//* render Home Page
function render(data) {
	ReactDOM.render(<HOME data={data} />, document.getElementById("main"));
	$("#main").removeClass("main__loading");
	AOS.init({ once: true }); //TODO create animatipn on scroll website
}

//TODO create image element
function Image(props) {
	return React.createElement("img", props.data);
}

function BgImage(props) {
	return <div style={{ backgroundImage: `url('${props.src}')` }}></div>;
}

//* render Button Slide and Button HighLight

function Button(props) {
	return React.createElement("button", {
		children: <span>{props.content}</span>,
		className: "button",
		onClick: () => (window.location.href = `product${props.URL}`),
	});
}

//* render Title Main
function Title(props) {
	return <h2 className="h2-title">{props.title}</h2>;
}

//* All HOME
class HOME extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: props.data };
	}
	render() {
		const data = this.state.data;
		return [
			<Slide list={data.slide} key="Carousel" />,
			<HighLight data={data.highlights} key="HighLight" />,
			<LogoBar data={data.logo} key="LogoBar" />,
			<MediaVideo videos={data.MediaVideo} key="MediaVideo" />,
			<Posts data={data.various} key="Various" />,
			<Posts data={data.Blog} key="Blog" />,
		];
	}
}
//* Render Slide
class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: props.list };
		this.SlideInner = this.SlideInner.bind(this);
	}
	render() {
		return (
			<div
				id="mySlide"
				className="carousel"
				data-ride="carousel"
				key="Carousel"
			>
				<this.SlideInner />
				<this.SlideControlRender
					direction="left"
					dataSlide="prev"
				/>
				<this.SlideControlRender
					direction="right"
					dataSlide="next"
				/>
			</div>
		);
	}
	SlideControlRender(props) {
		return React.createElement("a", {
			className: "carousel-control-" + props.dataSlide,
			href: "#mySlide",
			role: "button",
			"data-slide": props.dataSlide,
			children: React.createElement("i", {
				className: "carousel-control-" + props.dataSlide + "-icon",
				"aria-hidden": true,
			}),
		});
	}
	SlideInner(props) {
		return React.createElement("div", {
			className: "carousel-inner",
			id: "slide",
			children: this.props.list.map((item, index) => (
				<this.SlideItem data={item} index={index} this={this} />
			)),
		});
	}
	SlideItem(props) {
		const attr = {
			className: "img-slide",
			src: props.data.imgURL,
			alt: props.data.title,
		};
		return (
			<div
				className={
					"carousel-item" + (props.index == 0 ? " active" : "")
				}
			>
				<Image data={attr} />
				<props.this.CaptionSilde
					title={props.data.title}
					sub={props.data.sub}
					content={props.data.btnContent}
					URL={props.data.URL}
					this={props.this}
				/>
			</div>
		);
	}
	CaptionSilde(props) {
		return (
			<div className="carousel-caption">
				<props.this.TitleSlide title={props.title} />
				<props.this.Subtitle subtitle={props.sub} />
				<Button content={props.content} URL={props.URL} />
			</div>
		);
	}
	TitleSlide(props) {
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
	Subtitle(props) {
		return (
			<div className="subtitle">
				<span>{props.subtitle}</span>
			</div>
		);
	}
}

//* render HighLight
class HighLight extends React.Component {
	constructor(props) {
		super(props);
		this.Item = this.Item.bind(this);
	}
	render() {
		return (
			<this.Container>
				<Title title={this.props.data.title} />
				{this.props.data.items.map((item, index) => (
					<this.Item index={index} data={item} />
				))}
			</this.Container>
		);
	}
	Container(props) {
		return React.createElement("div", {
			children: props.children,
		});
	}
	Item(props) {
		return React.createElement("div", {
			className:
				"flex-container" + (props.index % 2 != 0 ? " reverse" : ""),
			children: [
				<this.ImageHL imgURL={props.data.imgURL} />,
				<this.ContentHL
					title={props.data.title}
					sub={props.data.content}
					btnContent={props.data.btnContent}
				/>,
			],
		});
	}
	ImageHL(props) {
		return React.createElement("div", {
			className: "flex-item",
			"data-aos": "fade-up-right",
			"data-aos-duration": "1000",
			"data-aos-anchor-placement": "top-bottom",
			children: <img src={props.imgURL} />,
		});
	}
	ContentHL(props) {
		var title = React.createElement("h2", {
				className: "title",
				children: props.title,
			}),
			sub = React.createElement("p", {
				className: "subtitle",
				children: props.sub,
			}),
			btn = React.createElement("button", {
				className: "button",
				children: <span>{props.btnContent}</span>,
			});
		return React.createElement("div", {
			className: "flex-item",
			"data-aos": "fade-up-left",
			"data-aos-duration": "1000",
			"data-aos-anchor-placement": "top-bottom",
			children: [title, sub, btn],
		});
	}
}
class LogoBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var data = this.props.data;
		return React.createElement("div", {
			className: "logo__scroll",
			children: data.map((item, index) => (
				<this.Link href={item.URL}>
					<this.Logo
						imgURL={item.imgURL}
						alt={item.name}
						index={index}
					/>
				</this.Link>
			)),
		});
	}
	Link(props) {
		return React.createElement("a", props);
	}
	Logo(props) {
		const attr = {
			src: props.imgURL,
			alt: props.alt,
			"data-aos": "flip-right",
			"data-aos-delay": (props.index + 1) * 100,
			"data-aos-duration": "1000",
		};

		return <Image data={attr} />;
	}
}
//* render MediaVideo
class MediaVideo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="media__video">
				<this.Video videoURL={this.props.videos.vdURL} />
				<this.MediaContent
					title={this.props.videos.title}
					content={this.props.videos.content}
				/>
			</div>
		);
	}
	Video(props) {
		return React.createElement("video", {
			src: props.videoURL,
			autoPlay: "autoplay",
			loop: "loop",
			muted: true,
		});
	}
	MediaContent(props) {
		return React.createElement("div", {
			className: "media__content",
			children: [
				<h2>{props.title}</h2>,
				props.content.map((para, i) => <p key={i}>{para}</p>),
			],
		});
	}
}
//* class render posts
class Posts extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Title title={this.props.data.title} />
				<this.ProductContainer>
					{this.props.data.items.map((item, i) =>
						item.date ? (
							<Blog data={item} key={item.title} />
						) : (
							<Product data={item} key={item.name} />
						)
					)}
				</this.ProductContainer>
			</div>
		);
	}
	ProductContainer(props) {
		return React.createElement("div", {
			children: props.children,
			className: "flex-col-3",
		});
	}
}
//* render Product
class Product extends React.Component {
	render() {
		const product = this.props.data;
		// const attr = {
		// 	src: product.imgURL,
		// 	alt: product.name,
		// };
		return (
			<a href={product.URL} className="flex-item-col">
				<BgImage src={product.imgURL} />
				<div className="detail col">
					<p className="name__product">{product.name}</p>
					<div className="reviews">
						<this.StarReview
							star={product.star}
							reviews={product.reviews}
							key={product.star}
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
//* render Blog
class Blog extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<a href={this.props.URL} className="flex-item-col">
				<BgImage src={this.props.data.imgURL} />
				<this.BlogDetail
					date={this.props.data.date}
					title={this.props.data.title}
				/>
			</a>
		);
	}
	BlogDetail(props) {
		return (
			<div className="detail">
				<DateDetail date={props.date} />
				<Title title={props.title} />
			</div>
		);
		function Title(props) {
			return <div className="title">{props.title}</div>;
		}
		function DateDetail(props) {
			return <p className="date__upload">{props.date}</p>;
		}
	}
}
