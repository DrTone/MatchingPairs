//Title screen for educational game

function titleState(rootNode) {
    State.call(this, "title");
    this.rootNode = rootNode;
    this.keyDown = false;
}

titleState.prototype = new State("title");

titleState.prototype.update = function(elapsedTime, keyState) {
    return this.keyDown;
}

titleState.prototype.init = function() {
    //Just shows webpage with all info
    
}

titleState.prototype.hideState = function() {
    //Nothing to hide
}