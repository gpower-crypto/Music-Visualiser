//display fireworks
function Fireworks(){

  this.name = "Fireworks";

  this.draw = function(){
    background(0,30);
    frameRate(60);

    var spectrum = fourier.analyze();

    if(beatDetect.detectBeat(spectrum)){
      addFirework();
    }
    update();
  }

  var fireworks = []; // fireworks array

  //add in a new firework
  function addFirework(){

    var f_colour = color(random(0,255),random(0,255),random(0,255)); // create random colour for the fireworks

    var f_x = random(width*0.1, width*0.9); // random x position for each firework

    var f_y = random(height*0.1, height*0.9); // random y position for each firework

    fireworks.push(new Firework(f_colour, f_x, f_y)); // add each Firework constrctor to the array
  }

  //update the fireworks
  function update(){
    for(let i = fireworks.length-1; i >= 0; i--){
      fireworks[i].draw(); // draw each firework to the screen from the fireworks array

      //check if depleted is true.
      if(fireworks[i].depleted){
        fireworks.splice(i,1); // remove the firework constrctor object from the array
      }
    }
  }

}
