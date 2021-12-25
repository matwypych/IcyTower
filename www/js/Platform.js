/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Platform extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, number, x, y, width, height, updateStateMiliseconds, isOnPlatform)
    {
        super(updateStateMiliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
      
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        console.log("Platform" , number, "position (x,y): " + this.x + ", " + this.y) 
        this.centreY = this.getCentreY();   
        this.centreX = this.getCentreX();
        console.log(this.centreX)  
        console.log(this.centreY)
        this.playerIsOnPlatform = isOnPlatform
        this.number = number;
        this.jump = false;
        this.visited = false;
        
        console.log(this.getStartPositionX(), this.getStartPositionY(),width,height)
    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y-8, this.width, this.height);
    }

    getStartPositionX()
    {
        return this.x
    }

    getEndPositionX()
    {
        return this.x + this.width;
    }

    getStartPositionY()
    {
        return this.y - this.height/2
    }

    getEndPositionY()
    {
        return this.y + this.height/2
    }

    fallOffPlatform(){
        if(this.visited & !this.getPlayerIsOnPlatform() ){
            console.log("Is player is inside platform nr: " + this.number+ " " + this.getPlayerIsOnPlatform())
            if(gameObjects[SKELETON].getDirection() == RIGHT){
                gameObjects[SKELETON].setCollision(true)
            }
            
            else if(gameObjects[SKELETON].getDirection() == LEFT){
                gameObjects[SKELETON].setCollision(true)
            }
        }
    }

    playerIsInsidePlatform(playerX, playerY)
    {
        let WIDTH_OF_SKELETON_ON_CANVAS = 50;
        let HEIGHT_OF_SKELETON_ON_CANVAS = 90;
        ctx.strokeRect(this.getStartPositionX(), this.getStartPositionY(),this.width,this.height);
        // console.log("playerX: " + playerX + ", playerY: " + playerY)
        // console.log("platformStartX: " + this.getStartPositionX() + ", platformEndX: " + this. getEndPositionX())
        // console.log("platformStartY: " + this.getStartPositionY() + ", platformEndY: " + this. getEndPositionY())

        playerY = playerY - HEIGHT_OF_SKELETON_ON_CANVAS
        
    
        
        // player collided with a platform
        if((playerY > this.getStartPositionY() &&  playerY < this.getEndPositionY()) && 
            (playerX - WIDTH_OF_SKELETON_ON_CANVAS/2  < this.getEndPositionX() && playerX + WIDTH_OF_SKELETON_ON_CANVAS/2 > this.getStartPositionX()) )
        {
            if(gameObjects[SKELETON].getDirection() == UP_LEFT){
                gameObjects[SKELETON].setCollision(true);
            }
            else if(gameObjects[SKELETON].getDirection() == UP_RIGHT){
                gameObjects[SKELETON].setCollision(true);
               
            } else if(gameObjects[SKELETON].getDirection() == STOPPED_LEFT){
                console.log("PlayerIsInsidePlatform")
            } else if(gameObjects[SKELETON].getDirection() == STOPPED_RIGHT){
                console.log("PlayerIsInsidePlatform")
            }                 
        }

        // player is on a platform
        else if((playerY + HEIGHT_OF_SKELETON_ON_CANVAS - 5 > this.getStartPositionY() + 3 &&  playerY + HEIGHT_OF_SKELETON_ON_CANVAS - 5 < this.getEndPositionY() + 3 ) && 
            (playerX + WIDTH_OF_SKELETON_ON_CANVAS/2 > this.getStartPositionX() + 40 && playerX - WIDTH_OF_SKELETON_ON_CANVAS/2  < this.getEndPositionX()) )
        {
            
            console.log("Is player is inside platform nr: " + this.number+ " " + this.getPlayerIsOnPlatform())
         
            this.visited = true;
            if(gameObjects[SKELETON].getDirection() == UP_LEFT){
                if(!this.jump){
                    if(this.getPlayerIsOnPlatform()){
                        gameObjects[SKELETON].setY(-15)
                        this.jump = true;
                        this.setPlayerIsOnPlatform(false)
                    } else {
                        // gameObjects[SKELETON].setCollision();
                        gameObjects[SKELETON].setDirection(STOPPED_LEFT);
                        gameObjects[SKELETON].resetSpeed();
                        this.setPlayerIsOnPlatform(true)
                    }
                } else {
                    if(this.getPlayerIsOnPlatform()) {
                        this.setPlayerIsOnPlatform(false)
                      
                    } else {
                        // gameObjects[SKELETON].setCollision();
                        gameObjects[SKELETON].setDirection(STOPPED_RIGHT);
                        gameObjects[SKELETON].resetSpeed();
                        this.setPlayerIsOnPlatform(true)
                    }
                }

            }
            else if(gameObjects[SKELETON].getDirection() == UP_RIGHT){
                if(!this.jump){
                    if(this.getPlayerIsOnPlatform()) {
                        gameObjects[SKELETON].setY(-15)
                        this.jump = true;
                        this.setPlayerIsOnPlatform(false)
                    } else {
                        // gameObjects[SKELETON].setCollision();
                        gameObjects[SKELETON].setDirection(STOPPED_RIGHT);
                        gameObjects[SKELETON].resetSpeed();
                        this.setPlayerIsOnPlatform(true)
                    }
                } else {
                    if(this.getPlayerIsOnPlatform()) {
                        this.setPlayerIsOnPlatform(false)
                        gameObjects[SKELETON].setY(-15)
                    } else {
                        // gameObjects[SKELETON].setCollision();
                        gameObjects[SKELETON].setDirection(STOPPED_RIGHT);
                        gameObjects[SKELETON].resetSpeed();
                        this.setPlayerIsOnPlatform(true)
                    }
                }
            }
            else if(gameObjects[SKELETON].getDirection() == RIGHT){
                this.setPlayerIsOnPlatform(true)
            }  
            else if(gameObjects[SKELETON].getDirection() == LEFT){
                this.setPlayerIsOnPlatform(true)
            }  
        }
        
        else {
            console.log("Is player is inside platform nr: " + this.number+ " " + this.getPlayerIsOnPlatform())
            this.setPlayerIsOnPlatform(false)
        }
     
        return this.getPlayerIsOnPlatform()
    }


    // updateState() 
    // {
    //     console.log(this.getPlayerIsOnPlatform()) 

    //     if(this.getPlayerIsOnPlatform()){
    //         let WIDTH_OF_SKELETON_ON_CANVAS = 90;
          
    //         if(this.x - WIDTH_OF_SKELETON_ON_CANVAS/2  > this.getEndPositionX() && this.x + WIDTH_OF_SKELETON_ON_CANVAS/2 < this.getStartPositionX()) 
    //         {
    //          console.log("Nope")
    //              return false
    //         } 
    //         else {
    //          console.log("Yes")
    //          return true 
    //         } 
    //     }
    // }

    getPlayerIsOnPlatform()
    {
        return this.playerIsOnPlatform
    }

    setPlayerIsOnPlatform(state)
    {
        this.playerIsOnPlatform = state;
    }

    getCentreX()
    {
        return this.x + this.width/2;
    }

    getCentreY()
    {
        return this.y + this.height/2;
    }
}