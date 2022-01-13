/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* A CanvasGame that implements collision detection.                       */
/* The game allows the user to walk a skeleton around a maze.              */
/* If the skeleton is guided to the maze exit, then a win message appears. */

class TowerCanvasGame extends CanvasGame
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
        this.prevHeight = 0;
        this.endGame = false;
    }

    collisionDetection()
    {
      
        if(!platform_down && !character_down && !background_down)
        {
            MOVE_SCREEN_DOWN = false;
        }


        if(MOVE_SCREEN_DOWN){

            gameObjects[CHARACTER].moveScreen()

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
            this.endGame = true
            console.log("try again")
        
        }

        if(this.endGame)
        {
            // gameObjects[CHARACTER].setY(canvas.height-100)
            TRY_AGAIN = false
            //console.log(gameObjects[CHARACTER])
        }
     
        if(counterClick==0)
        {
          
            //gameObjects[TRY_AGAIN_TEXT].stopAndHide()
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
                if(gameObjects[CHARACTER].getDirection() === LEFT){
                    gameObjects[CHARACTER].setDirection(UP_LEFT);
                } 
                else if(gameObjects[CHARACTER].getDirection() === RIGHT){
                    gameObjects[CHARACTER].setDirection(UP_RIGHT);
                }
                else if(gameObjects[CHARACTER].getDirection() === STOPPED_LEFT){
                    gameObjects[CHARACTER].setDirection(UP_LEFT);
                }
                else if(gameObjects[CHARACTER].getDirection() === STOPPED_RIGHT){
                    gameObjects[CHARACTER].setDirection(UP_RIGHT);
                }
             }, false);
        
        }

        // player has lost
        if(gameObjects[CHARACTER].getCentreY()>canvas.height+10 && !TRY_AGAIN && fell_down && player_lifes==0)
        {
            gameObjects[SECOND_TRY].stopAndHide()
            try {
                if(height>best_height && this.update_counter<1)
                {
             
                    db.collection("users").doc(user_document).set({
                        best_score: height,
                    }, {merge: true})
                    .then(() => {
                        this.update_counter += 1
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                }
            } catch(e) {

            }
           

            for (let i = BORDERS; i < gameObjects.length-2; i++) /* stop all gameObjects from animating */
            {
                if(gameObjects[i]!=null){
                    gameObjects[i].stop();
                }
            }
             clearGame()
        }
      
        // player has second chance
        if(gameObjects[CHARACTER].getCentreY()>canvas.height+10 && !TRY_AGAIN && !fell_down){

            gameObjects[SECOND_TRY] = new InfoText("SECOND CHANCE !", canvas.width - 120, 50, "Nerko One", 30, "red", true)
            gameObjects[SECOND_TRY].start()

            gameObjects[CHARACTER].bounceJump(true);
            
            if (gameObjects[CHARACTER].getDirection() === UP_RIGHT)
            {
                gameObjects[CHARACTER].setDirection(UP_RIGHT);
            }
         
            if (gameObjects[CHARACTER].getDirection() === UP_LEFT)
            {
                gameObjects[CHARACTER].setDirection(UP_LEFT);
            }
            if (gameObjects[CHARACTER].getDirection() === STOPPED_RIGHT)
            {
                gameObjects[CHARACTER].setDirection(UP_RIGHT);
            }
         
            if (gameObjects[CHARACTER].getDirection() === STOPPED_LEFT)
            {
                gameObjects[CHARACTER].setDirection(UP_LEFT);
            }
            if (gameObjects[CHARACTER].getDirection() === LEFT)
            {
                gameObjects[CHARACTER].setDirection(UP_LEFT);
            }
            if (gameObjects[CHARACTER].getDirection() === RIGHT)
            {
                gameObjects[CHARACTER].setDirection(UP_RIGHT);
            }
            
            fell_down = true;
            player_lifes = 0;
           
        }


        if (gameObjects[CHARACTER].getDirection() === UP_RIGHT)
        {
         
            if (gameObjects[CHARACTER].getCentreX() + 50 > canvas.width)
            {
                gameObjects[CHARACTER].bounceJump(true);
            }
        }


        if (gameObjects[CHARACTER].getDirection() === UP_LEFT)
        {   
         
         
            if (gameObjects[CHARACTER].getCentreX() - 50 < 0)
            {
                gameObjects[CHARACTER].bounceJump(true);
            }
        
        }
     


        if (gameObjects[CHARACTER].getDirection() === UP_LEFT)
        {        
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[CHARACTER].getCentreX(), gameObjects[CHARACTER].getCentreY())){
                 
                } else {
                  
                }
            }
        }
        else if (gameObjects[CHARACTER].getDirection() === UP_RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[CHARACTER].getCentreX(), gameObjects[CHARACTER].getCentreY())){
                  
                } else {
                   
                   
                }
            }
        }
        else if (gameObjects[CHARACTER].getDirection() === RIGHT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[CHARACTER].getCentreX(), gameObjects[CHARACTER].getCentreY())){
                  
                } else {
                    gameObjects[i].fallOffPlatform()
                }
            }
        }
        else if (gameObjects[CHARACTER].getDirection() === LEFT)
        {
            for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
                if(gameObjects[i].playerIsInsidePlatform(gameObjects[CHARACTER].getCentreX(), gameObjects[CHARACTER].getCentreY())){
                 
                } else {
                    gameObjects[i].fallOffPlatform()
                }
            }
        }
    }
}