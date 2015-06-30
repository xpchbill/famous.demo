var App = require('./App');
var FamousEngine = require('famous/core/FamousEngine');

FamousEngine.init();

var scene = FamousEngine.createScene()

scene.addChild(new App());

scene.requestUpdate();
