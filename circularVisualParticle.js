// For the code below, I watched a tutorial vedio on youtube to implement
// particle system, link here https://www.youtube.com/watch?v=uk96O7N1Yo0

// I have modified and implemented code below

//generates the particles for particle system
function CircularVisualParticle(){

  //creates a new 2D position vector form a random angle around a radius of 240
  this.pos = p5.Vector.random2D().mult(180);

  //creates a vector with x and y components as 0
  this.velocity = createVector(0,0);

  //the acceleration vector should have the same direction as position vector
  this.acceleration = this.pos.copy().mult(random(0.0002, 0.00001));

  //width of each particle
  this.width = random(2,4);

  //colour of particles
  this.color = [random(200,255), random(200,255), random(200,255)];

  //draw the particles to the screen
  this.draw = function(){
    noStroke();
    fill(this.color);

    //each particle is an ellipse with random vector coordinates
    ellipse(this.pos.x, this.pos.y, this.width);
  }

  //to update the position of the particle
  this.update = function(cond){
    this.velocity.add(this.acceleration);

    //update the position vector in the same direction
    this.pos.add(this.velocity);

    if(cond){
      for(let i=0; i<5; i++){
        this.pos.add(this.velocity);
      }
    }
  }

  //check if the position of the particle has exceeded the boundries of the canvas
  this.edges = function(){
    if(this.pos.x < -width/2 || this.pos.x > width/2 ||
      this.pos.y < -height/2 || this.pos.y > height/2){
        return true;
       }
    else{
      return false
    }
  }

}
