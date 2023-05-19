// Reference: https://github.com/pixijs/filters/blob/main/filters/glow/src/glow.frag

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
uniform float outerStrength;
uniform float innerStrength;
uniform vec4 glowColor; // (0, 0, 0);
uniform float knockout;

// const
const float PI = 3.14159265358979323846264;

const float DIST = __DIST__;
const float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);
const float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);

const float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;


void main(void) {
  vec2 px = vec2(1./texSize.x, 1./texSize.y);

  float totalAlpha = 0.0;

  vec2 direction;
  vec2 offset;
  vec4 curColor;

  for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {
     direction = vec2(cos(angle), sin(angle)) * px;

     for (float curDistance = 0.0; curDistance < DIST; curDistance++) {
         offset = direction * (curDistance + 1.0);
         curColor = texture2D(uMainSampler, outTexCoord + offset);
         totalAlpha += (DIST - curDistance) * curColor.a;
     }
  }
  
  curColor = texture2D(uMainSampler, outTexCoord);

  float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);

  float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;
  float innerGlowStrength = min(1.0, innerGlowAlpha);
  
  vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);

  float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);
  float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);

  vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;
  
  if (knockout > 0.) {
    float resultAlpha = outerGlowAlpha + innerGlowAlpha;
    gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);
  }
  else {
    gl_FragColor = innerColor + outerGlowColor;
  }
}
`;

const GetValue = Phaser.Utils.Objects.GetValue;
var GetFrag = function (config) {
    var quality = GetValue(config, 'quality', 0, 1);
    var distance = GetValue(config, 'distance', 10);
    return frag
        .replace(/__ANGLE_STEP_SIZE__/gi, `${(1 / quality / distance).toFixed(7)}`)
        .replace(/__DIST__/gi, `${Math.round(distance).toFixed(0)}.0`);
}


export default GetFrag;