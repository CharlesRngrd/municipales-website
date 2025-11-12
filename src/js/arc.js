document.addEventListener("DOMContentLoaded", () => {
    const imageRadius = 100;
    const padding1 = 5;
    const padding2 = 5;
    const borderWidth1 = 5;
    const borderWidth2 = 8;
    const arcLength1 = (2 / 3) * Math.PI * 2;
    const arcLength2 = (3 / 5) * Math.PI * 2;

    const maxRadius = imageRadius + padding1 + borderWidth1 + padding2 + borderWidth2;
    const canvasSize = maxRadius * 2 + 2;

    const canvas = document.getElementById('borderCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const wrapper = document.querySelector('.circle-wrapper');
    const img = document.querySelector('.circle-image');

    // Resize wrapper and image accordingly
    wrapper.style.width = canvasSize + 'px';
    wrapper.style.height = canvasSize + 'px';
    img.style.width = imageRadius * 2 + 'px';
    img.style.height = imageRadius * 2 + 'px';

    const center = canvasSize / 2;

    // Store base random start angles
    const baseAngle1 = Math.random() * 2 * Math.PI;
    const baseAngle2 = Math.random() * 2 * Math.PI;

    function drawArcs(scrollY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Convert scroll to radians for rotation
        const rot1 = baseAngle1 + scrollY * 0.005;  // rotate clockwise
        const rot2 = baseAngle2 - scrollY * 0.005;  // rotate counter-clockwise

        // First border (pink)
        ctx.beginPath();
        ctx.arc(center, center, imageRadius + padding1 + borderWidth1 / 2, rot1, rot1 + arcLength1);
        ctx.strokeStyle = '#C00F26';
        ctx.lineWidth = borderWidth1;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Second border (blue)
        ctx.beginPath();
        ctx.arc(center, center, imageRadius + padding1 + borderWidth1 + padding2 + borderWidth2 / 2, rot2, rot2 + arcLength2);
        ctx.strokeStyle = '#064473';
        ctx.lineWidth = borderWidth2;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    // Draw once initially
    drawArcs(window.scrollY);

    // Redraw on scroll
    window.addEventListener('scroll', () => {
        drawArcs(window.scrollY);
    });
});