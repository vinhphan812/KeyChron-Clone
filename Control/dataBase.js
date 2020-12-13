const fs = require("fs");
const pathUser = "./database/users.json";
const pathDB = "./database/dataTest.json";

function rData(path = pathDB) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: "utf8" }, function (err, data) {
			if (err) reject({ err: true });
			resolve(JSON.parse(data));
		});
	});
}

function wData(path = pathDB, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(path, JSON.stringify(data), (error) => {
			if (error) return reject(error);
			resolve("sucess");
		});
	});
}

class dataBase {
	DATA;
	contructor() {}
	getData() {
		return new Promise(async (resolve, reject) => {
			try {
				if (!this.DATA) this.DATA = await rData();
				if (this.DATA.err) reject("Read data error");
				const data = this.DATA;
				resolve({
					slide: data.slide,
					hightlights: {
						title: data.TitleHome[0],
						items: data.hightlights,
					},
					logo: data.brandLogo,
					various: {
						title: data.TitleHome[1],
						items: data.products.filter((i) => i.isVarious),
					},
					Blog: {
						title: data.TitleHome[2],
						items: data.Blog.filter((i) => i.isHight),
					},
					MediaVideo: data.MediaVideo,
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
