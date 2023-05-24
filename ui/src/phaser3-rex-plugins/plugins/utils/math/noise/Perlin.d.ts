export default class Noise {
    constructor(seed?: number);

    perlin2(x: number, y: number): number;
    perlin3(x: number, y: number, z: number): number;

    simplex2(x: number, y: number): number;
    simplex3(x: number, y: number, z: number): number;

    setSeed(seed: number): this;
}