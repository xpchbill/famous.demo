var App = require('./App');
var FamousEngine = require('famous/core/FamousEngine');
//start the Engine
FamousEngine.init();
//create the app and pass in the target element
var scene = FamousEngine.createScene()

scene.addChild(new App(scene));
