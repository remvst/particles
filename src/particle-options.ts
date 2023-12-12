import { Easing } from "@remvst/animate.js";

export interface ParticleOptions {
    duration: number;
    resetToDefault(): void;
    copy(other: ThisType<this>): void;
}

export class ParticleOptions2D implements ParticleOptions {
    layerId: string;

    x: number;
    deltaX: number;
    easingX: (t: number) => number;

    y: number;
    deltaY: number;
    easingY: (t: number) => number;

    size: number;
    deltaSize: number;

    rotation: number;
    deltaRotation: number;

    alpha: number;
    deltaAlpha: number;

    color: number;

    duration: number;

    constructor() {
        this.resetToDefault();
    }

    resetToDefault() {
        this.layerId = '';

        this.x = 0;
        this.deltaX = 0;
        this.easingX = Easing.linear;

        this.y = 0;
        this.deltaY = 0;
        this.easingY = Easing.linear;

        this.size = 1;
        this.deltaSize = 0;

        this.rotation = 0;
        this.deltaRotation = 0;

        this.alpha = 1;
        this.deltaAlpha = -1;

        this.color = 0xffffff;

        this.duration = 0;
    }

    copy(otherOptions: ParticleOptions2D) {
        this.layerId = otherOptions.layerId;

        this.x = otherOptions.x;
        this.deltaX = otherOptions.deltaX;
        this.easingX = otherOptions.easingX;

        this.y = otherOptions.y;
        this.deltaY = otherOptions.deltaY;
        this.easingY = otherOptions.easingY;

        this.size = otherOptions.size;
        this.deltaSize = otherOptions.deltaSize;

        this.rotation = otherOptions.rotation;
        this.deltaRotation = otherOptions.deltaRotation;

        this.alpha = otherOptions.alpha;
        this.deltaAlpha = otherOptions.deltaAlpha;

        this.color = otherOptions.color;

        this.duration = otherOptions.duration;
    }
};
