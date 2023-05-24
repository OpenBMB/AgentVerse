import RGBToHSV from '../utils/RGBToHSV.js';
import HSVToRGB from '../utils/HSVToRGB.js';
import IsEdge from '../utils/IsEdge.js';

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
uniform vec2 texSize;

// Effect parameters
uniform float edgeThreshold; // 0.2;
uniform float hStep;  // 60
uniform float sStep;  // 0.15
uniform float vStep;  // 0.33
uniform vec3 edgeColor; // (0, 0, 0);
`
+ RGBToHSV + IsEdge + HSVToRGB +
`
void main() {
  vec4 front = texture2D(uMainSampler, outTexCoord);  
  vec3 colorLevel;
  if ((hStep > 0.0) || (sStep > 0.0) || (vStep > 0.0)) {
    vec3 colorHsv = RGBToHSV(front.rgb);  
    if (hStep > 0.0) {
      colorHsv.x = min(floor((colorHsv.x / hStep) + 0.5) * hStep, 360.0);
    }
    if (sStep > 0.0) {
      colorHsv.y = min(floor((colorHsv.y / sStep) + 0.5) * sStep, 1.0);
    }
    if (vStep > 0.0) {
      colorHsv.z = min(floor((colorHsv.z / vStep) + 0.5) * vStep, 1.0);
    }
    colorLevel = HSVToRGB(colorHsv.x, colorHsv.y, colorHsv.z);
  } else {
    colorLevel = front.rgb;
  }

  vec3 outColor = (IsEdge(outTexCoord, texSize, edgeThreshold))? edgeColor : colorLevel;
  gl_FragColor = vec4(outColor, front.a);
}
`;

export default frag;