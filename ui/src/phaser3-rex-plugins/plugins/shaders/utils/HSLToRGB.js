
import HUEToRGB from './HUEToRGB.js';
const frag = HUEToRGB + 
`\
vec3 HSLToRGB(vec3 hsl) {
	vec3 rgb = vec3(hsl.z);
	
	if (hsl.y != 0.0) {
		float f2;
		
		if (hsl.z < 0.5) {
		  f2 = hsl.z * (1.0 + hsl.y);
    } else {
      f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
    }
			
		float f1 = 2.0 * hsl.z - f2;
		
		rgb.r = HUEToRGB(f1, f2, hsl.x + (1.0 / 3.0));
		rgb.g = HUEToRGB(f1, f2, hsl.x);
		rgb.b = HUEToRGB(f1, f2, hsl.x - (1.0 / 3.0));
  }
  
  return rgb;
}
`;
export default frag;