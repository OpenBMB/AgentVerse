// reference : https://www.geeks3d.com/20101029/shader-library-pixelation-post-processing-effect-glsl/

const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 texSize;
uniform vec2 amplitude;
uniform vec2 frequency;
uniform vec2 speed;
uniform float time;


void main (void) {
  vec2 dxy = frequency/texSize;
  vec2 r = amplitude/texSize;
  vec2 spd = speed/texSize;
  vec2 angle = (outTexCoord / dxy) + (spd*time);
  vec2 tc = (vec2(cos(angle.x),sin(angle.y)) * r) + outTexCoord;
  gl_FragColor = texture2D(uMainSampler, tc);
}
`;

export default frag;