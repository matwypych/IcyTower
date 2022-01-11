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
        this.distance = 500;
        this.update_counter = 0;
    }

    collisionDetection()
    {
      
        if(!platform_down && !character_down && !background_down)
        {
            MOVE_SCREEN_DOWN = false;
        }


        if(MOVE_SCREEN_DOWN){

            gameObjects[SKELETON].moveScreen()

            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                gameObjects[i].moveScreen()
            }

              // init background images
              for(j = BACKGROUND_START; j < BACKGROUND_END; j++) {
                gameObjects[j].moveScreen()
              }
        }

        // set try again screen
        if(TRY_AGAIN)
        {
            counterClick = -10;
        }

     
        if(counterClick==0)
        {
            gameObjects[TRY_AGAIN_TEXT].stopAndHide()
            gameObjects[LOST_TEXT].stopAndHide()
            gameObjects[LOST_TEXT_SCORE].stopAndHide()
            gameObjects[CONFETTI_GIF].stopAndHide()
        }

      
        
        if(NEW_RECORD)
        {
            gameObjects[CONFETTI_GIF].start()
        }

        if(counterClick>0){

            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                gameObjects[i].start()
            }

            canvas.addEventListener('click', function() {
                if(gameObjects[SKELETON].getDirection() === LEFT){
                    gameObjects[SKELETON].setDirection(UP_LEFT);
                } 
                else if(gameObjects[SKELETON].getDirection() === RIGHT){
                    gameObjects[SKELETON].setDirection(UP_RIGHT);
                }
                else if(gameObjects[SKELETON].getDirection() === STOPPED_LEFT){
                    gameObjects[SKELETON].setDirection(UP_LEFT);
                }
                else if(gameObjects[SKELETON].getDirection() === STOPPED_RIGHT){
                    gameObjects[SKELETON].setDirection(UP_RIGHT);
                }
             }, false);
        
        }

        if(counterClick===-10){
            canvas.addEventListener('click', function() {
               console.log("retry")
               counterClick=0;
               window.location.reload()
             }, false);
        }
      
       
   

        // player has lost
        if(gameObjects[SKELETON].getCentreY()>canvas.height+10){

            gameObjects[LOST_TEXT].start();
            gameObjects[LOST_TEXT_SCORE].setHeight(height);
            gameObjects[LOST_TEXT_SCORE].start();
            gameObjects[TRY_AGAIN_TEXT].start()
        
 
            if(height>best_height && this.update_counter<1)
            {
                this.update_counter += 1
                db.collection("users").doc(user_document).set({
                    best_score: height,
                }, {merge: true})
                .then(() => {
                   
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }

            for (let i = BORDERS; i < gameObjects.length-3; i++) /* stop all gameObjects from animating */
            {
                if(gameObjects[i]!=null){
                    gameObjects[i].stopAndHide();
                }
            }
          
            //window.location.reload()
            TRY_AGAIN = true;
        
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