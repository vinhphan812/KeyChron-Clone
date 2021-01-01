const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const product = require("./routers/product.router");
var session = require("express-session");
const DataBase = require("./Control/dataBase"),
	User = require("./Control/UserControl");

const app = express(),
	user = new User(),
	db = new DataBase(),
	host = process.env.PORT || 3000;
let usersAccount = user.getUserAccount(),
	userInfo = user.getUserInfo();

var cookie = {
	name: "user",
	resave: true,
	saveUninitialized: true,
	secret: "somesecret",
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
};

app.set("trust proxy", 1);
app.set("views", "./assets/view");
app.set("view engine", "pug");

app.use(express.json());
app.use(session(cookie));
app.use("/product", product);
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("index", {
		title: "KeyChron",
		scripts: ["./js/HOME.js"],
		styles: [],
	});
});

app.get("/data", async (req, res) => {
	res.json(await db.getData());
});

app.get("/data/slide", async (req, res) => {});

app.get("/data/products", async (req, res) => {
	res.json(await db.getProducts());
});

app.get("/data/user/:id", async (req, res) => {
	return usersAccount.length > req.params.id
		? res.send(usersAccount[req.params.id])
		: res.send("Not Found User ID");
});

app.get("/test", (req, res) => {
	res.sendFile(path.join(__dirname, "/assets/view/index.html"));
});

app.get("/account", (req, res) => {
	// req.session.user = {
	// 	id: "JUIjEtoa",
	// 	name: {
	// 		first: "Phan",
	// 		last: "Thanh Vinh",
	// 		fullName: "Thanh Vinh Phan",
	// 	},
	// 	phone: "0335499633",
	// 	address: "Q10,Tp HCM",
	// 	email: "vinhphan812@gmail.com",
	// 	shoppingCart: [],
	// };
	if (!req.session.user)
		res.render("index", {
			title: "Account",
			scripts: ["./js/LOGIN.js"],
			styles: ["./css/login.css"],
		});
	else
		res.render("index", {
			title: `Account - ${req.session.user.name.fullName}`,
			scripts: ["./js/profile.js"],
			styles: ["./css/profile.css"],
		});
});

app.post("/saveInfo", async (req, res) => {});

app.post("/account", async (req, res) => {
	let data = req.body,
		response = {};
	console.log(data);
	if (!req.session.user) {
		const user = usersAccount.find((i) => i.user == data.email);
		if (data.submit === "Sign in") {
			if (user && user.pass == data.pass) {
				req.session.user = userInfo.find((i) => i.id == user.id);
				response.success = true;
			} else
				response = {
					success: false,
					msg: "Incorrect email or password.",
				};
		} else if (data.submit == "Create") {
			if (
				data.firstName &&
				data.lastName &&
				data.email &&
				data.pass &&
				!user
			)
				response = {
					success: true,
					msg: "Create account failed.",
				};
			else
				response = {
					success: false,
					msg: "Email has been registered.",
				};
		} else if (data.submit == "Submit") {
			if (user)
				response = {
					success: true,
					verify: true,
					msg:
						"We've sent you an email with a link to update your password.",
				};
			else
				response = {
					success: false,
					verify: false,
					msg: "Email hasn't been registered",
				};
			res.status(302);
		}
	}
	res.send(response);
});

app.get("/info", (req, res) => {
	res.json(req.session.user);
});

app.get("/user", async (req, res) => {
	var us = await user.getUserList();
	console.log(us);
	res.json(us);
});

app.post("/data", async (req, res) => {
	const user = req.body;
	if (user.user && user.name && user.email && user.pass)
		await db.addUser({
			user: user.user,
			pass: user.pass,
			name: user.name,
			email: user.email,
		});
	else return res.send("Wrong info");
	res.send("oki");
});

app.get("/signout", async (req, res) => {
	req.session.destroy();
	// res.send("oki");
	res.redirect("/account");
});

app.listen(host, function () {
	console.log(`server running is http://localhost:${host}`);
});
