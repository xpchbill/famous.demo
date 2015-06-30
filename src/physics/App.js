var Node = require('famous/core/Node');
var Div = require('./Div');
var Button = require('./Button');

function App() {
    Node.call(this);

    this.div = new Div();
    this.addChild(this.div);
    this.addChild(new Button());
}

App.prototype = Object.create(Node.prototype);
App.prototype.constructor = App;

App.prototype.onMount = function onMount (parent, id) {
   Node.prototype.onMount.call(this, parent, id);
};

App.prototype.onReceive = function onReceive (event, payload) {

};

module.exports = App;
