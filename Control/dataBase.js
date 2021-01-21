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
				resolve({
					title: "Related Products",
					items: db
						.get("products")
						.filter({ isVarious: true })
						.value(),
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	findProduct(name) {
		var namePlace = name.toLowerCase();
		return productDB
			.get("Products")
			.find(function (product) {
				if (product.name.toLowerCase().indexOf(namePlace) >= 0) {
					return product;
				}
			})
			.value();
	}
}

module.exports = database;
