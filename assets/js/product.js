const xhr = new XMLHttpRequest();
// product = `product=${location.pathname.split("/")[2]}`;

xhr.open("POST", location.pathname);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(null);
xhr.onreadystatechange = function () {
	if (this.readyState == 4) render(JSON.parse(this.responseText));
};

function render(data) {
	ReactDOM.render(
		<Product data={data} />,
		document.getElementById("main"),
		function () {
			$(".slider-for").slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				mobileFirst: true,
				asNavFor: ".slider-nav",
			});
			$(".slider-nav").slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: ".slider-for",
				vertical: true,
				arrows: false,
				centerMode: true,
				mobileFirst: true,
				centerPadding: "100px",
				focusOnSelect: true,
			});
		}
	);
	$(document).ready(function () {});
}

class Product extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="first-component">
				<Slide imgs={this.props.data.imgURL} />
				<InfoProduct data={this.props.data} />
			</div>
		);
	}
}

class Slide extends React.Component {
	constructor(props) {
		super(props);
		this.slideNav = this.slideNav.bind(this);
		this.slideFor = this.slideFor.bind(this);
	}
	render() {
		return (
			<div className="slide-product">
				<this.slideNav imgs={this.props.imgs} />
				<this.slideFor imgs={this.props.imgs} />
			</div>
		);
	}
	slideNav(props) {
		return (
			<div className="slider-nav">
				{props.imgs.map((img, i) => (
					<this.slideItem img={img} key={i} />
				))}
			</div>
		);
	}
	slideFor(props) {
		return (
			<div className="slider-for">
				{props.imgs.map((img, i) => (
					<this.slideItem img={img} key={i} />
				))}
			</div>
		);
	}
	slideItem(props) {
		return <div style={{ backgroundImage: `url('${props.img}')` }}></div>;
	}
}

class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: this.props.data[0],
		};
		this.radioChange = this.radioChange.bind(this);
		this.Option = this.Option.bind(this);
	}

	radioChange(e) {
		this.setState({
			selectedOption: e.currentTarget.value,
		});
	}

	render() {
		return (
			<div className="select-box">
				<div className="title">{this.props.title}</div>
				<div className="container">
					{this.props.data.map((item, i) => (
						<this.Option
							value={item}
							name={this.props.name}
							index={i}
							key={item}
						/>
					))}
				</div>
			</div>
		);
	}
	Option(props) {
		return [
			<input
				type="radio"
				value={props.value}
				name={props.name}
				id={props.value}
				checked={this.state.selectedOption == props.value}
				onChange={this.radioChange}
			/>,
			<label htmlFor={props.value}>{props.value}</label>,
		];
	}
}

class InfoProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quantity: 1, price: price(this.props.data) };
		this.Bill = this.Bill.bind(this);
		this.QuantityBox = this.QuantityBox.bind(this);
		this.BtnQuantity = this.BtnQuantity.bind(this);
		this.PlusOrMinus = this.PlusOrMinus.bind(this);
	}
	render() {
		const data = this.props.data;
		return (
			<div className="info">
				<form name="product" onChange={this.Bill}>
					<h2>{data.name}</h2>
					<this.Star
						star={data.star}
						reviews={data.reviews}
						key="star"
					/>
					<this.Price price={this.state.price} />
					{data.properties.map((property) => {
						return (
							<Select
								title={property}
								key={property}
								name={property.replaceAll(" ", "")}
								data={
									data[property.replaceAll(" ", "")]
								}
							/>
						);
					})}
					<this.QuantityBox />
					<this.Buyer />
				</form>
			</div>
		);
	}
	QuantityBox() {
		return (
			<div>
				<p>QUANTITY</p>
				<div className="input-group inline-group">
					<this.BtnQuantity value="minus" />
					<input
						type="number"
						className="form-control quantity"
						min="0"
						value={this.state.quantity}
					/>
					<this.BtnQuantity value="plus" />
				</div>
			</div>
		);
	}
	PlusOrMinus(event) {
		if (event.target.className.indexOf("plus") >= 0)
			this.setState({ quantity: this.state.quantity + 1 });
		else
			this.setState({
				quantity:
					this.state.quantity - 1 > 1
						? this.state.quantity - 1
						: 1,
			});
	}
	Bill() {
		const data = this.props.data;
		console.log(data);
		var version = document.forms.product.version.value,
			keys = document.forms.product.keys
				? document.forms.product.keys.value
				: null,
			type = document.forms.product.switchType
				? document.forms.product.switchType.value
				: null,
			price = data[version];
		if (keys == null && type) {
			price = price[type].price;
		} else if (keys && type == null) {
			price = price[keys].price;
		} else {
			price = price.price;
		}
		this.setState({ price: price });
	}
	Price(props) {
		return (
			<div className="price" id="price">
				{`$${props.price || 0}.00`}
			</div>
		);
	}
	Star(props) {
		var stars = [];
		for (var i = 1; i <= 5; i++) {
			var star = React.createElement("i", {
				className:
					"fa fa-star big-size " +
					(i < props.star ? "checked" : ""),
			});
			stars.push(star);
		}
		stars.push(<span>{props.reviews} reviews</span>);
		return <div>{stars}</div>;
	}
	BtnQuantity(props) {
		return (
			<div className="input-group-prepend">
				<button
					type="button"
					className={`btn-${props.value}`}
					onClick={this.PlusOrMinus}
				>
					<i className={`fa fa-${props.value}`}></i>
				</button>
			</div>
		);
	}
	Buyer(props) {
		return (
			<div className="groupBtn">
				<button className="addCart">Add to cart</button>
				<button className="BuyNow">Buy it now</button>
			</div>
		);
	}
}

function price(data) {
	var version = data.version;
	return recPrice(data[version[0]]);
}

function recPrice(data) {
	for (var i in data) {
		if (i == "price") {
			return data.price;
		} else {
			return recPrice(data[i]);
		}
	}
}
