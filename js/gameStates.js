//Game states for matching pairs game

function Welcome(name) {
    State.call(this, name);
}

Welcome.prototype = new State(name);

function NameEntry(name) {
    State.call(this, name);
}

NameEntry.prototype = new State(name);

function LoadLevel(name) {
    State.call(this, name);
}

LoadLevel.prototype = new State(name);

function Player1Turn(name) {
    State.call(this, name);
}

Player1Turn.prototype = new State(name);

function Player2Turn(name) {
    State.call(this, name)
}

Player1Turn.prototype = new State(name);
