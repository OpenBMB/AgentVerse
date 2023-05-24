// Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb

import PerlinNoiseFrag from './Perlin.js';

const frag = `\
${PerlinNoiseFrag}
float Turbulence(vec3 P) {
    float f = 0., s = 1.;
    for (int i = 0 ; i < 9 ; i++) {
        f += abs(Perlin(s * P)) / s;
        s *= 2.;
        P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
    }
    return f;
}`;

export default frag;