// global for the controls and input
var controls = null;
// store visualisations in a container
var vis = null;
// variable for the p5 sound object
var sound = null;
// initialise isReady to false
var isReady = false;
// variable for p5 fast f̥ourier transform
var fourier;
// variable for p5 Amplitude function
var amplitude;
// declare variable for beat detect extension
var beatDetect;
// declare variable for bumpy sphere extension
var bumpySphere;
// declare variable for perlin noise terrain extension
var perlinNoiseTerrain;
// declare variable for circular visual extension
var circularVisual;

function preload(){
	sound = loadSound('assets/luxurious_loop.mp3', soundSuccess);
}

// check if the sound file has loaded successfully
function soundSuccess(){
	isReady = true;
}

function setup(){
	 createCanvas(windowWidth, windowHeight);

   // create a controls object for the extensions
	 controls = new ControlsAndInput();

	 // instantiate the fft object
	 fourier = new p5.FFT();

   // instantiate the amplitude object
	 amplitude = new p5.Amplitude();

   // store BeatDetect constructor function in an object
   beatDetect = new BeatDetect();

	 // store BumpySphere constructor function in an object
	 bumpySphere = new BumpySphere();

	 // store PerlinNoiseTerrain constructor function in an object
	 perlinNoiseTerrain = new PerlinNoiseTerrain();

	 // store CircularVisual constructor function in an object
	 circularVisual = new CircularVisual();

	 // create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(bumpySphere);
	 vis.add(new Fireworks());
	 vis.add(perlinNoiseTerrain);
	 vis.add(circularVisual);
}

function draw(){
	// draw the selected visualisation
	vis.selectedVisual.draw();
	// draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
	bumpySphere.keyIsPressed(keyCode); // call keyIsPressed from the bumpySphere extension
	perlinNoiseTerrain.keyIsPressed(keyCode); // call keyIsPressed from the perlinNoiseTerrain extension
	circularVisual.keyIsPressed(keyCode); // call keyIsPressed from the circularVisual extension
}

// when the window has been resized. Resize canvas to fit
// if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
