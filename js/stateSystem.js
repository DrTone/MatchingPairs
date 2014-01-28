//State system for educational games
function StateSystem() {
    this.states = [];
    this.stateIds = [];
    this.currentState = null;
}

StateSystem.prototype.addState = function(stateId, state) {
    this.stateIds.push(stateId);
    this.states.push(state);
}

StateSystem.prototype.update = function(elapsedTime, keyState) {
    if (this.currentState == null)
        return false;
    
    return this.states[this.currentState].update(elapsedTime, keyState);
}

StateSystem.prototype.changeState = function(stateId) {
    if (this.currentState != null)
        this.states[this.currentState].hideState();
        
    this.currentState = this.states[stateId];
    this.currentState.init;
}