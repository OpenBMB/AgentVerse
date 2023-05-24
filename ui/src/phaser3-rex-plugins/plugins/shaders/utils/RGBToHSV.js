const frag = `\
vec3 RGBToHSV(vec3 color) {
  float minv, maxv, delta;
  vec3 res;
  minv = min(min(color.r, color.g), color.b);
  maxv = max(max(color.r, color.g), color.b);
  res.z = maxv;            // v

  delta = maxv - minv;
  if( maxv != 0.0 ) {
    res.y = delta / maxv;      // s
  } else {
    // s = 0, v is undefined
    res.y = 0.0;
    res.x = -1.0;
    return res;
  }

  if( color.r == maxv ) {
    res.x = ( color.g - color.b ) / delta;      // between yellow & magenta
  } else if( color.g == maxv ) {
    res.x = 2.0 + ( color.b - color.r ) / delta;   // between cyan & yellow
  } else {
    res.x = 4.0 + ( color.r - color.g ) / delta;   // between magenta & cyan
  }

  res.x = res.x * 60.0;            // degrees
  if( res.x < 0.0 ) {
    res.x = res.x + 360.0;
  }
   
  return res;
}
`;

export default frag;