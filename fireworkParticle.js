function FireworkParticle(x, y, velParticle, colour, isExploded){

  this.pos = createVector(x, y); // vector position of firework particle
  this.velParticle = velParticle; //velocity of particles
  this.acc = createVector(0, 0.1); // acceleration of particles
  this.colour = colour; // particle colour
  this.isExploded = isExploded; // variable to determine if particles have exploded
  this.lifetime = 250; // lifetime of paritcles in each firework

  //draw each particle to the screen
  this.draw = function(){
    stroke(colour);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
  }

  //update each paritcle's position and velocity
  this.update = function(){
    this.velParticle.mult(0.9); // particle velocity
    this.lifetime -= 8; // decrement lifetime of the particles
    this.pos.add(this.velParticle); // add velocty to the position vector to move the particles with certain velocity
  }
}
