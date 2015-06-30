var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var PhysicsEngine = require('famous/physics/PhysicsEngine');

var physics = require('famous/physics');
var math = require('famous/math');
var Box = physics.Box;
var Spring = physics.Spring;
var RotationalSpring = physics.RotationalSpring;
var RotationalDrag = physics.RotationalDrag;
var Quaternion = math.Quaternion;
var Vec3 = math.Vec3;

function Div() {
    Node.call(this);

    this.setSizeMode(1,1,1)
        .setAbsoluteSize(100, 100, 0)
        .setAlign(0.5, 0.5)
        .setMountPoint(0.5, 0.5)
        .setOrigin(0.5, 0.5);

    this.el = new DOMElement(this, {
        content: 'Goodbye World!',
        classes: ['physics-Div']
    });
    this.el.setProperty('background', 'red');

    this.simulation = new PhysicsEngine();

    this.id = this.addComponent({
        onUpdate: function(time){

            this.simulation.update(time);

            // Get the transform from the `Box` body
            var physicsTransform = this.simulation.getTransform(this.box);
            var p = physicsTransform.position;
            var r = physicsTransform.rotation;

            // Set the Node's x-position to the `Box` body's x-position
            this.setPosition(p[0] * 100, 0, 0);

            // Set the Node's rotation to match the `Box` body's rotation
            this.setRotation(r[0], r[1], r[2], r[3]);

            this.requestUpdateOnNextTick(this.id);

        }.bind(this)
    });

    this.box = new Box({
        mass: 100,
        size: [100,100,100]
    });

    this.anchor = new Vec3(-5, 0, 0);

    this.spring = new Spring(null, this.box, {
        period: 0.6,
        dampingRatio: 0.5,
        anchor: this.anchor
    });


    this.quaternion = new Quaternion().fromEuler(1, Math.PI/2, 0);

    // Attach an anchor orientation to the `Box` body with a `RotationalSpring` torque
    this.rotationalSpring = new RotationalSpring(null, this.box, {
        period: 1,
        dampingRatio: 0.2,
        anchor: this.quaternion
    });


    // Notify the physics engine to track the box and the springs
    this.simulation.add(this.box, this.spring, this.rotationalSpring);

    this.requestUpdate(this.id);
}

Div.prototype = Object.create(Node.prototype);
Div.prototype.constructor = Div;

Div.prototype.onReceive = function onReceive (event, payload) {
    if(event === 'buttonClick'){
        if(this.isInStatus){
            this.anchor.set(-5, 0, 0);
            this.quaternion.fromEuler(1, Math.PI/2, 0);
            this.isInStatus = false;
        }else{
            this.anchor.set(0, 0, 0);
            this.quaternion.set(1, 0, 0, 0);
            this.isInStatus = true;
        }
    }
};

module.exports = Div;
