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
uniform vec2 split;
uniform float spaceLeft;
uniform float spaceRight;
uniform float spaceTop;
uniform float spaceBottom;
uniform float angle;
uniform float shiftEnable;

vec2 rotate(vec2 uv, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(
    uv.x * c + uv.y * s,
    uv.y * c - uv.x * s
  );
}

void main (void) {
  vec2 tc = outTexCoord * texSize;  
  tc -= split;
  tc = rotate(tc, -angle);

  if (
    ((tc.x > -spaceLeft) && (tc.x < spaceRight)) ||
    ((tc.y > -spaceTop) && (tc.y < spaceBottom))
  ) {
    gl_FragColor = vec4(0,0,0,0);
  } else {
    if (shiftEnable > 0.0) {
      tc.x += (tc.x < 0.0)? spaceLeft: -spaceRight;
      tc.y += (tc.y < 0.0)? spaceTop: -spaceBottom;
    }

    tc = rotate(tc, angle);
    tc += split;
    gl_FragColor = texture2D(uMainSampler, tc / texSize);
  }

}
`;

export default frag;