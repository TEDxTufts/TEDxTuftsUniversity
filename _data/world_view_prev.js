e.preventDefault();
		var that = this;

		var mwidth = 64;
		var mheight = 64;
		var mxpos = 590;
		var mypos = 10;

		console.log("CANVAS CLICK", e.clientX,e.clientY);
		//console.log(TFApp.views.worldView.minimap);

		var vector = new THREE.Vector3( 
			( (e.clientX - this.$gameWrapper.offset().left) / this.$gameWrapper.width() ) * 2 - 1, 
		  - ( (e.clientY - (this.$gameWrapper.offset().top - $(window).scrollTop())) / this.$gameWrapper.height() ) * 2 + 1, 
		  	0.5 );

		var click = {};
		click.x = (vector.x + 1 )/ 2 * 960;
		click.y = (vector.y + 1 )/ 2 * 600;
		//click.x = e.clientX - this.$gameWrapper.offset().left;
		//click.y = e.clientY + this.$gameWrapper.offset().top;

		// If click is outside of minimap
		if( click.x > mxpos + mwidth  || click.x < mxpos || 
			click.y > mypos + mheight || click.y < mypos) {
			// Handle movement in game
			var vector = new THREE.Vector3( 
				( (e.clientX - this.$gameWrapper.offset().left) / this.$gameWrapper.width() ) * 2 - 1, 
		  	- ( (e.clientY - (this.$gameWrapper.offset().top - $(window).scrollTop())) / this.$gameWrapper.height() ) * 2 + 1, 
		  		0.5 );
			that.projector.unprojectVector( vector, this.camera );

			var raycaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( this.scene.children, true );
			if ( intersects.length > 0 ) {
				var clicked=intersects[0];
				var clickedObject = clicked.object;

				var pos = {x: Math.floor(clicked.point.x), y: Math.floor(clicked.point.z)};
			
				TFApp.models.currentWorldModel.set("selectedTileCoords", pos);
				this.selectedTile = clicked.object;

				if(this.clickAction){
					this.clickAction();
				}
			}
		// Handle minimap interaction
		} else {
			console.log(click.x);
			var vector = new THREE.Vector3( 
				( (e.clientX - this.$gameWrapper.offset().left) / this.$gameWrapper.width() ) * 2 - 1, 
		  	- ( (e.clientY - (this.$gameWrapper.offset().top - $(window).scrollTop())) / this.$gameWrapper.height() ) * 2 + 1, 
		  		0.5 );
			that.projector.unprojectVector( vector, this.camera );

			var raycaster = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( this.scene.children, true );
			if ( intersects.length > 0 ) {
				var clicked=intersects[0];
				var clickedObject = clicked.object;

				var pos = {x: Math.floor(clicked.point.x), y: Math.floor(clicked.point.z)};
			
				TFApp.models.currentWorldModel.set("selectedTileCoords", pos);
				this.selectedTile = clicked.object;

				if(this.clickAction){
					this.clickAction();
				}
			}
		}