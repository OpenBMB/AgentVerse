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
  float gray = dot(front.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = mix(front, vec4(gray, gray, gray, front.a), intensity);
}
`;

export default frag;