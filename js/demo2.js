function init(){
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('mainCanvas')
  });
  renderer.setClearColor(0x000000);
  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-2,2,1.5,-1.5,1,10);
  camera.position.set(0,0,5);
  scene.add(camera)
  var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    })
  );
  scene.add(cube);
  renderer.render(scene, camera);
}
