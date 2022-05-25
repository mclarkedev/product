var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
camera.position.set(
  0.00169226743572506,
  -3.8474742709485645,
  1.2102231970726514
);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
var canvas = renderer.domElement;
var div = document.getElementById("three");
div.appendChild(canvas);

var geometry = new THREE.CylinderBufferGeometry(2, 5, 20, 32, 2, true);
var material = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color("yellow"),
    },
    color2: {
      value: new THREE.Color("purple"),
    },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;

    varying vec2 vUv;

    void main() {

      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  wireframe: true,
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.rotation.x = Math.random() * 100;

render();

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  mesh.rotation.x -= 0.001;
  mesh.rotation.y -= 0.0001;
  mesh.rotation.z -= 0.0001;
  //   mesh.rotation.x -= Math.PI / 2;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// Body Motion

var animation = bodymovin.loadAnimation({
  container: document.getElementById("bodymotion"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "m-white.json",
});
