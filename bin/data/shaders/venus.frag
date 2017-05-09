#version 120

uniform float u_time = 1.0;
uniform vec2 u_resolution = vec2(1.0, 1.0);

float random(in vec2 _st) {
  return fract(sin(dot(_st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 _st) {
  vec2 i = floor(_st);
  vec2 f = fract(_st);
  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
#define NUM_OCTAVES 5
float fbm(in vec2 _st) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(u_time / 20.0, u_time / 20.0);
  // Rotate to reduce axial bias
  mat2 rot = mat2(cos(-0.196), 1.1, -sin(0.860), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(_st);
    _st = rot * _st * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy * 4.;
  // st += st * abs(sin(u_time*0.1)*3.0);
  vec3 color = vec3(0.0);
  vec2 q = vec2(0.);
  q.x = fbm(st);
  q.y = fbm(st + vec2(1.0));
  vec2 r = vec2(0.);
  r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.4 * 8.);
  r.y = fbm(st + 1.0 * q + vec2(8.100, -1.050) + cos(7.) * 8.);
  float f = fbm(st + r);
  color = mix(vec3(cos(u_time / 6.7) + 0.3, cos(u_time / 4.7) + 0.3,
                   cos(u_time / 3.7) + 0.3),
              vec3(0.860, 0.971, 0.990), clamp((f * f) * 4.0, 0.0, 1.0));
  gl_FragColor = vec4((f + f * f * .872 * f * f + 0.468 * f) * color, 1.);
}
