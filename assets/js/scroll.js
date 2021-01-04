const menu = document.getElementById("menu");
const main = document.getElementById("main");

var load = setInterval(window.scrollTo(0, 0), 1);
$("#notify").text(
	"K1, K2, K4, K6 nodeand K8 will be shipped out in three business days. K3 pre-orders will be shipped out in early January."
);

//start....
$(document).ready(function () {
	clearInterval(load);
	$(main).removeClass("main__loading");
	window.location.hash
		? (window.location.href =
				window.location.origin + window.location.pathname)
		: "";
	$("#mySlide").ready(() => {
		setTimeout(() => $("#mySlide").addClass("slide"), 1000);
	});
	topBar();
	showMenuBar();
	$(window).scroll(topBar).resize(showMenuBar);
	$("#close__menu").click(closeLayerMain);
});
$(".btn-plus, .btn-minus").on("click", function (e) {
	const isNegative = $(e.target).closest(".btn-minus").is(".btn-minus");
	const input = $(e.target).closest(".input-group").find("input");
	console.log(input);
	if (input.is("input")) {
		input[0][isNegative ? "stepDown" : "stepUp"]();
	}
});

function openNav() {
	$(document.body).addClass("open__menu__right");
	$("#main").on("click", closeLayerMain);
	$("#mySidenav").addClass("active");
}

function darkMode() {
	var body = $(document.body);
	return body.hasClass("dark-mode")
		? body.removeClass("dark-mode")
		: body.addClass("dark-mode");
}

//
function topBar() {
	const top = $("#top");
	const toTop = $("#up__top");

	if ($(document).scrollTop() > 130) {
		top.addClass("top__nav");
		toTop.addClass("visible");
	} else {
		top.removeClass("top__nav");
		toTop.removeClass("visible");
	}
}

function showMenuBar() {
	const user = $("#icon__bar>a:nth-child(1)");
	const menu = $("#icon__bar>a:nth-child(3)");

	if ($(document).width() < 900) {
		user.addClass("hidden");
		menu.removeClass("hidden");
	} else {
		user.removeClass("hidden");
		menu.addClass("hidden");
	}
}

function show() {
	menu.className = "top__container active";
	$(document.body).addClass("open__menu__right");
	$("#main").on("click", closeLayerMain);
}

function showSearch() {
	$("#searchBox").addClass("active");
	$(document.body).addClass("open__menu__right");
	$("#main").on("click", closeLayerMain);
}

function closeLayerMain() {
	if ($("#searchBox").hasClass("active"))
		$("#searchBox").removeClass("active");
	else if ($("#menu").hasClass("active")) menu.classList.remove("active");
	else if ($("#mySidenav").hasClass("active"))
		$("#mySidenav").removeClass("active");
	$("#main").off("click", closeLayerMain);
	$(document.body).removeClass("open__menu__right");
}
