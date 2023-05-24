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
uniform float epsilon;
uniform vec3 originalColor;
uniform vec3 newColor;

void main (void) {
  vec4 currentColor = texture2D(uMainSampler, outTexCoord);
  vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));
  float colorDistance = length(colorDiff);
  float doReplace = step(colorDistance, epsilon);
  gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);
}
`;

export default frag;