//Base three.js app for graphics projects

var mouseState = {x:0, y:0, clicked:false};
var offsetLeft = 0;
var offsetTop = 0;
var offsetWidth = 0;
var offsetHeight = 0;

function BaseApp() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.container = null;
    this.projector = null;
    this.objectList = [];
    this.root = null;
    this.mouse = { x:0, y:0, clicked:false};
    this.pickedObjects = [];
    this.startTime = 0;
    this.elapsedTime = 0;
}

BaseApp.prototype.init = function(container) {
    this.container = container;
    console.log("BaseApp container =", container);
    this.createRenderer();
    console.log("BaseApp renderer =", this.renderer);
    this.createCamera();
    this.initMouse();
    this.createControls();
    this.projector = new THREE.Projector();
}

BaseApp.prototype.createRenderer = function() {
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild( this.renderer.domElement );
}

BaseApp.prototype.createScene = function() {
    this.scene = new THREE.Scene();
    
    var light = new THREE.DirectionalLight( 0x888888, 1.5);
    light.position.set(50, 50, 100);
    this.scene.add( light );
    var ambientLight = new THREE.AmbientLight(0x222222);
    this.scene.add(ambientLight);
    this.scene.add(this.camera);
    
    var root = new THREE.Object3D();
    root.name = "RootNode";
    this.scene.add(root);
    this.root = root;
}

BaseApp.prototype.createCamera = function() {
    offsetLeft = this.container.offsetLeft;
    offsetTop = this.container.offsetTop;
    offsetWidth = this.container.offsetWidth;
    offsetHeight = this.container.offsetHeight;
    
    this.camera = new THREE.PerspectiveCamera( 45, this.container.offsetWidth / this.container.offsetHeight, 1, 1000 );
    this.camera.position.set( 0, 0, 35 );
    
    console.log('dom =', this.renderer.domElement);
}

BaseApp.prototype.createControls = function() {
    this.controls = new THREE.TrackballControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;

    this.controls.noZoom = false;
    this.controls.noPan = false;

    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    this.controls.keys = [ 65, 83, 68 ];

    var self = this;
}

BaseApp.prototype.update = function() {
    //Do any updates
    this.controls.update();
}

BaseApp.prototype.run = function(timestamp) {
    //Calculate elapsed time
    if (this.startTime === null) {
        this.startTime = timestamp;
    }
    this.elapsedTime = timestamp - this.startTime;
    
    this.renderer.render( this.scene, this.camera );
    var self = this;
    //Check for interaction
    this.mouse = mouseState;
    if (this.mouse.clicked) {
        var rayVec = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
        this.projector.unprojectVector(rayVec, this.camera);
        var ray = new THREE.Raycaster(this.camera.position, rayVec.sub(this.camera.position).normalize());
        this.pickedObjects = ray.intersectObjects(this.root.children, true);
        this.mouse.clicked = false;
        mouseState.clicked = false;
    }
    this.update();
    requestAnimationFrame(function(timestamp) { self.run(timestamp); });
}
//Interaction
BaseApp.prototype.initMouse = function() {
    var self = this;
    this.renderer.domElement.addEventListener('mousedown', self.onAppMouseDown, false);
}

BaseApp.prototype.onAppMouseDown = function (event) {
    //var offset = $(this.renderer.domElement).offset();
    var eltx = event.pageX - offsetLeft;
    var elty = event.pageY - offsetTop;
    
    mouseState.x = (eltx / offsetWidth) *2 -1;
    mouseState.y = -(elty / offsetHeight) *2 + 1;
    mouseState.clicked = true;
    
    console.log('mousestate =', mouseState.x, mouseState.y, mouseState.clicked);
}