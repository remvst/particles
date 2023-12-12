import Particle from './particle';
import ContinuousParticleEmitter from './continuous-particle-emitter';
import { ReusablePool } from '@remvst/optimization';
import { ParticleOptions } from './particle-options';

export default class ParticleEmitter<
    ParticleType extends Particle<ParticleViewType, ParticleOptionsType>,
    ParametersType,
    ParticleViewType = any,
    ParticleOptionsType extends ParticleOptions = any,
> {

    constructor(
        private readonly pool: ReusablePool<ParticleType>,
        private readonly options: ParticleOptionsType,
        private readonly optionsUpdater: (options: ParticleOptions, parameters: ParametersType) => void,
        private readonly isVisible: (options: ParticleOptions) => boolean,
        private readonly activePool: Set<Particle<ParticleViewType, ParticleOptionsType>>,
    ) {
    }

    emit(parameters: ParametersType) {
        this.options.resetToDefault();
        this.optionsUpdater(this.options, parameters);

        if (!this.isVisible(this.options)) {
            return;
        }

        const particle = this.pool.take();
        this.activePool.add(particle);

        particle.setup(this.options);
        particle.install();
        particle.cycle(0);
    }

    continuous(
        interval: number,
        parameters: ParametersType,
    ): ContinuousParticleEmitter<ParametersType> {
        return new ContinuousParticleEmitter(this, parameters, interval);
    }
};