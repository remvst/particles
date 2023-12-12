import ParticleEmitter from './particle-emitter';

const MIN_INTERVAL = 0.01;

export default class ContinuousParticleEmitter<ParametersType> {

    private age: number = 0;
    private nextParticle: number = 0;

    emit: boolean = true;

    constructor(
        private readonly emitter: ParticleEmitter<any, ParametersType>,
        private readonly parameters: ParametersType,
        public interval: number,
    ) {
    }

    cycle(elapsed: number) {
        this.age += elapsed;
        this.nextParticle = Math.min(this.nextParticle, this.age + this.interval);

        if (this.emit) {
            while (this.nextParticle <= this.age) {
                this.nextParticle += Math.max(MIN_INTERVAL, this.interval);
                this.emitter.emit(this.parameters);
            }
        } else {
            this.nextParticle = this.age;
        }
    }

}
