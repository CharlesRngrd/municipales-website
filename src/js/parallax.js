document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.speed);

        window.addEventListener('scroll', () => {
            const offset = window.scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        })
    })
});
