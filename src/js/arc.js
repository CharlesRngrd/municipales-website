document.addEventListener("DOMContentLoaded", () => {
    const imageRadius = 100;
    const padding1 = 5;
    const padding2 = 5;
    const borderWidth1 = 5;
    const borderWidth2 = 8;
    const arcLength1 = (2 / 3) * Math.PI * 2;
    const arcLength2 = (3 / 5) * Math.PI * 2;

    class ArcCircle {
        constructor(wrapper) {
            this.wrapper = wrapper;
            this.canvas = wrapper.querySelector('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.img = wrapper.querySelector('img');
            this.radius = parseInt(wrapper.dataset.radius || 100);

            // Compute total size
            this.maxRadius = this.radius + padding1 + borderWidth1 + padding2 + borderWidth2;
            this.size = this.maxRadius * 2 + 2;
            this.center = this.size / 2;

            // Resize DOM elements
            this.canvas.width = this.size;
            this.canvas.height = this.size;
            this.wrapper.style.width = this.size + 'px';
            this.wrapper.style.height = this.size + 'px';
            this.img.style.width = this.radius * 2 + 'px';
            this.img.style.height = this.radius * 2 + 'px';

            // Randomize arc positions
            this.baseAngle1 = Math.random() * 2 * Math.PI;
            this.baseAngle2 = Math.random() * 2 * Math.PI;
        }

        draw(scrollY) {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const rot1 = this.baseAngle1 + scrollY * 0.005;
            const rot2 = this.baseAngle2 - scrollY * 0.005;

            // First border (pink)
            ctx.beginPath();
            ctx.arc(this.center, this.center, imageRadius + padding1 + borderWidth1 / 2, rot1, rot1 + arcLength1);
            ctx.strokeStyle = '#C00F26';
            ctx.lineWidth = borderWidth1;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Second border (blue)
            ctx.beginPath();
            ctx.arc(this.center, this.center, imageRadius + padding1 + borderWidth1 + padding2 + borderWidth2 / 2, rot2, rot2 + arcLength2);
            ctx.strokeStyle = '#064473';
            ctx.lineWidth = borderWidth2;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    // Create all arc-circle instances
    const circles = Array.from(document.querySelectorAll('.circle-wrapper')).map(el => new ArcCircle(el));

    function drawAll() {
        const scrollY = window.scrollY;
        circles.forEach(c => c.draw(scrollY));
    }

    // Initial draw + scroll update
    drawAll();
    window.addEventListener('scroll', drawAll);
});