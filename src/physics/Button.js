var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');

function Button() {
    Node.call(this);

    this.setSizeMode(1, 1, 0)
              .setAbsoluteSize(100, 50, 0)
              .setAlign(0.1, 0.1)
              .setMountPoint(0.5, 0.5)
              .setOrigin(0.5, 0.5);
    this.el = new DOMElement(this, {
        tagName: 'button',
        content: 'Button'
    }).setProperty('padding', '0px');

    this.addUIEvent('click');
}

Button.prototype = Object.create(Node.prototype);
Button.prototype.constructor = Button;

Button.prototype.onReceive = function onReceive (event, payload) {
    if(event === 'click'){
        this.emit('buttonClick');
    }
};

module.exports = Button;
