const xhr = new XMLHttpRequest();
class UserFormControl extends React.Component {
	constructor(props) {
		super(props);
		this.main = document.getElementById("main");
		this.LoginForm = this.LoginForm.bind(this);
		this.ForgotForm = this.ForgotForm.bind(this);
		this.reLogin = this.reLogin.bind(this);
		this.CreateForm = this.CreateForm.bind(this);
		this.Submit = this.Submit.bind(this);
	}
	render() {
		return <this.LoginForm />;
	}

	Form(props) {
		return (
			<form
				className="form-box"
				name="account"
				onSubmit="return false;"
			>
				<h1>{props.title}</h1>
				<div id="msg"></div>
				{props.children}
			</form>
		);
	}

	LoginForm() {
		return (
			<this.Form title="login">
				<this.InputBox type="text" name="email" content="EMAIL" />
				<this.InputBox
					type="password"
					name="pass"
					content="PASSWORD"
				>
					<a className="forgot" onClick={this.ForgotForm}>
						Forgot?
					</a>
				</this.InputBox>
				<input
					className="btn"
					name="submit"
					type="button"
					value="Sign in"
					onClick={this.Submit}
				/>
				<a onClick={this.CreateForm}>Create Account</a>
			</this.Form>
		);
	}
	ForgotForm() {
		return ReactDOM.render(
			<this.Form title="Login">
				<h2>Reset your password</h2>
				<p>We will send you an email to reset your password.</p>
				<this.InputBox type="email" content="EMAIL" name="email" />
				<input
					className="btn"
					type="button"
					name="submit"
					value="Submit"
					onClick={this.Submit}
				/>
				<a onClick={this.reLogin}>Cancel</a>
			</this.Form>,
			document.getElementById("main")
		);
	}
	reLogin() {
		return ReactDOM.render(
			<this.LoginForm />,
			document.getElementById("main")
		);
	}
	CreateForm() {
		return ReactDOM.render(
			<this.Form title="Create Account">
				<h1></h1>
				<this.InputBox
					content="FIRST NAME"
					type="text"
					name="firstName"
				/>
				<this.InputBox
					content="LAST NAME"
					type="text"
					name="lastName"
				/>
				<this.InputBox content="EMAIL" type="email" name="email" />
				<this.InputBox
					content="PASSWORD"
					type="password"
					name="pass"
				/>
				<input
					className="btn"
					type="button"
					name="submit"
					value="Create"
					onClick={this.Submit}
				/>
				<a onClick={this.reLogin}>Cancel</a>
			</this.Form>,
			document.getElementById("main")
		);
	}
	Submit(event) {
		const data = document.forms["account"],
			el = this;
		console.log(el);
		let form = [],
			flag = true,
			msg = $("#msg").text("");
		for (var i = 0; i < data.length; i++)
			if ($(data[i]).hasClass("error")) $(data[i]).removeAttr("class");

		for (var i = 0; i < data.length; i++) {
			if (data[i].value != "") {
				if (
					data[i].type == "email" &&
					!validateEmail(data[i].value)
				) {
					flag = false;
					msg.append(
						"<li class='error'>Email is not correct</li>"
					);
					$(data[i]).addClass("error");
				}
				form.push(`${data[i].name}=${data[i].value}`);
			} else {
				$(data[i]).addClass("error");
				flag = false;
			}
		}

		if (!flag) return;

		xhr.open("POST", "/account");
		xhr.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);
		xhr.onreadystatechange = async function () {
			if (this.readyState == 4) {
				let res = JSON.parse(this.responseText);
				if (res.verify) {
					event.target.disabled = true;
					msg.html(`<li>${res.msg}</li>`).addClass("success");
				} else if (res.success) location.reload();
				else if (!res.success)
					msg.html(`<li>${res.msg}</li>`).addClass("error");
			}
		};
		xhr.send(form.join("&"));
	}
	InputBox(props) {
		return (
			<div className="text-box">
				<h5>{props.content}</h5>
				{props.children}
				<input type={[props.type]} name={props.name} />
			</div>
		);
	}
	VerifyForm() {}
}

ReactDOM.render(<UserFormControl />, document.getElementById("main"));

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
