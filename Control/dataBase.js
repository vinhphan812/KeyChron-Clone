const fs = require("fs");
const pathUser = "./database/users.json";
const pathDB = "./database/dataTest.json";

function rData(path = pathDB) {
	return new Promise(async (resolve, reject) => {
		try {
			fs.readFile(path, { encoding: "utf8" }, function (err, data) {
				if (err) return reject("read file error");
				resolve(JSON.parse(data));
			});
		} catch (error) {
			reject("read File error");
		}
	});
}

function wData(path = pathDB, data) {
	return new Promise(async (resolve, reject) => {
		try {
			fs.writeFile(path, JSON.stringify(data), (error) => {
				if (error) return reject(error);
				resolve("sucess");
			});
		} catch (error) {
			reject("write File error");
		}
	});
}

class dataBase {
	DATA;
	contructor() {}
	getData() {
		return new Promise(async (resolve, reject) => {
			try {
				if (!this.DATA) this.DATA = await rData();

				resolve({
					slide: this.DATA.slide,
					hightlights: this.DATA.hightlights,
					logo: this.DATA.brandLogo,
					various: this.DATA.products.filter((i) => i.isVarious),
					Blog: this.DATA.Blog.filter((i) => i.isHight),
				});
			} catch (error) {
				console.log(error);
				reject("read data error");
			}
		});
	}
	getProducts() {
		return new Promise(async (resolve, reject) => {
			try {
				if (!this.DATA) this.DATA = await rData();
				resolve(this.DATA.products);
				// return rData()
				// 	.then((data) => resolve(data.products))
				// 	.catch((err) => reject(err));
			} catch (error) {
				reject(error);
			}
		});
	}
	findProducts(name) {
		name = name.split("-").join(" ");
	}
	getUser() {
		return new Promise(async (resolve, reject) => {
			try {
				return await rData(pathUser)
					.then((data) => resolve(data))
					.catch((err) => reject(err));
			} catch (error) {
				reject(error);
			}
		});
	}
	addUser(info = { user, pass, name, email }) {
		return new Promise(async (resolve, reject) => {
			rData(pathUser)
				.then((data) => {
					data.users.push(info);
					wData(pathUser, data)
						.then((data) => {
							resolve("success");
						})
						.catch((err) => reject(err));
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}

module.exports = dataBase;
