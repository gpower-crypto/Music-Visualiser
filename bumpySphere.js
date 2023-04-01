// design inspiration from video https://www.youtube.com/watch?t=888&v=SGHWZz5Mrsw&feature=youtu.be

function BumpySphere(){
  this.name = "Bumpy Sphere";

  // private data members
  var extraCanvas;     // declare variable to create offscreen canvas for the Bumpy Sphere extension
  var bumpiness;       // bumpiness of the shape
  var thetaValue;      // horizontal component of the shape's bumpiness
  var phyValue;        // vertical component of the shape's bumpiness
  var bumpySphereGui;  // gui controls
  var inBumpySphereExtension = true; // variable to verify that Bumpy Sphere extension is being displayed
  var showGuiControls = true; // variable show or hide gui controls

  // to provide gui parameters using a javascript object
  var guiParams = {
    // radius of the sphere
    radiusMin : width/10,
    radius : width/6.8,
    radiusMax : width/3,

    // density of the sphere
    densityMin : 10,
    density : 90,
    densityMax : 100,

    // rotation speed of the sphere
    rotationMin : 1,
    rotation : 5,
    rotationMax : 20,

    pattern : ['POINTS', 'LINES', 'CURVES'] // terrain pattern
  };

  this.setup = function(){
    // extra canvas to imlement 3D in p5.js, without disturbing the 2D extensions' functions.
 	  extraCanvas = createGraphics(1500, 1000, WEBGL);

    extraCanvas.colorMode(HSB);

    // create gui controls
    bumpySphereGui = createGui("Controls (Press space bar to hide or show controls)").setPosition(width - 205, 5);
    bumpySphereGui.addObject(guiParams); // add all gui parameters from the guiParams object
  }
  this.setup();

  // when the screen is resized
  this.onResize = function(){
    bumpySphereGui.setPosition(width - 205, 5);
  }

  this.draw = function(){
    this.onResize(); // Function call to make the gui controls responsive for any screen size

    angleMode(DEGREES); // set angle mode

    extraCanvas.clear();

    extraCanvas.strokeWeight(2);
    extraCanvas.noFill();

    extraCanvas.push();

    // call the function to display the sphere
    bumpySphere();

    // display objects in the center of the screen
    imageMode(CENTER);
    // display the canvas of the 'bumpy sphere' extension
    image(extraCanvas, width/2, height/2);

    extraCanvas.pop();
  }


  // show gui controls only for the Bumpy Sphere extension
  this.showBumpySphereGui = function(visName){
    if(visName == "Bumpy Sphere"){
       inBumpySphereExtension = true;
       bumpySphereGui.show(); // display gui controls
    }
    else{
       bumpySphereGui.hide(); // hide gui controls
       inBumpySphereExtension = false;
    }
  }

  // Check that when space bar is pressed, Bumpy Sphere gui controls will appear only while extension is being displayed
  this.keyIsPressed = function(keycode){
    // check if space bar is pressed in the Bumpy Sphere extension
    if(keycode == 32 && inBumpySphereExtension){
      showGuiControls = !showGuiControls;
    }
    if(showGuiControls && inBumpySphereExtension){
      bumpySphereGui.show(); // display gui controls
    }
    else{
      bumpySphereGui.hide(); // hide gui controls
    }
  }


  // implement the Bumpy Sphere extension
  function bumpySphere(){

    // rotates the shape about the y-axis with time
    extraCanvas.rotateY((millis()*2*guiParams.rotation)/ 30000);

    // to be called before getEnergy() function
    fourier.analyze();

    // return amount of energy/volume at 'bass' frequency range
    var bass = fourier.getEnergy('bass');

    // return amount of energy/volume at 'mid' frequency range
    var mid = fourier.getEnergy('mid');

    // canvas background colour
    extraCanvas.background((bass*0.2) + 180, mid, 16);

    // bumpiness of shape change with energy value at 'bass' frequency reange
    bumpiness = map(amplitude.getLevel(), 0, 0.5, 0, 0.2);

    // 'thetaValue' corresponds to the horizontal component of the bumpiness of the shape
    thetaValue = map(bass, 0, 255, 0, 8);

    // 'phyValue' corresponds to the vertical component of the bumpiness of the shape
    // math.floor is added to give a proper symmetry to the shape during shape transition
    phyValue = Math.floor(map(mid, 20, 250, 5, 9));

    // CODE below from https://github.com/Creativeguru97/YouTube_tutorial/blob/master/Play_with_geometry/SphericalCoordinates/0_4_bumpySphere/sketch.js
    // I have changed the code and modified it in my application.

    // Use nested loop to create 3-D shape
    // angle theta ranges from 0 to 180 degrees
    for(let theta = 0; theta < 180; theta += 180/guiParams.density){

      // stroke colour of the shape based on the energy levels/volume of the audio
      extraCanvas.stroke(mid*(130/theta), bass*(360/theta), 160);

      // form shape through set of points, lines or curves, based on user preference
      if(guiParams.pattern == "POINTS"){
        extraCanvas.beginShape(POINTS);
      }
      else if(guiParams.pattern == "LINES"){
        extraCanvas.beginShape(LINES);
      }
      else{
        extraCanvas.beginShape();
      }

      // angle phy ranges from 0 to 360 degrees
      for(let phy = 0; phy < 360; phy += 180/guiParams.density){

        let x = guiParams.radius * (1 + bumpiness * sin(thetaValue*theta) * sin(phyValue*phy)) * cos(theta);

        let y = guiParams.radius * (1 + bumpiness * sin(thetaValue*theta) * sin(phyValue*phy)) * sin(theta) * sin(phy);

        let z = guiParams.radius * (1 + bumpiness * sin(thetaValue*theta) * sin(phyValue*phy)) * sin(theta) * cos(phy);

        extraCanvas.vertex(x, y, z);
      }
      extraCanvas.endShape(CLOSE);
    }
  }
}
