const fs = require("fs");

async function R() {
	var i = await fs.readFile(
		"./database/data.json",
		{ encoding: "utf8" },
		function (err, data) {
			if (err) return err;
			// console.log(JSON.parse(data));
			return JSON.parse(data);
		}
	);
	console.log(i);
}
R();
