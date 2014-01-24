//Game states for matching pairs game

function Welcome(name) {
    State.call(this, name);
}

Welcome.prototype = new State(name);