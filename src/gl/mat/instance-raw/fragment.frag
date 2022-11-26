precision mediump float;

varying vec2 v_uv;
varying float v_time;
varying float v_rand;


const vec3 COL1 = vec3(1., 1., 1.);
const vec3 COL2 = vec3(1., 1., 0.);

#include ../lib/perlin-3d;


void main() {

  float dist = smoothstep(.5, .1, distance(v_uv, vec2(0.5, 0.5)));

  float ns = cnoise(vec4(
    v_uv * 10., 
    dist + v_rand, 
    v_time * 10.
  ));

  float col = ns * dist + dist;

  vec3 final_col = COL1;
  final_col = mix(COL2, final_col, dist);
  



  gl_FragColor.rgb = final_col;
  // gl_FragColor.rgb = vec3(col);
  gl_FragColor.a = col;
  // gl_FragColor.a = 1.;
  
}
