class ShowCase extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return [
			<div>
				<img
					src="/public/img/showcase/image1.jpg"
					style={{ width: "100%" }}
				/>
			</div>,
			<div className="row">
				<div className="column">
					<this.Pricture
						imgURL="/public/img/showcase/image2.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image4.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image5.png"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image7.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image9.jpg"
						user="hi"
					/>
				</div>
				<div className="column">
					<this.Pricture
						imgURL="/public/img/showcase/image3.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image5.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image6.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/image8.jpg"
						user="hi"
					/>
					<this.Pricture
						imgURL="/public/img/showcase/pf-47123f18--1175918377625502412254339082246628156765906n.jpg"
						user="hi"
					/>
				</div>
			</div>,
		];
	}
	Pricture(props) {
		return (
			<div className="container">
				<img
					src={props.imgURL}
					style={{ width: "100%" }}
					className="image"
				/>
				<div className="overlay">{props.user}</div>
			</div>
		);
	}
}
ReactDOM.render(<ShowCase />, document.getElementById("main"));
