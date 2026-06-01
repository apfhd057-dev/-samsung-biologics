window.addEventListener("load", function(){

    const startScrollY = 1100;
    const endScrollY = 2600;

    let currentIndex = 0;
    let isAnimating = false;

    function updateNavigation() {
        navItems.forEach((nav, index) => {
            nav.classList.toggle("active", index === currentIndex);
        });
    }

    navItems.forEach((button) => {

        button.addEventListener("click", function () {

            if (isAnimating) return;

            currentIndex = Number(this.dataset.index);
            
            const moveX = currentIndex * itemWidth;

            horizontal.style.transition =
            "transform 0.6s ease";

            horizontal.style.transform =
            `translateX(-${moveX}px)`;

            updateNavigation();

            window.scrollTo({
                top: startScrollY,
                behavior: "smooth"
            });

        });

    }); 
});

  