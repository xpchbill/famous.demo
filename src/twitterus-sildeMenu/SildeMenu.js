var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Transform = require('famous/components/Transform');

function SildeMenu () {
    Node.call(this);

    this.setScale(0.8, 1, 1).setOrigin(-4, 0, 0);
    this.animation = new Transform(this);
    this.openStatus = false;

    this.el = new DOMElement(this, {
        classes: ['sildeMenu']
    }).setProperty('textAlign', 'center')
       .setProperty('lineHeight', '100px')
       .setProperty('backgroundColor', 'black')
       .setProperty('zIndex', '20')
       .setProperty('fontSize', '30px');
}

SildeMenu.prototype = Object.create(Node.prototype);

SildeMenu.prototype.constructor = SildeMenu;

SildeMenu.prototype.onReceive = function onReceive (event) {
    if(event === 'headerClick'){
        if(this.openStatus){
            this.animation.setOrigin(0, 0, 0, {
                duration: 200
            });
            this.openStatus = false;
        }else {
            this.animation.setOrigin(-4, 0, 0, {
                duration: 200
            });
            this.openStatus = true;
        }
    }
};

//
// SildeMenu.prototype.close = function () {
//     this.setScale(0.8, 1, 1).setOrigin(-4, 0, 0);
// };
//
// SildeMenu.prototype.open = function () {
//     this.setScale(0.8, 1, 1).setOrigin(0, 0, 0);
// };

module.exports = SildeMenu;
