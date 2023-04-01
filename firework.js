function Firework(colour, x, y){

  this.colour = colour;
  this.x = x;
  this.endPoint = y; // endpoint for the firework rocket

  var particles = []; // particles array

  // initialise the y-coordinate of the firework rocket
  var y_rocket = 500;

  this.depleted = false; // firework particles are depleted after their lifetime is over

  for (let i = 0; i < 60; i++) {
    // make a new 2D unit vector from a random angle for each particle (velocity vector)
    var velFireworkParticle = p5.Vector.random2D();

    // each particle has a random velocity between 2 and 10
    velFireworkParticle.mult(random(3,10));

    // store the FireworkParitcle construtor in the particles array
    particles.push(new FireworkParticle(this.x, this.endPoint, velFireworkParticle, this.colour, true));
  }

  //draw the particles from the Particle construtor function
  this.draw = function(){

  //make the firework rocket move upwards
  y_rocket -= 15;

  //if the rocket has crossed the set endpoint
  if(y_rocket <= this.endPoint){
    for(let i = 0; i < particles.length; i++){
      particles[i].draw();
      particles[i].update();
    }
  }
  else{
    //draw the firework rocket moving upwards
    stroke(255);
    strokeWeight(1.5);
    line(this.x, y_rocket, this.x, y_rocket + 35);
  }

  //check if particle's lifetime has decreased below zero
  if(particles[0].lifetime <= 0){
    this.depleted = true;
  }
 }
}
