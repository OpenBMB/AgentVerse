const frag = `\
vec3 HSVToRGB(float h, float s, float v) {
  int i;
  float f, p, q, t;
  vec3 res;
  if( s == 0.0 ) {
    // achromatic (grey)
    res.x = v;
    res.y = v;
    res.z = v;
    return res;
  }

  h /= 60.0;         // sector 0 to 5
  i = int(floor( h ));
  f = h - float(i);         // factorial part of h
  p = v * ( 1.0 - s );
  q = v * ( 1.0 - s * f );
  t = v * ( 1.0 - s * ( 1.0 - f ) );  
  if (i == 0) {
    res.x = v;
    res.y = t;
    res.z = p;
  } else if (i == 1) {
    res.x = q;
    res.y = v;
    res.z = p;
  } else if (i == 2) {
    res.x = p;
    res.y = v;
    res.z = t;
  } else if (i == 3) {
    res.x = p;
    res.y = q;
    res.z = v;
  } else if (i == 4) {
    res.x = t;
    res.y = p;
    res.z = v;
  } else { // i == 5
    res.x = v;
    res.y = p;
    res.z = q;
  }
  return res;
}
`;
export default frag;