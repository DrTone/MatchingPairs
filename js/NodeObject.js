//3D Node objects
function NodeObject() {
    //Derived from THREE Object3D
    THREE.Object3D.call(this);
    //Attributes
    this.rotating = false;
    this.translating = false;
    this.desiredYRot = 0;
    this.desiredYPos = 0;
    this.rotYInc = 0.1;
    this.transYInc = 0.3;
}

NodeObject.prototype = new THREE.Object3D();

NodeObject.prototype.spin = function() {
    if (!this.rotating) {
        this.rotating = true;
        //Spin node one revolution
        this.desiredYRot = this.rotation.y + (Math.PI*2);
    }
}

NodeObject.prototype.halfSpin = function() {
    if (!this.rotating) {
        this.rotating = true;
        //Spin node half a revolutiuon around y axis
        this.desiredYRot = this.rotation.y + Math.PI;
    }
}
NodeObject.prototype.drop = function() {
    if(!this.translating) {
        this.translating = true;
        //Move node down a step
        this.desiredYPos = this.position.y - 5;
    }
}
NodeObject.prototype.resetRot = function() {
    //Reset rotation around Y axis
    this.rotation.y = 0;
}

NodeObject.prototype.update = function() {
    if (this.rotating) {
        this.rotation.y += this.rotYInc;
        if (this.rotation.y >= this.desiredYRot) {
            this.rotation.y = this.desiredYRot;
            this.rotating = false;
        }
    }
    if (this.translating) {
       this.position.y -= this.transYInc;
        if(this.position.y <= this.desiredYPos) {
            this.position.y = this.desiredYPos;
            this.translating = false;
        }
    }
}