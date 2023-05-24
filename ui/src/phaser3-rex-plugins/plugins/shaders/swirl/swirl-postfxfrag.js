// reference : https://www.geeks3d.com/20110428/shader-library-swirl-post-processing-filter-in-glsl/

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
uniform vec2 center;
uniform float radius;
uniform float angle;

void main (void) {
  vec2 tc = outTexCoord * texSize;
  tc -= center;
  float dist = length(tc);
  if (dist < radius) {
    float percent = (radius - dist) / radius;
    float theta = percent * percent * angle * 8.0;
    float s = sin(theta);
    float c = cos(theta);
    tc = vec2(dot(tc, vec2(c, -s)), dot(tc, vec2(s, c)));
  }
  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);
}
`;

export default frag;