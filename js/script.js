function updateHeroImageHeight() {
	const header = document.querySelector(".header");
	const hero = document.querySelector(".hero");
	const heroImg = document.querySelector(".hero__img img");

	if (!header || !hero || !heroImg) return;

	// Получаем высоту header и hero
	const headerHeight = header.offsetHeight;
	const heroHeight = hero.offsetHeight;
	const totalHeight = headerHeight + heroHeight;

	// Устанавливаем максимальную высоту для картинки
	heroImg.style.height = `${totalHeight}px`;
	heroImg.style.minHeight = `${totalHeight}px`;

	heroImg.style.objectFit = "cover"; // или contain, если хочешь видеть всё
}

// Срабатывает при загрузке и ресайзе
window.addEventListener("DOMContentLoaded", updateHeroImageHeight);
window.addEventListener("resize", updateHeroImageHeight);
