const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

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
	addUser(info = { user, pass, name, email }) {
		return new Promise(async (resolve, reject) => {});
	}
	EditUser() {
		
	}
}

module.exports = User;
