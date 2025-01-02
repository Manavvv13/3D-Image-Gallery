gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
    const gallery = document.querySelector(".gallery");
    const previewImage = document.querySelector(".preview-img img");

    for (let i = 1; i <= 111; i++) {
        const item = document.createElement("div");
        item.className = "item";
        const img = document.createElement("img");
        img.src = `./assets/img1%20(${i}).jpg`;
        img.loading = "lazy";
        item.appendChild(img);
        gallery.appendChild(item);
    }

    const items = document.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    items.forEach((item, index) => {
        gsap.set(item, {
            rotationY: 90,
            rotationZ: index * angleIncrement - 90,
            transformOrigin: "50% 400px",
        });
    });

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        markers: true,
        onUpdate: (self) => {
            const rotationProgress = self.progress * 360;
            items.forEach((item, index) => {
                const currentAngle = index * angleIncrement - 90 + rotationProgress;
                gsap.to(item, {
                    rotationZ: currentAngle,
                    duration: 0.5,
                    ease: "power3.out",
                });
            });
        },
    });
};
