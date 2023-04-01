 // Constructor function to handle the onscreen menu, keyboard and mouse
// controls
function ControlsAndInput(){

	this.menuDisplayed = false;

	//--------- store the constructor functions in an object

	// playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

  // menu button displayed in the top left of the screen
	this.menuButton = new MenuButton();

	// fullscreen button displayed in the top left of the screen
	this.fullscreenButton = new FullscreenButton();

  //---------

	// make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		// check if the playback button has been clicked
		var isPlaybackButtonClicked = this.playbackButton.hitCheck();

    // check if the menu button has been clicked
		var isMenuButtonClicked = this.menuButton.hitCheck();

    // check if the fullscreen button has been clicked
		var isFullscreenButtonClicked = this.fullscreenButton.hitCheck();

		// display menu if menu Button is clicked
		if(isMenuButtonClicked){
			this.menuDisplayed = !this.menuDisplayed;
		}

    // if not make the visualisation fullscreen
    if(isFullscreenButtonClicked){
        let fs = fullscreen();
        fullscreen(!fs);
    }
	};

	// responds to keyboard presses
	// @param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
			if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			var visualName = vis.visuals[visNumber].name;

			vis.selectVisual(visualName);

			// function call to display the gui controls for the Bumpy Sphere extension
			bumpySphere.showBumpySphereGui(visualName);

			// function call to display the gui controls for the Perlin Noise Terrain extension
			perlinNoiseTerrain.showTerrainGui(visualName);

			// function call to display the gui controls for the CircularVisual extension
			circularVisual.showCircularVisualGui(visualName);
		}
	};

	// draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(14);

		// playback button
		this.playbackButton.draw();
		this.menuButton.draw();
		this.fullscreenButton.draw();

		// only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
			text("Select a visualisation: (keyboard 1, 2, 3 or 4)", 95, 30);
			this.menu();
		}
		pop();
	};

	this.menu = function(){
		// draw out menu items for each visualisation
        for(var i=0;i<vis.visuals.length;i++){
            text((i+1)+": "+vis.visuals[i].name,95,30+(i+1)*35);
        }
	};
}
