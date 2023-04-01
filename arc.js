// Code below from https://openprocessing.org/sketch/1251043
// I have modified the code in my application

// Create a constructor called Arc
function Arc(cen_x, cen_y, dis, w, r, g, b, alp, fill, split_num, gap_ang, ang){

	this.cen_x = cen_x ; // x-coordinate of the arc's origin
	this.cen_y = cen_x ; // y-coordinate of the arc's origin
	this.dist = dis; // distance from the arc's origin
	this.arcWidth = w; // width of the arc
	this.red = r; // rgb red color value
	this.green = g; // rgb green color value
	this.blue = b; // rgb blue color value
	this.alp = alp; // alpha value for the colour
	this.fill = fill; // fill value
	this.split_num = split_num; // number of arcs split around the circumference of the circle
	this.gap_ang = gap_ang; //  gap angle between each arc
	this.ang = -90; // angle of rotation of the arc


	this.show = function(ang){

		this.ang = ang; // angle of rotation of the arc

		graphics.stroke(this.red,this.green,this.blue,this.alp);
		graphics.strokeWeight(this.arcWidth);

    // fill with given colour if this.fill value is 1
		if(this.fill == 1){
			graphics.fill(this.red,this.green,this.blue,this.alp)
		}
		else{
			graphics.noFill();
		}

    // split and spread the arcs evenly around the circumference of the circle
		for(let i = 0; i < this.split_num; i++){
			this.sang = this.ang + this.gap_ang/2 + i*(360/this.split_num); // angle to start the arc
			this.eang = this.ang + (i+1)*(360/this.split_num) - (this.gap_ang/2); // angle to stop the arc
      // arc parameters to draw the arc
			graphics.arc(this.cen_x, this.cen_y, this.dist, this.dist, radians(this.sang), radians(this.eang));
		}
	}
}
