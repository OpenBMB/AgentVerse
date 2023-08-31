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
uniform float shrinkMode;
uniform vec2 texSize;
uniform vec2 center;
uniform float radius;
uniform float power;
uniform float intensity;

void main (void) {
  vec2 tc = outTexCoord * texSize;  
  tc -= center;
  float dist = length(tc) / radius;
  float factor = pow(dist, power);
  if (shrinkMode > 0.0) {
    factor = 1.0 / factor;
  }

  tc *= mix(1.0, factor, intensity);
  tc += center;
  gl_FragColor = texture2D(uMainSampler, tc / texSize);

}
`;

export default frag;