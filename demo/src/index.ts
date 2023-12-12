window.addEventListener('load', async () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d')!;

    function frame() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(frame);
    }

    frame();
});
