ReactDOM.render(<LoginForm />, document.getElementById("main"));

function LoginForm(props) {
	return (
		<form class="login-box">
			<h1>LOGIN</h1>
			<div class="text-box">
				<h4>EMAIL</h4>
				<input type="text" />
			</div>
			<div class="text-box">
				<h4>PASSWORD</h4>
				<a class="forgot" href="forgot.html">
					Forgot?
				</a>
				<input type="password" />
			</div>
			<input class="btn" type="submit" value="Sign in" />
			<a href="signup.html">Create Account</a>
		</form>
	);
}

class FormLogin extends React.Component {}
