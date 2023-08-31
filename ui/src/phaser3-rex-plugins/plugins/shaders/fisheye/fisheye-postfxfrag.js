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
uniform float mode;
uniform vec2 texSize;
uniform vec2 center;
uniform float radius;
uniform float intensity;

void main (void) {
  vec2 tc = outTexCoord * texSize;  
  tc -= center;
  float dist = length(tc) / radius;
  if (dist < 1.0) {
    float factor;
    if (mode > 0.0) {
      factor = sin(dist * 1.570795);
    } else {
      factor = asin(dist) / 1.570795;
    }
    tc *= mix(1.0, factor, intensity);
  }

  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);

}
`;

export default frag;