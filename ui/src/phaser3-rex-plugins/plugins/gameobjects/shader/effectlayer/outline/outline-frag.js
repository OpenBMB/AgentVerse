// Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

const frag = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D iChannel0; 
varying vec2 fragCoord;
uniform vec2 resolution;

// Effect parameters
uniform bool knockout;
uniform vec2 thickness;
uniform vec3 outlineColor; // (0, 0, 0);

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

void main() {
  vec2 uv = fragCoord / resolution;
  if ((thickness.x > 0.0) || (thickness.y > 0.0)) {
    vec4 front = texture2D(iChannel0, uv);
    vec2 mag = thickness/resolution;
    vec4 curColor;
    float maxAlpha = 0.;
    vec2 offset;
    for (float angle = 0.; angle <= DOUBLE_PI; angle += #{angleStep}) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = texture2D(iChannel0, uv + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    float resultAlpha = max(maxAlpha, front.a);
    vec4 resultColor = vec4((front.rgb + (outlineColor.rgb * (1. - front.a) * resultAlpha)), resultAlpha);

    if (knockout && (resultColor == front)) {
      gl_FragColor = vec4(0);
    } else {
      gl_FragColor = resultColor;
    }

  } else {
    if (knockout) {
      gl_FragColor = vec4(0);
    } else {
      gl_FragColor = texture2D(iChannel0, uv);
    }

  }

}`;


const MAX_SAMPLES = 100;
const MIN_SAMPLES = 1;
export function GetFrag({ quality = 0.1 }) {
  var samples = Math.max((quality * MAX_SAMPLES), MIN_SAMPLES);
  var angleStep = (Math.PI * 2 / samples).toFixed(7);
  return frag.replace(/\#\{angleStep\}/, angleStep);
}