//3D Node objects
var TWO_PI = Math.PI * 2;

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
    this.animationScale = 0;
    this.animationDelay = 0;
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
NodeObject.prototype.sine = function(delay, scale, period) {
    if(!this.translating) {
        this.translating = true;
        //Move node according to sinewave fn
        this.desiredYPos = null;
        this.animationScale = scale;
        this.startPosition = new THREE.Vector3();
        this.startPosition.y = this.position.y;
        this.startTime = Date.now() + delay;
        this.endTime = this.startTime + period;
        this.period = period/1000;
    }
}
NodeObject.prototype.resetRot = function() {
    //Reset rotation around Y axis
    this.rotation.y = 0;
}

NodeObject.prototype.update = function(elapsedTime) {
    if (this.rotating) {
        this.rotation.y += this.rotYInc;
        if (this.rotation.y >= this.desiredYRot) {
            this.rotation.y = this.desiredYRot;
            this.rotating = false;
        }
    }
    if (this.translating) {
        if(this.desiredYPos != null) {
            this.position.y -= this.transYInc;
            if(this.position.y <= this.desiredYPos) {
                this.position.y = this.desiredYPos;
                this.translating = false;
            }
        } else {
            var timeNow = Date.now();
            if(timeNow >= this.startTime) {
                //Start animating
                this.position.y = this.startPosition.y + Math.sin((timeNow - this.startTime)/1000 * (TWO_PI/this.period)) * this.animationScale;
            }
            if(timeNow >= this.endTime) {
                this.translating = false;
                this.position.y = this.startPosition.y;
            }
        }
    }
}