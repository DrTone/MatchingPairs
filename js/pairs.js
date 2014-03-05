//Game stuff
var NUM_CARDS = 2;
var NUM_ROWS = 2;
var NUM_COLS = 2;

function PairsApp() {
    BaseApp.call(this);
    this.numCards = 0;
    this.sceneObjects = [];
    this.stateNames = ['Welcome', 'NameEntry', 'LoadLevel', 'Player1Turn', 'Player2Turn'];
    this.gameStates = [];
    this.currentState = 0;
}

PairsApp.prototype = new BaseApp();

PairsApp.prototype.init = function(container) {
    this.animating = false;
    BaseApp.prototype.init.call(this, container);
    this.stateSystem = new StateSystem();
    var state = 0;
    this.stateSystem.addState(this.stateNames[state++], new Welcome(''));
    this.stateSystem.addState(this.stateNames[state++], new NameEntry(''));
    this.stateSystem.addState(this.stateNames[state++], new LoadLevel(''));
    this.stateSystem.addState(this.stateNames[state++], new Player1Turn(''));
    this.stateSystem.addState(this.stateNames[state++], new Player2Turn(''));
    this.stateSystem.changeState(this.currentState);    
}

PairsApp.prototype.update = function() {
    //Perform any updates
    if (this.pickedObjects != null) {
        //Picked something
        if (this.pickedObjects.length > 0) {
            var name = this.pickedObjects[0].object.name;
            //DEBUG
            console.log('Picked', name);
            //END DEBUG
            if (name.indexOf("Card")!= -1) {
                var id = this.pickedObjects[0].object.id;
                for(var node in this.sceneObjects){
                    if (this.sceneObjects[node].children[0].id == id) {
                        console.log("Picked NodeObject", name);
                        this.sceneObjects[node].halfSpin();
                        this.sceneObjects[node].drop();
                    }
                }
            }
            this.pickedObjects.length = 0;
        }
    }
    
    //Update scene objects
    for(var node in this.sceneObjects){
        this.sceneObjects[node].update(this.elapsedTime);
    }
    BaseApp.prototype.update.call(this);
    //Do state update
    //DEBUG
    var elapsedTime = 0, keyState = 0;
    if (this.stateSystem.update(this.elapsedTime, keyState)) {
        //Change state
        //DEBUG
        console.log('State changed');
        this.stateSystem.changeState(++this.currentState);
    }
}

PairsApp.prototype.setupPlayerGeometry = function(geometry, material, xStart, yStart, colInc, rowInc) {
        var node;
        var model;
        for(var row=0; row<NUM_ROWS; ++row){
            for(var col=0; col<NUM_COLS; ++col){
                model = new THREE.Mesh(geometry, material);
                model.name = "Card"+this.numCards;
                node = new NodeObject();
                node.name = "CardNode"+this.numCards;
                node.add(model);
                node.position.set(xStart+(colInc*row), yStart+(rowInc*col), 0);
                this.root.add(node);
                this.sceneObjects.push(node);
                ++this.numCards;
                console.log('Added card', node);
            }
        }
}

PairsApp.prototype.createScene = function() {
    //Init base createsScene
    BaseApp.prototype.createScene.call(this);

    //Create textured quad as background
    var backMapURL = "images/sunnySky.jpg";
    var backMap = THREE.ImageUtils.loadTexture(backMapURL);
    var backgroundGeom = new THREE.CubeGeometry(40, 30, 0.01, 8, 8, 1);
    var backMat = new THREE.MeshPhongMaterial({ map: backMap });
    var model = new THREE.Mesh(backgroundGeom, backMat);
    model.name = "Background";
    var node = new NodeObject();
    node.name = "BackNode";
    node.add(model);
    node.position.set(0,0,-5);
    this.root.add(node);
    this.sceneObjects.push(node);

    //Set up geometry for player 1
    var mapUrl = "images/question.png";
    var map = THREE.ImageUtils.loadTexture(mapUrl);
    var geometry = new THREE.CubeGeometry(2, 2, 0.01, 4, 4, 1);
    var material = new THREE.MeshPhongMaterial({ map: map });
    var xStart = 12;
    var yStart = 2.5;
    var columnInc = 5;
    var rowInc = 5;
    //this.setupPlayerGeometry(geometry, material, -xStart, yStart, columnInc, rowInc);
    
    //Geometry for player 2
    //this.setupPlayerGeometry(geometry, material, xStart, yStart, columnInc, rowInc);

    //Animate all the nodes
    /*
    for(var node=1; node<this.sceneObjects.length; ++node){
        this.sceneObjects[node].sine(node * 500, 5, 2000);
    }
    */

    //Load model
    var loader = new THREE.JSONLoader();
    var self = this;
    var callbackModel = function (geometry, materials) { createScene(self, geometry, materials, 0, 0, 0)};

    function createScene(self, geometry, materials, x, y, z) {
        var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ) );
        mesh.position.set(x, y, z);
        self.root.add(mesh);
    }

    loader.load("models/pyramid.js", callbackModel);

    console.log("Cards added to scene");
}

//Execute when DOM ready
$(document).ready(function() {
    var container = document.getElementById("container");
    var app = new PairsApp();
    app.init(container);
    app.createScene();
    app.run();
});
