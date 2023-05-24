import RGBToHSL from '../utils/RGBToHSL.js';
import HSLToRGB from '../utils/HSLToRGB.js';

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
uniform float hueRotate;
uniform float satAdjust;
uniform float lumAdjust;
`
+ RGBToHSL + HSLToRGB + 
`\
void main(void) {
	vec4 front = texture2D(uMainSampler, outTexCoord);
	vec3 hsl = RGBToHSL(front.rgb);
	hsl.x -= hueRotate;
	hsl.y *= satAdjust;
	hsl.z += (lumAdjust - 0.5) * front.a;
	vec3 rgb = HSLToRGB(hsl);
	gl_FragColor = vec4(rgb, front.a);
}
`;

export default frag;