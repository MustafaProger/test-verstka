function updateHeroImageHeight() {
	const header = document.querySelector(".header");
	const hero = document.querySelector(".hero");
	const heroImg = document.querySelector(".hero__img img");

	if (!header || !hero || !heroImg) return;

	const headerHeight = header.offsetHeight;
	const heroHeight = hero.offsetHeight;
	const totalHeight = headerHeight + heroHeight;

	heroImg.style.height = `${totalHeight}px`;
	heroImg.style.minHeight = `${totalHeight}px`;

	heroImg.style.objectFit = "cover";
}

function recoloringHeader() {
	const header = document.querySelector(".header");
	const hero = document.querySelector(".hero");

	if (!header || !hero) return;

	const heroHeight = hero.offsetHeight;
	const scrollY = window.scrollY || window.pageYOffset;

	if (scrollY > heroHeight - 100) {
		header.classList.add("header--scrolled");
	} else {
		header.classList.remove("header--scrolled");
	}
}

function scroll() {
	const header = document.querySelector(".header");
	const headerHeight = header.offsetHeight;

	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				const targetPosition =
					target.getBoundingClientRect().top +
					window.pageYOffset -
					headerHeight;
				window.scrollTo({ top: targetPosition, behavior: "smooth" });
			}
		});
	});
}

window.addEventListener("DOMContentLoaded", pusk);
window.addEventListener("resize", pusk);
window.addEventListener("scroll", recoloringHeader);

function pusk() {
	updateHeroImageHeight();
	recoloringHeader();
	scroll();
}
