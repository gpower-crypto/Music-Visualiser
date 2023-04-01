// declare variable to create an offscreen canvas for the rotating arcs
// the global variable is used by the Arcs constructor function
var graphics;

 function CircularVisual(){
   // name of the visualisation
   this.name = "Circular Visual";

   // private data members
   var particles = [];   // declare particles array
   var ang = 0;          // angle of rotation of the arcs
   var red = 105;        // red colour value
   var green = 255;      // blue colour value
   var blue = 255;       // green colour value
   var alpha = 255;      // alpha value for cinolour
   var arc1; var arc2;
   var arc3; var arc4;
   var arc5; var arc6;
   var arc7;
   var circularVisualGui; // gui controls for Circular Visual extension
   var inCircularVisualExtension; // variable to verify that Circular Visual extension is being displayed
   var showGuiControls = true; // variable show or hide gui controls

   // to provide gui parameters using a javascript object
   var guiParams = {
     numberOfSpectrumLines : 700, // number of lines in circular spectrum
     numberOfSpectrumLinesMin : 100,
     numberOfSpectrumLinesMax : 858,

     lineSpacing : 6, // space between the spectrum lines
     lineSpacingMin : 1,
     lineSpacingMax : 10,
     lineSpacingStep : 1,

     lineWidth : 3, // spectrum line width
     lineWidthMin : 1,
     lineWidthMax : 5,
     lineWidthStep : 0.2,

     spectrumLineShape : ['Round', 'Square'] // curvature of the spectrum lines
   }

   this.setup = function(){
    // create offscreen canvas for the rotating arc
    graphics = createGraphics(windowWidth, windowHeight);

    // code for the arcs from https://openprocessing.org/sketch/1251043
    // I have modified and adapted the code into my application.

    // store the arc constructor in an object (refer to arc.js)
    arc1 = new Arc(0, 0, 45, 2, red, green, blue, alpha, 0, 4, 80, 0);
    arc2 = new Arc(0, 0, 60, 0.5, red, green, blue, alpha, 0, 1, 200, 0);
    arc3 = new Arc(0, 0, 75, 2, red, 100, blue, alpha, 0, 1, 80, 0);
    arc4 = new Arc(0, 0, 125, 4, 200, 10, 20, alpha, 0, 3, 50, 0);
    arc5 = new Arc(0, 0, 151, 2, 255, green, blue, 100, 0, 3, 10, 0);
    arc6 = new Arc(0, 0, 170, 20, 255, 180, 79, 150, 0, 6, 20, 0);
    arc7 = new Arc(0, 0, 200, 2, 5, 210, 242, 250, 0, 6, 45, 0);

    // create gui controls
    circularVisualGui = createGui("Controls (Press space bar to hide or show controls)").setPosition(width - 205, 5);
    circularVisualGui.addObject(guiParams); // add all gui parameters from the guiParams object
    circularVisualGui.hide(); // hide gui controls by default
   }
   this.setup();

   // when the screen is resized
   this.onResize = function(){
     circularVisualGui.setPosition(width - 205, 5); // re-postion the gui controls
   }

   // show gui controls only for the Circular Visual extension
   this.showCircularVisualGui = function(visName){
     if(visName == "Circular Visual"){
        inCircularVisualExtension = true;
        circularVisualGui.show(); // display gui controls
     }
     else{
        circularVisualGui.hide(); // hide gui controls
        inCircularVisualExtension = false;
     }
   }

   // Check that when space bar is pressed, Circular Visual gui controls will appear only while extension is being displayed
   this.keyIsPressed = function(keycode){
     // check if space bar is pressed in the Circular Visual extension
     if(keycode == 32 && inCircularVisualExtension){
       showGuiControls = !showGuiControls;
     }
     if(showGuiControls && inCircularVisualExtension){
       circularVisualGui.show(); // display gui controls
     }
     else{
       circularVisualGui.hide(); // hide gui controls
     }
   }


   // calls the functions to be executed
   this.draw = function(){
    this.onResize(); // Function call to make the gui controls responsive for any screen size
    background(0);
    rotatingArcs(); // call rotatingArcs function
    push();
    // display the objects at the center of the screen
    translate(width/2, height/2);
    circularSpectrum();       // call circularSpectrum function
    particleImplementation(); // call particleImplementation function
    pop();
   }

   // implement rotating arcs
   function rotatingArcs(){

    angleMode(RADIANS);

    // background to create a slight lag in the moving colours
    graphics.background(0, 38);

    graphics.push();

    // display arcs in the center of the screen
   	graphics.translate(graphics.width/2, graphics.height/2);

    // display arcs
   	arc1.show(ang);
   	arc2.show(ang);
   	arc3.show(ang);
   	arc4.show(ang);
   	arc5.show(ang);

    // make the stroke cap square only for one arc type
   	push();
   	graphics.strokeCap(SQUARE);
   	arc6.show(ang);
   	pop();

   	arc7.show(ang);

    // increment angle of rotation of the arc
   	ang += 3.5;

    //display objects in the center of the screen
    imageMode(CENTER);
    //display the offscreen canvas
    image(graphics, width/2, height/2);

    graphics.pop();
   }

   //  implement a spectrum visualisation of the audio in a circular form.
   function circularSpectrum(){

     var spectrum = fourier.analyze();

     // change stroke-cap of spectrum lines based on user preference
     if(guiParams.spectrumLineShape == 'Round'){
       strokeCap(ROUND);
     }
     else {
       strokeCap(SQUARE);
     }

     strokeWeight(guiParams.lineWidth);
     noFill();

     // **** CODE snippet for circular spectrum below taken from https://www.cnblogs.com/little-xia/p/14058917.html
     // I have adapted and modified the code in my application

     beginShape();
     // loop to represent spectrum in circular form
     for (let i = 0; i < guiParams.numberOfSpectrumLines ; i += guiParams.lineSpacing){

       stroke(i*0.5, 255, 252);

       // maps the number of the spectrum lines to the 2*PI angle range of a circle
       let freqRad = map(i, 0, guiParams.numberOfSpectrumLines, 0, 2*PI);

       let level = amplitude.getLevel();

       // multiply variable 'level' to increase spectrum size with amplitude
       let x1 = cos(freqRad) * 120 * (1 + level/7);
       let y1 = sin(freqRad) * 120 * (1 + level/7);

       // maps the amlpitude values of the spectrum array to the length of the line(min 120-max 200)
       let l = map(spectrum[i], 0, 255, 120*(1 + level/7), 200);

       let x2 = l * cos(freqRad);
       let y2 = l * sin(freqRad);

       // line begins within radius of 120 and its length extends proportional to the value l based on
       // the spectrum array values.
       line(x1, y1, x2, y2);
     }
     endShape(CLOSE);
  }

   //  For the code below, I watched a tutorial video on youtube on how to implement the
   //  particle system and I have modified the code in my application.
   //  link here https://www.youtube.com/watch?v=uk96O7N1Yo0&t=524s


   // function implements the particle system using the Particle counstuctor function
   function particleImplementation(){

    fourier.analyze();

    var amp = fourier.getEnergy(10, 150);  // variable average energy value between two frequencies

    // store the particle constructor function into p
    var p = new CircularVisualParticle();

    // push the particle constructor into particles array with each frame
    particles.push(p);

    // loop through the particles array length in reverse order
    for(let i = particles.length-1; i >= 0 ; i--){

      // check if particles have crossed the edges
      if(!particles[i].edges()){

        // draw the particles to the screen
        particles[i].draw();

        // update the particles' location if amp (average energy level) exceeds 220
        particles[i].update(amp > 220);
      }
      else{
        // removes the particles that have crossed the edges
        particles.splice(i,1)
       }
     }
   }

 }
