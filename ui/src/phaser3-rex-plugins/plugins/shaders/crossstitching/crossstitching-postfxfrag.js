// reference : https://www.geeks3d.com/20110408/cross-stitching-post-processing-shader-glsl-filter-geexlab-pixel-bender/

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
uniform vec2 stitchingSize;
uniform float brightness;

void main (void) {
  vec2 cPos = outTexCoord * texSize;
  int remX = int(mod(cPos.x, stitchingSize.x));
  int remY = int(mod(cPos.y, stitchingSize.y));
  vec2 tlPos;
  if (remX == 0 && remY == 0) {
    tlPos = cPos;
  } else {
    tlPos = floor(cPos / stitchingSize);
    tlPos.x = tlPos.x * stitchingSize.x;
    tlPos.y = tlPos.y * stitchingSize.y;
  }
  vec2 blPos = tlPos;
  blPos.y += (stitchingSize.y - 1.0);

  vec4 color0, color1;
  if (
    (remX == remY) || 
    (((int(cPos.x) - int(blPos.x)) == (int(blPos.y) - int(cPos.y))))
  ) {
    color0 = texture2D(uMainSampler, tlPos * vec2(1.0/texSize.x, 1.0/texSize.y)) * 1.4;
    color1 = vec4(0.2, 0.15, 0.05, 1.0);
  } else {
    color0 = vec4(0.0, 0.0, 0.0, 1.0);
    color1 = texture2D(uMainSampler, tlPos * vec2(1.0/texSize.x, 1.0/texSize.y)) * 1.4;    
  }
  gl_FragColor = mix(color0, color1, brightness);
}
`;

export default frag;