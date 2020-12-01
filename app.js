const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const DataBase = require("./Control/dataBase");
var session = require("express-session");

const db = new DataBase();

const host = process.env.PORT || 3000;

const app = express();
var cookie = {
	name: "user",
	keys: ["key1", "key2"],
	secret: "keyboard cat",
	cookie: { maxAge: 10000 },
};

app.set("trust proxy", 1);
app.use(session(cookie));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./assets/view/landingpage.html"));
});

app.get("/test", function (req, res, next) {
	// Update views
	req.session.views = (req.session.views || 0) + 1;

	// Write response
	res.end(req.session.views + " views");
});

app.get("/HOME", (req, res) => {
	res.sendFile(path.join(__dirname, "./assets/view/index.html"));
});

app.get("/data", async (req, res) => {
	res.json(await db.getData());
});

app.get("/data/slide", async (req, res) => {});

app.get("/data/products", async (req, res) => {
	res.json(await db.getProducts());
});

app.get("/data/user", async (req, res) => {
	res.send(await db.getUser());
});

app.get("/data/user/:id", async (req, res) => {
	var users = (await db.getUser()).users;
	return users.length > req.params.id
		? res.send(users[req.params.id])
		: res.send("Not Found User ID");
});

app.get("/login", async (req, res) => {
	console.log(req.sessionID);
	if (req.session.views) {
		req.session.views++;
		res.setHeader("Content-Type", "text/html");
		res.write("<p>views: " + req.session.views + "</p>");
		res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
		res.end();
	} else {
		req.session.views = 1;
		res.end("welcome to the session demo. refresh!");
	}
});

app.post("/login", async (req, res) => {
	const users = (await db.getUser()).users;
	user = users.find((i) => i.user == req.body.user);

	if (user) return res.send(user.pass == req.body.pass);
	res.send(false);
});

app.get("/users/:userId/books/:bookId", function (req, res) {
	res.send(req.params);
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

app.listen(host, function () {
	console.log(`server running is http://localhost:${host}`);
});
