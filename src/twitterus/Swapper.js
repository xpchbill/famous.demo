var data = require('./Data');
var Section = require('./Section');
var Node = require('famous/core/Node');
var Align = require('famous/components/Align');
var Transform = require('famous/components/Transform');
var DOMElement = require('famous/dom-renderables/DOMElement');

// The swapper will hold the sections and swap between them
// on events
function Swapper () {
    // subclass Node
    Node.call(this);

    // create a new dom element
    // this.el = new DOMElement(this, {
    //     classes: ['Swapper']
    // });

    this.el = new DOMElement(this);

    // store the current section
    this.currentSection = null;

    // create the sections
    this.sections = createSections.call(this);

    // this.id = this.addComponent({
    //   onUpdate : function(time) {
    //       this.setRotation(time*0.001, -time*0.002, Math.PI / 2);
    //       this.requestUpdate(this.id);
    //   }.bind(this)
    // });
    //
    // this.requestUpdate(this.id);

}

// subclass Node
Swapper.prototype = Object.create(Node.prototype);

Swapper.prototype.constructor = Swapper;

Swapper.prototype.changeSection = function changeSection (to) {
    // Swap out any section that isn't the new section
    // and swap in the new section
    data.sections.forEach(function (section) {
          if (section.id === to){
            //500 millisecond transition
            this.sections[section.id].align.set(0, 0, 0, {
                duration: 500
            });
          }else{
            // 1 in x will put the top left corner of the
            // section directly off the screen
            this.sections[section.id].align.set(1, 0, 0, {
                duration: 500
            });
          }

          // if (section.id === to){
          //   //500 millisecond transition
          //   this.sections[section.id].align.setOrigin(0.5, 0.5, 0, {
          //       duration: 500
          //   }).setScale(1, 1, 1, {
          //       duration: 500
          //   });
          //
          // }else{
          //   // 1 in x will put the top left corner of the
          //   // section directly off the screen
          //   this.sections[section.id].align.setOrigin(2, 2, 1, {
          //       duration: 500
          //   }).setScale(0, 0, 0, {
          //       duration: 500
          //   });
          // }
          
    }.bind(this));

    this.currentSection = to;
};

// overwrite onReceive to intercept events in the scene graph
Swapper.prototype.onReceive = function onReceive (event, payload) {
    if (event === 'changeSection') this.changeSection(payload.to);
};

function createSections () {
    var result = {};

    // iterate over all the sections in our data
    data.sections.forEach(function (section, i) {
        var child = this.addChild();
        result[section.id] = {
            align: new Align(child),
            section: child.addChild(new Section(i))
        };
    }.bind(this));

    return result;
}

module.exports = Swapper;
