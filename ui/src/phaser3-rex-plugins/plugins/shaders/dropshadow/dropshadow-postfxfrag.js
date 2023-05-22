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
uniform float alpha;
uniform vec3 color;
uniform vec2 offset;

void main (void) {
  vec4 sample = texture2D(uMainSampler, outTexCoord - offset);

  // Premultiply alpha
  sample.rgb = color.rgb * sample.a;

  // alpha user alpha
  sample *= alpha;

  gl_FragColor = sample;
}
`;

export default frag;