const menu = document.getElementById("menu");
const main = document.getElementById("main");

//start....
$(document).ready(function () {
	stopLoading();
	window.location.hash
		? (window.location.href = window.location.origin + window.location.pathname)
		: "";
	$("#mySlide").ready(() => {
		setTimeout(() => $("#mySlide").addClass("slide"), 1000);
	});
	topBar();
	showMenuBar();
	$(window).scroll(topBar).resize(showMenuBar);
	$("#close__menu").click(closeMenu);
});

function stopLoading() {
	$("#loading").remove();
	$(document.body).removeClass("loading");
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
	$("#main").on("click", closeMenu);
}

function closeMenu() {
	menu.classList.remove("active");
	$(document.body).removeClass("open__menu__right");
	$("#main").off("click", closeMenu);
}

function showSearch() {
	$("#searchBox").addClass("active");
	$(document.body).addClass("open__menu__right");
	$("#main").on("click", closeSearch);
}

function closeSearch() {
	$("#searchBox").removeClass("active");
	$(document.body).removeClass("open__menu__right");
	$("#main").off("click", closeSearch);
}
