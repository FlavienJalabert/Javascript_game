var SCREEN_WIDTH = 500;
var SCREEN_HEIGHT = window.innerHeight*.753;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
var container, stats;
var camera, scene, renderer, mesh;
var cameraRig, activeCamera, activeHelper;
var cameraPerspective, cameraOrtho;
var cameraPerspectiveHelper, cameraOrthoHelper;
var frustumSize = 600;
function init() {
	container = document.createElement( 'div' );
	document.getElementById('graphical').appendChild( container );
	scene = new THREE.Scene();
	//
	camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 1, 10000 );
	camera.position.z = 2500;
	cameraPerspective = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 150, 1000 );
	cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
	scene.add( cameraPerspectiveHelper );
	//
	cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );
	cameraOrthoHelper = new THREE.CameraHelper( cameraOrtho );
	scene.add( cameraOrthoHelper );
	//
	activeCamera = cameraPerspective;
	activeHelper = cameraPerspectiveHelper;
	// counteract different front orientation of cameras vs rig
	cameraOrtho.rotation.y = Math.PI;
	cameraPerspective.rotation.y = Math.PI;
	cameraRig = new THREE.Group();
	cameraRig.add( cameraPerspective );
	cameraRig.add( cameraOrtho );
	scene.add( cameraRig );
	//
	mesh = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 100, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
	);
	scene.add( mesh );
	var mesh2 = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 50, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
	);
	mesh2.position.y = 150;
	mesh.add( mesh2 );
	var mesh3 = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 5, 16, 8 ),
		new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
	);
	mesh3.position.z = 150;
	cameraRig.add( mesh3 );
	//
	var geometry = new THREE.BufferGeometry();
	var vertices = [];
	for ( var i = 0; i < 10000; i ++ ) {
		vertices.push(  THREE.Math.randFloatSpread( 2000 ) ); // x
		vertices.push(  THREE.Math.randFloatSpread( 2000 ) ); // y
		vertices.push(  THREE.Math.randFloatSpread( 2000 ) ); // z
	}
	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
	scene.add( particles );
	//
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	container.appendChild( renderer.domElement );
	renderer.autoClear = false;
	//
	stats = new Stats();
	container.appendChild( stats.domElement );
	//
}
//
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}
function render() {
	var r = Date.now() * 0.0005;
	mesh.position.x = 700 * Math.cos( r );
	mesh.position.z = 700 * Math.sin( r );
	mesh.position.y = 700 * Math.sin( r );
	mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
	mesh.children[ 0 ].position.z = 70 * Math.sin( r );
	if ( activeCamera === cameraPerspective ) {
		cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
		cameraPerspective.far = mesh.position.length();
		cameraPerspective.updateProjectionMatrix();
		cameraPerspectiveHelper.update();
		cameraPerspectiveHelper.visible = true;
		cameraOrthoHelper.visible = false;
	} else {
		cameraOrtho.far = mesh.position.length();
		cameraOrtho.updateProjectionMatrix();
		cameraOrthoHelper.update();
		cameraOrthoHelper.visible = true;
		cameraPerspectiveHelper.visible = false;
	}
	cameraRig.lookAt( mesh.position );
	renderer.clear();
	activeHelper.visible = false;
	renderer.setViewport( 0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
	renderer.render( scene, activeCamera );
	activeHelper.visible = true;
	renderer.setViewport( SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
	renderer.render( scene, camera );
}
