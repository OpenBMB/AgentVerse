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
uniform vec2 uOffset;

void main (void) {
  vec4 color = vec4(0.0);

  // Sample top left pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y + uOffset.y));

  // Sample top right pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y + uOffset.y));

  // Sample bottom right pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x + uOffset.x, outTexCoord.y - uOffset.y));

  // Sample bottom left pixel
  color += texture2D(uMainSampler, vec2(outTexCoord.x - uOffset.x, outTexCoord.y - uOffset.y));

  // Average
  color *= 0.25;

  gl_FragColor = color;
}
`;

export default frag;