const xhr = new XMLHttpRequest();

xhr.open("GET", "/info");

xhr.onreadystatechange = function () {
	if (this.readyState == 4)
		ReactDOM.render(
			<Profile data={JSON.parse(this.responseText)} />,
			document.getElementById("main")
		);
};

xhr.send(null);

class Profile extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.data);
		this.state = {
			name: props.data.name || "Update Name",
			email: props.data.email || "Update Email",
			phone: props.data.phone || "Update Phone",
			address: props.data.address || "Update Address",
		};
		this.InfoBox = this.InfoBox.bind(this);
		this.Change = this.Change.bind(this);
		this.EditClick = this.EditClick.bind(this);
		this.EnterKey = this.EnterKey.bind(this);
		this.Save = this.Save.bind(this);
	}
	render() {
		return [
			<div id="info">
				<this.Title title="My Account" />
				<this.InfoBox
					content="Name"
					userContent={this.state.name}
				/>
				<this.InfoBox
					content="Email"
					userContent={this.state.email}
				/>
				<this.InfoBox
					content="Phone"
					userContent={this.state.phone}
				/>
				<this.InfoBox
					content="Address"
					userContent={this.state.address}
				/>
				<a href="/signout">
					Sign Out <i className="fas fa-sign-out-alt"></i>
				</a>
			</div>,
			<div>
				<this.Title title="Order History" />
				<ul className="OrderList"></ul>
			</div>,
		];
	}
	Save() {
		var formData = `email=${this.state.email}&name=${this.state.name}&phone=${this.state.phone}&address=${this.state.address}`;
		console.log(formData);
		xhr.open("POST", "/saveInfo");
		xhr.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);
		xhr.onreadystatechange = function () {
			if (this.readyState === 4)
				console.log(JSON.parse(this.responseText));
		};
		xhr.send(formData);
	}
	EditClick(event) {
		var input = $(event.target).parent().find("input");
		this.setState({ [input.attr("name") + "Current"]: input.val() });
		disabledInput();
		input.removeAttr("disabled");
		input.focus();
	}
	Title(props) {
		return <h2>{props.title}</h2>;
	}
	InfoBox(props) {
		return (
			<div className="info__box">
				<div>
					<span className="info__bold">{props.content}: </span>
					<input
						name={props.content.toLowerCase()}
						type="text"
						value={props.userContent}
						disabled
						onChange={this.Change}
						required
						onKeyUp={this.EnterKey}
					/>
				</div>
				<a className="edit" onClick={this.EditClick}></a>
			</div>
		);
	}
	EnterKey(event) {
		var el = event.target;
		if (event.code != "Enter") return;
		el.disabled = true;
		console.log(this.state);
		if (el.name == "email" && !validateEmail(el.value)) {
			return this.setState({ email: this.state.emailCurrent });
		}
		if (el.value == "" || el.value.length < 10)
			return this.setState({
				[el.name]: this.state[el.name + "Current"],
			});
		this.Save({ info: el.name, data: el.value });
	}
	Change(event) {
		this.setState({ [event.target.name]: event.target.value });
	}
}

function disabledInput() {
	var form = $("#info").find("input");
	for (var i = 0; i < form.length; i++) {
		if (form[i].value != "") form[i].disabled = true;
	}
}

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
