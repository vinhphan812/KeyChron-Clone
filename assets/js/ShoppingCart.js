const xhr = new XMLHttpRequest();

xhr.open("GET", "/shoppingCart");

xhr.onreadystatechange = function () {
	if (this.readyState == 4) console.log(this.responseText);
};

xhr.send(null);
