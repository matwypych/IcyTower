/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* A CanvasGame that implements collision detection.                       */
/* The game allows the user to walk a skeleton around a maze.              */
/* If the skeleton is guided to the maze exit, then a win message appears. */

class MazeSkeletonCanvasGame extends CanvasGame
{
    constructor(mazeGridImage)
    {
        super();

        /* this.mazeCtx will be used for collision detection */
        let mazeOffscreenCanvas = document.createElement('canvas');
        this.mazeCtx = mazeOffscreenCanvas.getContext('2d');
        mazeOffscreenCanvas.width = canvas.width;
        mazeOffscreenCanvas.height = canvas.height;
        this.mazeCtx.drawImage(mazeGridImage, 0, 0, canvas.width, canvas.height);
		console.log("W2:"+canvas.width);
		console.log("H2:"+canvas.width);

        this.stay = false;
    }

    collisionDetection()
    {
        if (gameObjects[SKELETON].getDirection() === UP_LEFT)
        {        
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                   // console.log("FLY")
                } else {
                  
                   // console.log("RUN")
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === UP_RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                  //  console.log("FLY")
                } else {
                   
                  //  console.log("RUN")
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                  this.stay = true;
                } else {
                    if(!this.stay) {
                        gameObjects[i].fallOffPlatform()
                    }
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === LEFT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                    this.stay = true;
                } else {
                    if(!this.stay) {
                        gameObjects[i].fallOffPlatform()
                    }
                   
                }
            }
        }
    }
}