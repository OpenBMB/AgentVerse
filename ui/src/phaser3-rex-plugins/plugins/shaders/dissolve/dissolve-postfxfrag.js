// https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs

import Perlin from '../utils/noise/Perlin.js';

const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;
// Scene buffer
uniform sampler2D uMainSampler;
uniform sampler2D uMainSampler2;

uniform int resizeMode;
uniform float progress;
uniform float fromRatio;
uniform float toRatio;
varying vec2 outFragCoord;
// Effect parameters
uniform float noiseX;
uniform float noiseY;
uniform float noiseZ;
uniform float fromEdgeStart;
uniform float fromEdgeWidth;
uniform float toEdgeStart;
uniform float toEdgeWidth;

${Perlin}

vec4 getFromColor (vec2 uv) {
  return texture2D(uMainSampler, uv);
}

vec4 getToColor (vec2 uv) {
  if (resizeMode == 2) {
    //  cover
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(min(fromRatio / toRatio, 1.0), min((toRatio / fromRatio), 1.0)));
  } else if (resizeMode == 1) {
    //  contain
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(max(fromRatio / toRatio, 1.0), max((toRatio / fromRatio), 1.0)));
  } else {
    //  stretch
    return texture2D(uMainSampler2, vec2(uv.x, 1.0 - uv.y));
  }
}

vec4 transition (vec2 uv) {    
  vec4 colorFront = getFromColor(uv);
  vec4 colorTo = getToColor(uv);

  float noise = (Perlin(vec3(uv.x * noiseX, uv.y * noiseY, noiseZ)) + 1.0) / 2.0
    * (1.0 - (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth))
    + (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth) * 0.5;
  vec4 colorResult = colorFront * smoothstep(progress - (fromEdgeStart + fromEdgeWidth), progress - fromEdgeStart, noise)
    + colorTo * smoothstep((1.0 - progress) - (toEdgeStart + toEdgeWidth), (1.0 - progress) - toEdgeStart, (1.0 - noise));
  return colorResult;
}

void main () {
  vec2 uv = outFragCoord;
  gl_FragColor = transition(uv);
}
`;

export default frag;