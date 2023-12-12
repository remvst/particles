import { ParticleEmitterProvider, ParticleOptions2D, ParticlesManager } from "@remvst/particles";
import { TestParticle } from "./test-particle";
import { ParticleView } from "./particle-view";

export class TestParticleManager extends ParticlesManager {

    constructor(private readonly particles: Set<ParticleView>) {
        super();
    }

    readonly testParticles = this.add(new ParticleEmitterProvider(
        () => new TestParticle(this.particles),
        () => new ParticleOptions2D(),
        (options) => true,
    ));
}
