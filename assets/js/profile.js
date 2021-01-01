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
			name: props.data.name.fullName || "Update Name",
			email: props.data.email || "Update Email",
			phone: props.data.phone || "Update Phone",
			address: props.data.address || "Update Address",
		};
		this.InfoBox = this.InfoBox.bind(this);
		this.Change = this.Change.bind(this);
		this.EditClick = this.EditClick.bind(this);
		this.EnterKey = this.EnterKey.bind(this);
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
					Sign Out <i class="fas fa-sign-out-alt"></i>
				</a>
			</div>,
			<div>
				<this.Title title="Order History" />
			</div>,
			// <div>
			// 	<this.Title title="Empty san hak fkasbs hkfbaib" />
			// </div>,
		];
	}
	Save() {}
	EditClick(event) {
		var input = $(event.target).parent().find("input");
		this.setState({ [input.attr("name") + "Current"]: input.val() });
		disabledInput();
		input.removeAttr("disabled");
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
		// console.log();
		if (el.name == "email" && !validateEmail(el.value)) {
			this.setState({ email: this.state.emailCurrent });
		}
	}
	Change(event) {}
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
