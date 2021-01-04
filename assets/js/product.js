const xhr = new XMLHttpRequest();
// product = `product=${location.pathname.split("/")[2]}`;

xhr.open("POST", location.pathname);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(null);
xhr.onreadystatechange = function () {
	if (this.readyState == 4) {
		const res = JSON.parse(this.responseText);
		if (res.success) {
			render(res.data);
		} else
			ReactDOM.render(
				<div className="alertError">
					<i class="fas fa-exclamation-circle"></i>&nbsp;
					{res.msg}
				</div>,
				document.getElementById("main")
			);
	}
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
				asNavFor: ".slider-nav",
			});
			$(".slider-nav").slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: ".slider-for",
				vertical: true,
				arrows: false,
				centerMode: true,
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
		this.state = {
			imgs: props.data.imgURL,
			id: props.data.id,
			name: props.data.name,
			properties: props.data.properties,
			quantity: 1,
			price: props.data.price ? props.data.price : price(props.data),
		};
		this.Bill = this.Bill.bind(this);
		this.QuantityBox = this.QuantityBox.bind(this);
		this.BtnQuantity = this.BtnQuantity.bind(this);
		this.PlusOrMinus = this.PlusOrMinus.bind(this);
		this.Buyer = this.Buyer.bind(this);
		this.AddCart = this.AddCart.bind(this);
		this.BuyItNow = this.BuyItNow.bind(this);
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
						name="quantity"
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
				<button
					type="button"
					className="addCart"
					onClick={this.AddCart}
				>
					Add to cart
				</button>
				<button
					type="button"
					className="BuyNow"
					onClick={this.BuyItNow}
				>
					Buy it now
				</button>
			</div>
		);
	}
	AddCart(event) {
		const properties = this.state.properties,
			product = document.forms.product;
		var data = [],
			imgs = this.state.imgs;
		console.log(this.state);
		for (var i of properties) {
			i = i.replaceAll(" ", "");
			if (i != "version" && i != "switchType") {
				console.log(
					i,
					product[i].value.toLowerCase().replaceAll(" ", "-")
				);
				imgs = imgs.filter((img) => {
					return (
						img.indexOf(
							product[i].value
								.toLowerCase()
								.replaceAll(" ", "-")
						) >= 0
					);
				});
			}

			data.push(`${i}=${product[i].value}`);
		}
		data.push(`properties=${properties}`);
		data.push(`quantity=${this.state.quantity}`);
		data.push(`name=${this.state.name}`);
		data.push(`id=${this.state.id}`);
		data.push(`img=${imgs}`);
		data.push(`price=${this.state.price}`);
		xhr.open("POST", "/addCart");
		xhr.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) {
				if (this.responseText == "true") openNav();
				else location.href = "/account";
			}
		};
		xhr.send(data.join("&"));
	}
	BuyItNow(event) {
		const properties = this.state.properties,
			product = document.forms.product;
		var data = [];
		for (var i of properties) data.push(`${i}=${product[i].value}`);

		xhr.open("POST", "/Buy");
		xhr.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);
		xhr.onreadystatechange = function () {
			if (this.readyState === 4) location.href = this.responseText;
		};
		xhr.send(data.join("&"));
	}
}

function price(data) {
	var version = data.version[0];
	return recPrice(data[version]);
}

function recPrice(dataPrice) {
	for (var i in dataPrice) {
		if (i == "price") {
			return dataPrice.price;
		} else {
			return recPrice(dataPrice[i]);
		}
	}
}
