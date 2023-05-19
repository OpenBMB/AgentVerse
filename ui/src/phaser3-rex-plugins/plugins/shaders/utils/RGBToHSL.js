const frag = `\
vec3 RGBToHSL(vec3 color) {
  vec3 hsl = vec3(0.0, 0.0, 0.0);
	
  float fmin = min(min(color.r, color.g), color.b);
  float fmax = max(max(color.r, color.g), color.b);
  float delta = fmax - fmin;

  hsl.z = (fmax + fmin) / 2.0;

  if (delta == 0.0) {
		hsl.x = 0.0;
		hsl.y = 0.0;
	} else {
		if (hsl.z < 0.5) {
			hsl.y = delta / (fmax + fmin);
    } else {
      hsl.y = delta / (2.0 - fmax - fmin);
    }
		
		float dR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
		float dG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
		float dB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

		if (color.r == fmax) {
			hsl.x = dB - dG;
    } else if (color.g == fmax) {
			hsl.x = (1.0 / 3.0) + dR - dB;
		} else if (color.b == fmax) {
      hsl.x = (2.0 / 3.0) + dG - dR;
    }

		if (hsl.x < 0.0) {
			hsl.x += 1.0;
    } else if (hsl.x > 1.0) {
      hsl.x -= 1.0;
    }
	}

	return hsl;
}
`;
export default frag;