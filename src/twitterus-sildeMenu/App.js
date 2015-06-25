var Node = require('famous/core/Node');
var SildeMenu = require('./SildeMenu');
var Twitterus = require('./Twitterus');
var Camera = require('famous/components/Camera');

function App(scene) {
    // Extend Node
    Node.call(this);

    var camera = new Camera(scene)
        .setDepth(1000);

    this.addChild(new SildeMenu());

    this.addChild(new Twitterus());

}

// Extend the prototype
App.prototype = Object.create(Node.prototype);
App.prototype.constructor = App;

// Overwrite on mount to emit the changeSection event the moment
// twitter is added to the scene graph.
App.prototype.onMount = function onMount (parent, id) {
   Node.prototype.onMount.call(this, parent, id);
   this.emit('initSection');
};

// Overwrite the onReceive method to intercept events flowing within
// the scene graph
App.prototype.onReceive = function onReceive (event, payload) {

};

module.exports = App;
