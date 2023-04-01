// I watched a video turtorial to implement the perlin noise terrain from link: https://www.youtube.com/watch?v=IKB1hWWedMk&list=LL&index=5
// I have modified and adapted the code in my application

function PerlinNoiseTerrain(){

  this.name = "Perlin Noise Terrain";

  // private data members
  var terrainGraphics;  // variable to create an offscreen canvas for the perlin noise terrain
  var amps;    // amplitude of audio
  var rows;         // number of rows
  var cols;         // number of columns
  var terrain = []; // terrain array
  var flying = 0;   // flying value to create a moving effect
  var terrainGui;   // gui controls
  var inTerrainExtension; // variable to verify that Perlin Noise Terrain extension is being displayed
  var showGuiControls = true; // variable show or hide gui controls

  // to provide gui parameters using a javascript object
  var guiParams = {
    terrainWidth : 1300,  // width of the terrain
    terrainWidthMin : 1000,
    terrainWidthMax : 2500,

    terrainHeight : 1600,  // height of the terrain
    terrainHeightMin : 900,
    terrainHeightMax : 2000,

    view : 25,  // view of the terrain
    viewMin : 19,
    viewMax : 40,
    viewStep : 0.1,

    cellScale : 23,  // cell-scale of each cell in the terrain
    cellScaleMin : 20,
    cellScaleMax : 40,

    terrainColour : "#c800ff", // colour of the terrain

    terrainPattern : ['Triangle strip', 'Line', 'Points', 'Parallelogram'],

    flowDirection : ['Backward', 'Forward']
  };


  this.setup = function(){
    // create offscreen canvas for the terrain
    terrainGraphics = createGraphics(1200,700, WEBGL);

    amps = new p5.Amplitude(0.9); // set smoothness for amplitude values

    // create gui controls
    terrainGui = createGui("Terrain Controls (Press space bar to hide or show controls)").setPosition(width - 205, 5);
    terrainGui.addObject(guiParams); // add all gui parameters from the guiParams object
    terrainGui.hide(); // hide gui by default
  }
  this.setup();

  // when the screen is resized
  this.onResize = function(){
    terrainGui.setPosition(width - 205, 5);
  }

  this.draw = function(){
    this.onResize(); // Function call to make the gui controls responsive for any screen size

    background(0);

    terrainGraphics.push();

    terrainGraphics.clear();

    terrainGraphics.background(0);

    terrainGraphics.noFill();

    perlinNoiseTerrain(); // call the perlinNoiseTerrain function

    // display objects in the center of the screen
    imageMode(CENTER);
    // display the canvas of the 'bumpy sphere' extension
    image(terrainGraphics, width/2, height/2);

    terrainGraphics.pop();
  }


  // show gui controls only for the Perlin Noise Terrain extension
  this.showTerrainGui = function(visName){
    if(visName == "Perlin Noise Terrain"){
       inTerrainExtension = true;
       terrainGui.show(); // display gui controls
    }
    else{
       terrainGui.hide(); // hide gui controls
       // set variable inTerrainExtension to false when other extensions are being displayed
       inTerrainExtension = false;
    }
  }


  // Check that when space bar is pressed, terrain gui controls will appear only for this extension
  this.keyIsPressed = function(keycode){
    // check if space bar is pressed in Perlin Noise Terrain extension
    if(keycode == 32 && inTerrainExtension){
      showGuiControls = !showGuiControls;
    }
    if(showGuiControls && inTerrainExtension){
      terrainGui.show(); // display gui controls
    }
    else{
      terrainGui.hide(); // hide gui controls
    }
  }

  // function to implement the perlin noise terrain
  function perlinNoiseTerrain(){

    cols = guiParams.terrainWidth/guiParams.cellScale; // each column cell-scale of the terrain
    rows = guiParams.terrainHeight/guiParams.cellScale; // each row cell-scale of the terrain

    // initialise all values in the terrain array
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; // specify a default values
      }
    }

    // determine the direction of flow
    if(guiParams.flowDirection == 'Backward'){
      // decrement flying value to backward create moving effect
      flying -= 0.25;
    }
    else{
      // increment flying value to create forward moving effect
      flying += 0.25;
    }

    let level = amps.getLevel();

    // yOff and xOff needed as parameters for the noise function.
    // with every frame yOff starts with a new value
    let yOff = flying;

    for (var y = 0; y < rows; y++){

      let xOff = 0;

      for (var x = 0; x < cols; x++){

        let terrainMount = map(level, 0, 0.9, 0, 200);

        terrain[x][y] = map(noise(xOff, yOff), 0, 1, -1*terrainMount, terrainMount);

        // increment xOff and yOff by a small fraction so that the noise function
        // can create a smooth value transition for every xOff and yOff value
        xOff += 0.2;
      }
      yOff += 0.2;
    }

    // translations to position the 3D terrain
    terrainGraphics.translate(0, 150);
    terrainGraphics.rotateX(PI/(guiParams.view*0.1)); // rotate terrain about the x-axis
    terrainGraphics.translate(-guiParams.terrainWidth/2, -guiParams.terrainHeight/2);

    // create the terrain surface pattern based on the user prefernce
    for(var y = 0; y < rows; y++){

      if(guiParams.terrainPattern == 'Triangle strip'){
        terrainGraphics.beginShape(TRIANGLE_STRIP);
      }
      else if(guiParams.terrainPattern == 'Line'){
        terrainGraphics.beginShape(LINES);
      }
      else if(guiParams.terrainPattern == 'Parallelogram'){
        terrainGraphics.beginShape();
      }
      else{
        terrainGraphics.beginShape(POINTS);
      }
      // draw the terrain
      for(var x = 0; x < cols; x++){
        terrainGraphics.stroke(guiParams.terrainColour);
        terrainGraphics.vertex(x*guiParams.cellScale, y*guiParams.cellScale, terrain[x][y]);
        terrainGraphics.vertex(x*guiParams.cellScale, (y+1)*guiParams.cellScale, terrain[x][y+1]);
      }
      terrainGraphics.endShape();
    }
  }
}
