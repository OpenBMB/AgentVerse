const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

uniform float time;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
#define SAMPLES 32.

// Bloom
uniform float bloomEnable;
uniform vec3 bloom;
uniform vec2 bloomTexel;

// Chromatic abberation
uniform float chromaticEnable;
uniform float chabIntensity;

// Vignette
uniform float vignetteEnable;
uniform vec2 vignette;

// Noise
uniform float noiseEnable;
uniform float noiseStrength;
uniform float noiseSeed;

// VHS
uniform float vhsEnable;
uniform float vhsStrength;

// Scanlines
uniform float scanlinesEnable;
uniform float scanStrength;

// CRT
uniform float crtEnable;
uniform vec2 crtSize;


// Noise
float noise(vec2 uv) {
  return fract(sin(uv.x*12.9898+uv.y*78.233)*437.585453*noiseSeed);
}

// VHS
vec4 vhs(vec2 uv) {
  vec2 tcoord = uv;
  tcoord.x += sin(time*noise(uv));
  return texture2D( uMainSampler, tcoord)*vhsStrength;	
}

// Vignette
float vig(vec2 uv) {
  uv *= 1. - uv;
  return ( pow(uv.x*uv.y*vignette.x*10.,vignette.y) );
}

// Chromatic abberation
vec3 chromatic(vec2 uv, float offset) {
  float r = texture2D( uMainSampler, vec2(uv.x+offset, uv.y)).r;
  float g = texture2D( uMainSampler, uv).g;
  float b = texture2D( uMainSampler, vec2(uv.x-offset, uv.y)).b;
  return vec3(r,g,b);
}

// Bloom
vec4 blur(vec2 uv) {
  float total = 0.;
  float rad = 1.;
  mat2 ang = mat2(.73736882209777832,-.67549037933349609,.67549037933349609,.73736882209777832);
  vec2 point = normalize(fract(cos(uv*mat2(195,174,286,183))*742.)-.5)*(bloom.x/sqrt(SAMPLES));
  vec4 amount = vec4(0);
	
  for ( float i=0.; i<SAMPLES; i++ ) {
    point*=ang;
    rad+=1./rad;
    vec4 samp = texture2D(uMainSampler, uv + point * (rad-1.) * bloomTexel);
    
    float mul = 1.;
    float lum = ( samp.r+samp.g+samp.b )/3.;
    if ( lum < bloom.z ){ mul = 0.; }
    
    amount += samp*(1./rad)*mul;
    total+=(1./rad);
  }
  amount /= total;
  return amount*bloom.y;
}

// TV Curve
vec2 crtCurve( vec2 uv ) {
  uv = uv*2.-1.;
  vec2 uvoff = abs(uv.xy) / crtSize;
  uv = uv + uv * uvoff * uvoff;
  uv = uv * .5 + .5;
  return uv;
}

void main() {	
  vec2 mainUv = outTexCoord;

  // CRT
  if ( crtEnable > .5 ) {
    mainUv = crtCurve(outTexCoord);
  }
	
  // Base coloring
  vec4 color = texture2D( uMainSampler, mainUv);
	
  // Chromatic abberation
  if ( chromaticEnable > .5 ) {
    color.rgb *= chromatic(mainUv, chabIntensity * 0.01);
  }
	
  // Scanlines
  if ( scanlinesEnable > .5 ) {
    color.rgb *= (1.-scanStrength)+(sin(mainUv.y*1024.)*scanStrength);
  }

  // Bloom
  if ( bloomEnable > .5 ) {
    color.rgb += blur(mainUv).rgb;
  }
	
  // Noise
  if ( noiseEnable > .5 ) {
    color.rgb += noise(mainUv)*noiseStrength;
  }
	
  // VHS
  if ( vhsEnable > .5 ) {
    color += vhs(mainUv);
  }
	
  // Vignette
  if ( vignetteEnable > .5) {
    color.rgb *= vig(mainUv);
  }
	
  // Cutoff edges
  if ( crtEnable > .5) {
    if ( (mainUv.x < 0.)|| (mainUv.y < 0.) || (mainUv.x > 1.)|| (mainUv.y > 1.) ) {
      color.rgb *= 0.;
    }
  }
	
  gl_FragColor = color;
}
`;

export default frag;