import AvgRGB from './AvgRGB.js';

const frag = 
AvgRGB + 
`\
#define EDGEGAIN 5.0
bool IsEdge(vec2 coords, vec2 texSize, float threshold) {
  if (threshold > 1.0) {
    return false;
  }

  vec2 tc = coords * texSize;
  
  float pixel[9];
  int k = 0;
  float delta;

  // read neighboring pixel intensities
  pixel[0] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float(-1))) / texSize )  );
  pixel[1] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 0))) / texSize )  );
  pixel[2] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float(-1), float( 1))) / texSize )  );
  pixel[3] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float(-1))) / texSize )  );
  pixel[4] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 0))) / texSize )  );
  pixel[5] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 0), float( 1))) / texSize )  );
  pixel[6] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float(-1))) / texSize )  );
  pixel[7] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 0))) / texSize )  );
  pixel[8] = AvgRGB( texture2D( uMainSampler, (tc + vec2(float( 1), float( 1))) / texSize )  );

  // average color differences around neighboring pixels
  delta = (abs(pixel[1]-pixel[7])+
           abs(pixel[5]-pixel[3]) +
           abs(pixel[0]-pixel[8])+
           abs(pixel[2]-pixel[6])
           )/4.0;

  return (clamp(delta*EDGEGAIN, 0.0, 1.0) >= threshold);
}
`;
export default frag;