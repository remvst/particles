import { ReusablePool } from '@remvst/optimization';
import { Particle } from "./particle";
import { ParticleEmitter } from "./particle-emitter";
import { ParticleOptions } from './particle-options';

export class ParticleEmitterProvider<
    ParticleType extends Particle<ParticleViewType, ParticleOptionsType>,
    ParticleViewType = any,
    ParticleOptionsType extends ParticleOptions = any,
> {

    private readonly particlePool = new ReusablePool<ParticleType>(() => this.createParticle());
    private readonly activeParticles = new Set<ParticleType>();

    constructor(
        private readonly createParticle: () => ParticleType,
        private readonly createOptions: () => ParticleOptionsType,
        private readonly isVisible: (options: ParticleOptionsType) => boolean,
    ) {

    }

    emitter<ParametersType>(
        optionsUpdater: (options: ParticleOptionsType, parameters: ParametersType) => void
    ): ParticleEmitter<ParticleType, ParametersType> {
        return new ParticleEmitter(
            this.particlePool,
            this.createOptions(),
            optionsUpdater,
            this.isVisible,
            this.activeParticles,
        );
    }

    update(elapsed: number) {
        for (const particle of this.activeParticles) {
            if (particle.isDone) {
                this.activeParticles.delete(particle);
                particle.uninstall();
            } else {
                particle.cycle(elapsed);
            }
        }
    }
}
