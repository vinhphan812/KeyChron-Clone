const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const { nanoid } = require("nanoid");
const idlength = 8;

const Adapter = new FileSync("./database/users.json");
const db = low(Adapter);

class User {
	constructor() {}
	getUserAccount() {
		return db.get("usersAccount").value();
	}
	getUserInfo() {
		return db.get("userInfo").value();
	}
	addUser(info = { pass, firstName, lastName, email }) {
		return new Promise(async (resolve, reject) => {
			const id = nanoid(idlength);
			const loginInfo = {
					id: id,
					email: info.email,
					pass: info.pass,
				},
				InfoDetail = {
					id: id,
					name: info.lastName + " " + info.firstName,
					phone: "",
					email: info.email,
					address: "",
				},
				ShoppingCartUser = {
					id: id,
					shoppingCart: [],
				};
			db.get("usersAccount").push(loginInfo).write();
			db.get("userInfo").push(InfoDetail).write();
			db.get("ShoppingCartUser").push(ShoppingCartUser).write();
			resolve();
		});
	}
	EditUser(id, data) {
		data.id = id;
		db.get("userInfo").find({ id: id }).assign(data).write();
		return true;
	}
	addShoppingCart({ uid, id, name, quantity, optionKey, optionValue }) {
		var data = db.get("ShoppingCartUser").value();
		console.log(id);
		console.log(data["wUqOnnIu"]);
		console.log(data[uid]);
		// if (db.get("ShoppingCartUser").find(id).value())
		db.get("ShoppingCartUser")
			.push({ [uid]: [] })
			.write();
	}
}

module.exports = User;
