const frag = `\
float HUEToRGB(float f1, float f2, float hue) {
  if (hue < 0.0) {
    hue += 1.0;
  } else if (hue > 1.0) {
    hue -= 1.0;
  }
   	
  float ret;
	
	if ((6.0 * hue) < 1.0) {
		ret = f1 + (f2 - f1) * 6.0 * hue;
  } else if ((2.0 * hue) < 1.0) {
		ret = f2;
	} else if ((3.0 * hue) < 2.0) {
		ret = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
  } else {
      ret = f1;
  }
	
  return ret;
}
`;
export default frag;