//3D Node objects
function NodeObject() {
    //Derived from THREE Object3D
    THREE.Object3D.call(this);
    //Attributes
    this.animating = false;
    this.desiredYRot = 0;
    this.rotYInc = 0.1;
}

NodeObject.prototype = new THREE.Object3D();

NodeObject.prototype.spin = function() {
    if (!this.animating) {
        this.animating = true;
        //Spin node one revolution
        this.desiredYRot = this.rotation.y + (Math.PI*2);
    }
}

NodeObject.prototype.halfSpin = function() {
    if (!this.animating) {
        this.animating = true;
        //Spin node half a revolutiuon around y axis
        this.desiredYRot = this.rotation.y + Math.PI;
    }
}

NodeObject.prototype.resetRot = function() {
    //Reset rotation around Y axis
    this.rotation.y = 0;
}

NodeObject.prototype.update = function() {
    if (this.animating) {
        this.rotation.y += this.rotYInc;
        if (this.rotation.y >= this.desiredYRot) {
            this.rotation.y = this.desiredYRot;
            this.animating = false;
        }
    }
}