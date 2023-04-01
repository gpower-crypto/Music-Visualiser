// displays and handles clicks on the menu button.
function MenuButton(){

	this.x = 20; // x position of the button
	this.y = 55; // y position of the button
	this.width = 20; // button width
	this.height = 4; // button height

	// draw the menu button
	this.draw = function(){
		rect(this.x, this.y, this.width, this.height);
    rect(this.x, this.y+5, this.width, this.height);
		rect(this.x, this.y+10, this.width, this.height);
	};

	// returns true if clicked, false otherwise
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y-5 && mouseY < this.y + 15){
  			return true;
		}
			return false;
	};
}
