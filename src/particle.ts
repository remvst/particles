import { ReusablePool, ReusablePoolBindable } from '@remvst/optimization';
import { ParticleOptions } from './particle-options';

export default abstract class Particle<ViewType, OptionType extends ParticleOptions> implements ReusablePoolBindable {

    protected view: ViewType | null = null;
    protected currentTime: number = 0;

    pool: ReusablePool<any>;

    get isDone() {
        return this.currentTime >= this.options.duration;
    }

    getOrCreateView(): ViewType {
        if (!this.view) {
            this.view = this.createView();
        }
        return this.view;
    }

    protected abstract get options(): OptionType;

    abstract install(): void;

    abstract uninstall(): void;

    protected abstract createView(): ViewType

    protected interpolated(fromValue: number, deltaValue: number, easing: (t: number) => number) {
        const progress = this.currentTime / this.options.duration;
        return easing(progress) * deltaValue + fromValue;
    }

    cycle(elapsed: number) {
        this.currentTime = Math.min(this.options.duration, this.currentTime + elapsed);
    }

    setup(options: ParticleOptions) {
        this.options.copy(options);
        this.currentTime = 0;
    }
};
