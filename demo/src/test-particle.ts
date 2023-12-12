import { Particle, ParticleOptions2D } from "@remvst/particles";
import { ParticleView } from "./particle-view";

export class TestParticle extends Particle<ParticleView, ParticleOptions2D> {

    options = new ParticleOptions2D();

    constructor(private readonly particles: Set<ParticleView>) {
        super();
    }

    install(): void {
        this.particles.add(this.getOrCreateView());
    }

    uninstall(): void {
        const { view } = this;
        if (view) this.particles.delete(view);
    }

    protected createView(): ParticleView {
        return { x: 0, y: 0, size: 0, alpha: 0, color: '', }
    }

    updateView(view: ParticleView): void {
        view.x = this.interpolated(this.options.x, this.options.deltaX, this.options.easingX);
        view.y = this.interpolated(this.options.y, this.options.deltaY, this.options.easingY);
        view.alpha = this.interpolated(this.options.alpha, this.options.deltaAlpha, (t) => t);
        view.size = this.interpolated(this.options.size, this.options.deltaSize, (t) => t);
        view.color = '#' + Math.floor(this.options.color).toString(16).padStart(6, '0');
    }
}
