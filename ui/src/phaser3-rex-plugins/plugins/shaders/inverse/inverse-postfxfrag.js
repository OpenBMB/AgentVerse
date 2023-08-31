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
uniform float intensity;

void main (void) {
  vec4 front = texture2D(uMainSampler, outTexCoord);
  vec3 inverse = vec3(front.a - front.rgb);
  gl_FragColor = vec4(mix(front.rgb, inverse, intensity), front.a);
}
`;

export default frag;