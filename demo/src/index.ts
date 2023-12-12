import { ParticleView } from './particle-view';
import { TestParticleManager } from './test-particle-manager';

interface Point { x: number; y: number; }

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let lastFrame = performance.now();
let age = 0;

const PARTICLES = new Set<ParticleView>();
const particles = new TestParticleManager(PARTICLES);

// Simple emitter
const sparkEmitter = particles.testParticles.emitter<Point>((options, params) => {
    options.x = params.x;
    options.deltaX = random(-20, 20);

    options.y = params.y;
    options.deltaY = random(-20, 20);

    options.size = random(2, 4);
    options.deltaSize = random(2, 4);

    options.alpha = 1;
    options.deltaAlpha = -options.alpha;

    options.duration = random(0.5, 1);

    options.color = 0xffff00;
});

// Continuous emitter
const continuousEmitterParams = {x: 0, y: 0};
const continuousEmitter = particles.testParticles.emitter<Point>((options, params) => {
    options.x = params.x;
    options.deltaX = random(-20, 20);

    options.y = params.y;
    options.deltaY = random(-20, 20);

    options.size = random(2, 5);
    options.deltaSize = random(5, 10);

    options.alpha = 1;
    options.deltaAlpha = -options.alpha;

    options.duration = random(1, 2);

    options.color = 0xffffff;
}).continuous(1 / 200, continuousEmitterParams);

function update(elapsed: number) {
    // Update continuous emitter
    continuousEmitterParams.x = canvas.width / 2 + Math.cos(age * Math.PI * 2) * 100;
    continuousEmitterParams.y = canvas.height / 2 + Math.sin(age * Math.PI * 2) * 100;
    continuousEmitter.emit = true;
    continuousEmitter.cycle(elapsed);

    // Update all particles
    particles.update(elapsed);
}

function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const { x, y, size, alpha, color } of PARTICLES) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    }
}

function frame() {
    const now = performance.now();
    const elapsed = (now - lastFrame) / 1000;
    lastFrame = now;
    age += elapsed;

    update(elapsed);
    render();

    requestAnimationFrame(frame);
}

function random(min: number, max: number): number {
    return (max - min) * Math.random() + min;
}

window.addEventListener('load', async () => {
    canvas = document.querySelector('canvas') as HTMLCanvasElement;
    canvas.width = 400;
    canvas.height = 400;

    ctx = canvas.getContext('2d')!;

    document.querySelector('#emit')!.addEventListener('click', () => {
        const params = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        };
        for (let i = 0 ; i < 10 ; i++) {
            sparkEmitter.emit(params);
        }
    }, false);

    frame();
});
