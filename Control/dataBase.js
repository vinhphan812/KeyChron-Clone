const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./database/dataTest.json"),
	adapterP = new FileSync("./database/product.json");
const db = low(adapter),
	productDB = low(adapterP);

class database {
	contructor() {}
	getData() {
		return new Promise(async (resolve, reject) => {
			try {
				const title = db.get("TitleHome").value();
				resolve({
					slide: db.get("slide").value(),
					highlights: {
						title: title[0],
						items: db.get("highlights").value(),
					},
					logo: db.get("brandLogo").value(),
					various: {
						title: title[1],
						items: db
							.get("products")
							.filter({ isVarious: true })
							.value(),
					},
					Blog: {
						title: title[2],
						items: db
							.get("Blog")
							.filter({ isHigh: true })
							.value(),
					},
					MediaVideo: db.get("MediaVideo").value(),
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	getProducts() {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(db.get("products").value());
			} catch (error) {
				reject(error);
			}
		});
	}
	findProduct(name) {
		name = name.replaceAll("-", " ");
		console.log(name);
		var product = productDB
			.get("Products")
			// .value()
			.find(function (product) {
				if (product.name.toLowerCase().indexOf(name) >= 0)
					return product;
			})
			.value();
		return product;
	}
}

module.exports = database;
