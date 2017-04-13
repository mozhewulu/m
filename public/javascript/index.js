// function init(){
//   var renderer = new THREE.WebGLRenderer({
//     canvas: document.getElementById('mainCanvas')
//   });
//   renderer.setClearColor(0x000000);
//   var scene = new THREE.Scene();
//   var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
//   camera.position.set(0, 0, 5);
//   scene.add(camera);
//   var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
//     new THREE.MeshBasicMaterial({
//       color: 0xff0000
//     })
//   );
//   scene.add(cube);
//   renderer.render(scene, camera);
// }

  var renderer,controls,stat;
  function initThree() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer = new THREE.WebGLRenderer({
      antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    // renderer.setClearColor(0x000000, 1.0);
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);
  }

  var camera;
  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(100, 140, 80);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
    window.addEventListener( 'resize', onWindowResize, false );
  }

  var scene;
  function initScene() {
    scene = new THREE.Scene();
  }

  var light;
  function initLight() {
    light = new THREE.DirectionalLight(0xffffff, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  var cube;
  function initCube(){

    for(var i = 1; i <= 5; i++){
      cube = new THREE.Mesh(new THREE.CubeGeometry(5,5,8),
        new THREE.MeshLambertMaterial({color:0xffffff}))
      cube.position.x = 10 * i;
      cube.position.y = 5;
      cube.position.z = 4;
      scene.add(cube)
    }
  }
  function initVTK(){

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('javascript/lib/building/');
    mtlLoader.load('bina2.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('javascript/lib/building/');
      objLoader.load('bina2.obj', function ( object ) {
        object.position.set(-30,0,0)
        object.scale.x = 0.2;
        object.scale.y = 0.2;
        object.scale.z = 0.2;
        object.rotation.y = Math.PI/2
        scene.add(object)
        var newMesh = object.clone()
        for(var j = -1; j <= 2; j++){
          for(var i = 0; i <= 2; i++){
          var drawMesh = newMesh.clone()
          drawMesh.position.set(j*30,0,-30*i)
          scene.add(drawMesh)
          }
        }
      });
    });

    // var Vloader = new THREE.OBJLoader();
    // Vloader.load('javascript/lib/building/bina2.obj', function(obj) {
    //   mesh = obj
    // 	mesh.scale.x = 0.2;
    //   mesh.scale.y = 0.2;
    //   mesh.scale.z = 0.2;
    // 	// mesh.position.set(-30, 0, -0)
    //   mesh.rotation.y = Math.PI/2
    //   scene.add(mesh)
    //   var newMesh = mesh.clone()
    //   for(var j = -1; j <= 2; j++){
    //     for(var i = 0; i <= 2; i++){
    //     var drawMesh = newMesh.clone()
    //       drawMesh.position.set(j*30,0,-30*i)
    //       scene.add(drawMesh)
    //     }
    //
    //   }
    //  })
  }

  var ballMesh
  var ballRadius = 5;
  function initBall(){
    ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8),
      new THREE.MeshLambertMaterial({
        color: 0x44b758
      })
    )
    ballMesh.position.y = ballRadius;
    ballMesh.position.z = 50
    ballMesh.position.x = 15
    scene.add(ballMesh)
  }

  function initLine(){
    var geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(15, 5, 50));
    geometry.vertices.push(new THREE.Vector3(-15, 5, 50));
    geometry.vertices.push(new THREE.Vector3(-15,5,-60));
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFF0000}))
    scene.add(line)
    var geometry1 = new THREE.Geometry()
    geometry1.vertices.push(new THREE.Vector3(15, 5, 50));
    geometry1.vertices.push(new THREE.Vector3(45, 5, 50));
    geometry1.vertices.push(new THREE.Vector3(45,5,-60));
    var line = new THREE.Line(geometry1, new THREE.LineBasicMaterial({color: 0xFF0000}))
    scene.add(line)

    var geometry2 = new THREE.Geometry()
    for(var i = 0; i <= 2; i++){
      geometry2.vertices.push(new THREE.Vector3(-30,5,0))
      geometry2.vertices.push(new THREE.Vector3(0,5,0))
      var line = new THREE.Line(geometry2, new THREE.LineBasicMaterial({color: 0xFF0000}))
      line.position.z = -30*i
      scene.add(line)

      var line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial({color: 0xFF0000}))
      line2.position.z = -30*i
      line2.position.x = 60
      scene.add(line2)
    }
  }
  function initPlane(){
    var material = new THREE.MeshBasicMaterial({
        color: 0x8fb2c9,
        transparent:true,
        opacity:0.6
    });
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(130, 150), material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -10
    plane.position.x = 10
    scene.add(plane);
  }
  function initObject() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-200, 0, 0));
    geometry.vertices.push(new THREE.Vector3(200, 0, 0));
    for(var i = 0; i <= 40; i++){
      var line = new THREE.Line(geometry,new THREE.LineBasicMaterial({
        color: 0xB8B8B8,
        transparent:true,
        opacity:0.6
      }))
        line.position.z = (i * 10) - 200;
        scene.add(line);
      var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xB8B8B8,
        transparent:true,
        opacity:0.6
      }))
        line.position.x = (i * 10) - 200;
        line.rotation.y =  Math.PI / 2;
        scene.add(line)
      }
  }
  function render(){
    renderer.clear();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    stat.update()
    render();
  }
  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    stat.update()
  }

  function threeStart() {
      initThree();
      initCamera();
      initScene();
      initLight();
      initObject();
      initVTK()
      initLine()
      // initLine2()
      render();
      initBall()
      initPlane()
      onWindowResize();
      animate()
  }
