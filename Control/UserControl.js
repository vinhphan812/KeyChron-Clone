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
					name: {
						firstName: info.firstName,
						lastName: info.lastName,
						fullName: info.lastName + " " + info.firstName,
					},
					phone: "",
					email: info.email,
					address: "",
					shoppingCart: [],
				};
			db.get("usersAccount")
				.push(loginInfo)
				.get("userInfo")
				.push(InfoDetail)
				.write();
			resolve();
		});
	}
	EditUser() {}
}

module.exports = User;
