const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("nanoid");
const idlength = 10;

const Adapter = new FileSync("./database/dataTest.json");
const db = low(Adapter);

const AAdapter = new FileSync("./database/product.json");
const dbb = low(AAdapter);

// var product = db.get("products").value();
var product = dbb.get("Keyboards").value();

product.map(function (keyboard) {
	// keyboard.id = nanoid(idlength);
	console.log(keyboard);
	// console.table(keyboard);
	return keyboard;
});

// console.table(product);

// dbb.set("Accessories", product).write();

// console.log(product.length);
