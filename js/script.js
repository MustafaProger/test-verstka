document.addEventListener("DOMContentLoaded", () => {
	const header = document.querySelector(".header");
	const hero = document.querySelector(".hero");
	const heroImg = document.querySelector(".hero__img img");
	const burger = document.querySelector(".header__burger");
	const nav = document.querySelector(".nav");
	const overlay = document.querySelector(".overlay");
	const body = document.body;

	const updateHeroImageHeight = () => {
		if (!header || !hero || !heroImg) return;
		const totalHeight = header.offsetHeight + hero.offsetHeight;

		Object.assign(heroImg.style, {
			height: `${totalHeight}px`,
			minHeight: `${totalHeight}px`,
			objectFit: "cover",
		});
	};

	const recolorHeader = () => {
		if (!header || !hero) return;
		const scrollY = window.scrollY || window.pageYOffset;
		const heroHeight = hero.offsetHeight;

		header.classList.toggle("header--scrolled", scrollY > heroHeight - 110);
	};

	const initSmoothScroll = () => {
		const headerHeight = header.offsetHeight;
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener("click", (e) => {
				e.preventDefault();
				const target = document.querySelector(anchor.getAttribute("href"));
				if (target) {
					const offsetTop =
						target.getBoundingClientRect().top +
						window.pageYOffset -
						headerHeight;
					window.scrollTo({ top: offsetTop, behavior: "smooth" });
				}
			});
		});
	};

	const closeMenu = () => {
		burger.classList.remove("active");
		nav.classList.remove("active");
		overlay.classList.remove("active");
		body.classList.remove("lock");
	};

	const toggleMenu = () => {
		burger.classList.toggle("active");
		nav.classList.toggle("active");
		overlay.classList.toggle("active");
		body.classList.toggle("lock");
	};

	const animateOnScroll = () => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const element = entry.target;

						// Добавляем классы для анимации
						element.classList.add("active");

						// Добавляем класс задержки, если указан data-атрибут
						const delay = element.dataset.delay;
						if (delay) {
							element.classList.add(delay);
						}

						// Прекращаем наблюдение после активации
						observer.unobserve(element);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "0px 0px -50px 0px",
			}
		);

		// Наблюдаем за всеми элементами с анимацией
		document.querySelectorAll(".fade-in-left, .fade-in-down").forEach((el) => {
			observer.observe(el);
		});
	};

	const init = () => {
		updateHeroImageHeight();
		recolorHeader();
		initSmoothScroll();
		animateOnScroll();
	};

	burger?.addEventListener("click", toggleMenu);
	overlay?.addEventListener("click", closeMenu);
	window.addEventListener("resize", updateHeroImageHeight);
	window.addEventListener("scroll", recolorHeader);

	init();
});
