const frag = `\
float AvgRGB(vec4 color) {
  return (color.r + color.g + color.b)/3.0;
}
`;
export default frag;