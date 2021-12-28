/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* A CanvasGame that implements collision detection.                       */
/* The game allows the user to walk a skeleton around a maze.              */
/* If the skeleton is guided to the maze exit, then a win message appears. */

class MazeSkeletonCanvasGame extends CanvasGame
{
    constructor(image)
    {
        super();

        /* this.bordersCtx will be used for collision detection */
        let mazeOffscreenCanvas = document.createElement('canvas');
        this.bordersCtx = mazeOffscreenCanvas.getContext('2d');
        mazeOffscreenCanvas.width = canvas.width;
        mazeOffscreenCanvas.height = canvas.height;
        this.bordersCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
		console.log("W2:"+canvas.width);
		console.log("H2:"+canvas.width);
        this.stay = false;
      
      
    }

    collisionDetection()
    {
      
        // todo
        // if(gameObjects[SKELETON].getCentreY()<0){
        //     for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
        //         gameObjects[i].moveScene(i)
        //         gameObjects[SKELETON].moveScene(i)
        //   }
        // }

        if(gameObjects[SKELETON].getCentreY()>canvas.height+10){

            for (let i = 0; i < gameObjects.length-1; i++) /* stop all gameObjects from animating */
            {
                if(gameObjects[i]!=null){
                    gameObjects[i].stop();
                }
               
            }
            console.log(gameObjects)
         
         
            gameObjects[LOST_TEXT] = new InfoText("You Lost !", 40, 300, "Times Roman", 50, "red");
            gameObjects[LOST_TEXT].start(); 
            gameObjects[TRY_AGAIN_TEXT] = new ButtonText("Try again", 20, 400, "Times Roman", 50, "red");
            gameObjects[TRY_AGAIN_TEXT].start();
        }


        if (gameObjects[SKELETON].getDirection() === UP_RIGHT)
        {
         
            if (gameObjects[SKELETON].getCentreX() + 50 > canvas.width)
            {
                gameObjects[SKELETON].bounceJump(true);
            }
        }


        if (gameObjects[SKELETON].getDirection() === UP_LEFT)
        {   
         
         
            if (gameObjects[SKELETON].getCentreX() - 50 < 0)
            {
                gameObjects[SKELETON].bounceJump(true);
            }
        
        }
     


        if (gameObjects[SKELETON].getDirection() === UP_LEFT)
        {        
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                 
                } else {
                  
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === UP_RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                  
                } else {
                   
                   
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                  
                } else {
                    gameObjects[i].fallOffPlatform()
                }
            }
        }
        else if (gameObjects[SKELETON].getDirection() === LEFT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[SKELETON].getCentreX(), gameObjects[SKELETON].getCentreY())){
                 
                } else {
                    gameObjects[i].fallOffPlatform()
                }
            }
        }
    }
}