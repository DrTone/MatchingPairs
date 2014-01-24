//Game stuff
var NUM_CARDS = 2;
var NUM_ROWS = 2;
var NUM_COLS = 2;

function PairsApp() {
    baseApp.call(this);
    this.numCards = 0;
    this.sceneObjects = [];
    this.gameStates = [];
}

PairsApp.prototype = new baseApp();

PairsApp.prototype.init = function(container) {
    this.animating = false;
    baseApp.prototype.init.call(this, container);
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
                    }
                }
            }
            this.pickedObjects.length = 0;
        }
    }
    
    //Update scene objects
    for(var node in this.sceneObjects){
        this.sceneObjects[node].update();
    }
    baseApp.prototype.update.call(this);
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
    baseApp.prototype.createScene.call(this);
    
    //Set up geometry for player 1
    var mapUrl = "images/question.png";
    var map = THREE.ImageUtils.loadTexture(mapUrl);
    var geometry = new THREE.CubeGeometry(2, 2, 0.01, 4, 4, 1);
    var material = new THREE.MeshPhongMaterial({ map: map });
    var xStart = 12;
    var yStart = 2.5;
    var columnInc = 5;
    var rowInc = 5;
    this.setupPlayerGeometry(geometry, material, -xStart, yStart, columnInc, rowInc);
    
    //Geometry for player 2
    this.setupPlayerGeometry(geometry, material, xStart, yStart, columnInc, rowInc);
    
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
