import { Particle } from "./particle";
import { ParticleEmitterProvider } from "./particle-emitter-provider";
import { ParticleOptions } from "./particle-options";

export class ParticlesManager {

    private readonly emitterProviders: ParticleEmitterProvider<any, any>[] = [];

    add<
        ParticleType extends Particle<ParticleViewType, ParticleOptionsType>,
        ParticleViewType = any,
        ParticleOptionsType extends ParticleOptions = any,
    >(
        emitterProvider: ParticleEmitterProvider<ParticleType, ParticleViewType, ParticleOptionsType>,
    ): ParticleEmitterProvider<ParticleType, ParticleViewType, ParticleOptionsType> {
        this.emitterProviders.push(emitterProvider);
        return emitterProvider;
    }

    update(elapsed: number) {
        for (const emitterProvider of this.emitterProviders) {
            emitterProvider.update(elapsed);
        }
    }
}
