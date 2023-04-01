// displays and handles clicks on the fullscreen button.
function FullscreenButton(){

	this.x = 31; // x position of the button
	this.y = 95; // y position of the button
	this.size = 7; // button size

	this.isClicked = false;

  // draw fullscreen button
	this.draw = function(){
    push();
    stroke(255)
		if(this.isClicked == false){
			// large screen button
			// arrow one
	  	line(this.x + 2, this.y + 2, this.x + this.size,this.y + this.size); // Diagonal
	  	line(this.x + 2, this.y + this.size, this.x + this.size, this.y + this.size); // right
	  	line(this.x + this.size, this.y + 2, this.x + this.size, this.y + this.size); // up
	    // arrow two
	  	line(this.x - 2, this.y - 2, this.x - this.size, this.y - this.size); //Diagonal
	  	line(this.x - this.size, this.y - 2, this.x - this.size, this.y - this.size); // down
	  	line(this.x - 2, this.y - this.size, this.x - this.size, this.y - this.size); // right
		}
		else{
			// small screen button
			// arrow one
			line(this.x+1, this.y+1, this.x+this.size-1, this.y+this.size-1); // Diagonal
			line(this.x+1, this.y, this.x+this.size-2, this.y);  // right
			line(this.x, this.y, this.x, this.y+this.size-2); // down
			// arrow two
			line(this.x-4, this.y-4, this.x-this.size-2, this.y-this.size-2); //Diagonal
			line(this.x-3.2, this.y-4, this.x-3.2, this.y-this.size-1); // down
			line(this.x-4, this.y-3.3, this.x-this.size-1, this.y-3.3); // left
		}
    pop();
	};

	// returns true if clicked false otherwise
	this.hitCheck = function(){
		if(mouseX > this.x-10 && mouseX < this.x + 25 && mouseY > this.y-15 && mouseY < this.y+5){
			  this.isClicked = !this.isClicked;
  			return true;
		}
			return false;
	};
}
