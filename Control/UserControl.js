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
					shoppingCart: [],
				};
			db.get("usersAccount").push(loginInfo).write();
			db.get("userInfo").push(InfoDetail).write();
			resolve();
		});
	}
	EditUser(id, data) {
		data.id = id;
		db.get("userInfo").find({ id: id }).assign(data).write();
		return true;
	}
}

module.exports = User;
