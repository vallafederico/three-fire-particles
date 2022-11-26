#define MPI 3.1415926535897932384626433832795
// precision mediump float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 a_position;
attribute float a_rand;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float u_time;
varying vec2 v_uv;
varying float v_time;
varying float v_rand;

#include ../lib/perlin-3d;
#include ../lib/rotation-3d;



void main() {
  vec3 pos = a_position;
  // pos += a_position;

  
  pos.y += fract(u_time + a_rand); // move up and reset

  float ns = cnoise(vec4(pos * 3., u_time)) * pos.y; // add noi
  pos.xyz += (ns) * .5;


  // geometry
  vec3 g_pos = position;
  g_pos *= .5 + a_rand * .5;
  g_pos = rotate(g_pos, vec3(0., 1., 0.), a_rand);

  // attach
  pos += g_pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  v_uv = uv;
  v_time = u_time;
  v_rand = a_rand;
}
