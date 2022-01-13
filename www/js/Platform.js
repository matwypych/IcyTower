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
        //console.log("Platform" , number, "position (x,y): " + this.x + ", " + this.y) 
        this.centreY = this.getCentreY();   
        this.centreX = this.getCentreX();
       // console.log(this.centreX)  
       // console.log(this.centreY)
        this.playerIsOnPlatform = isOnPlatform
        this.number = number;
        this.jump = false;
        this.visited = false;
        this.currentPlatform = false;
        this.moveScene = false;
        this.moveScreenValue = 0;
       // console.log(this.getStartPositionX(), this.getStartPositionY(),width,height)
        this.degrees = 0;
        this.movement_direction = getRandomInt(-1,2);
        while(this.movement_direction==0){
            this.movement_direction = getRandomInt(-1,2);
        }
        this.speed = getRandomInt(0,5);
        console.log(this.movement_direction)
    }

    render()
    {
        // ctx.save(); // remember the state of the canvas prior to the rotation
        // ctx.translate(this.x, this.y);
        // ctx.rotate(Math.radians(this.degrees));
        // ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height+4);
        //ctx.restore();
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
        if(this.currentPlatform){
            gameObjects[CHARACTER].fallOff(true)
            this.currentPlatform = false; 
        }
    }

    getSpeed()
    {
        return this.speed
    }

    playerIsInsidePlatform(playerX, playerY)
    {
        let WIDTH_OF_CHARACTER_ON_CANVAS = 50;
        let HEIGHT_OF_CHARACTER_ON_CANVAS = 90;
        ctx.strokeRect(this.getStartPositionX(), this.getStartPositionY(),this.width,this.height);
        // console.log("playerX: " + playerX + ", playerY: " + playerY)
        // console.log("platformStartX: " + this.getStartPositionX() + ", platformEndX: " + this. getEndPositionX())
        // console.log("platformStartY: " + this.getStartPositionY() + ", platformEndY: " + this. getEndPositionY())

        playerY = playerY - HEIGHT_OF_CHARACTER_ON_CANVAS
        

        // player collided with a platform
        if((playerY > this.getStartPositionY() &&  playerY < this.getEndPositionY()) && 
            (playerX - WIDTH_OF_CHARACTER_ON_CANVAS/2  < this.getEndPositionX() && playerX + WIDTH_OF_CHARACTER_ON_CANVAS/2 > this.getStartPositionX()) )
        {
            if(gameObjects[CHARACTER].getDirection() == UP_LEFT){
                gameObjects[CHARACTER].setCollision(true);
            }
            else if(gameObjects[CHARACTER].getDirection() == UP_RIGHT){
                gameObjects[CHARACTER].setCollision(true);
               
            } else if(gameObjects[CHARACTER].getDirection() == STOPPED_LEFT){
                //console.log("PlayerIsInsidePlatform")
            } else if(gameObjects[CHARACTER].getDirection() == STOPPED_RIGHT){
               // console.log("PlayerIsInsidePlatform")
            }                 
        }

        // player is on a platform
        else if((playerY + HEIGHT_OF_CHARACTER_ON_CANVAS - 5 > this.getStartPositionY() + 8 && playerY + HEIGHT_OF_CHARACTER_ON_CANVAS - 5 < this.getEndPositionY() + 3 ) && 
            (playerX + WIDTH_OF_CHARACTER_ON_CANVAS/2 > this.getStartPositionX() + 40 && playerX - WIDTH_OF_CHARACTER_ON_CANVAS/2  < this.getEndPositionX()) )
        {


            if(!this.visited){
                height = this.number*100 - 1200;
            }

            this.visited = true;

            if(this.number>=PLATFORM_START){
                MOVE_SCREEN = true;
            }
            this.currentPlatform = true;
            if(gameObjects[CHARACTER].getDirection() == UP_LEFT){
                if(this.getPlayerIsOnPlatform()){
                    gameObjects[CHARACTER].setY(-15)
                    this.currentPlatform = false;
                    this.setPlayerIsOnPlatform(false)
                } else  {
                  //  console.log("Stayed on platform 1", this.getPlayerIsOnPlatform())
                    // gameObjects[CHARACTER].setCollision();
                    gameObjects[CHARACTER].setDirection(STOPPED_LEFT);
                    gameObjects[CHARACTER].resetSpeed();
                    this.setPlayerIsOnPlatform(true)
                    gameObjects[CHARACTER].setMovement(this.movement_direction, this.speed)
                  
                }           
            }
            else if(gameObjects[CHARACTER].getDirection() == UP_RIGHT){
              
                if(this.getPlayerIsOnPlatform()) {
                   // console.log("Was Stayed on platform", this.getPlayerIsOnPlatform())
                    gameObjects[CHARACTER].setY(-15)
                    this.currentPlatform = false;
                    this.setPlayerIsOnPlatform(false)
                } else {
                   // console.log("Stayed on platform 1", this.getPlayerIsOnPlatform())
                    // gameObjects[CHARACTER].setCollision();
                    gameObjects[CHARACTER].setDirection(STOPPED_RIGHT);
                    gameObjects[CHARACTER].resetSpeed();
                    this.setPlayerIsOnPlatform(true)
                    gameObjects[CHARACTER].setMovement(this.movement_direction, this.speed)
                   // console.log("Changing platform:", this.number, " to:", this.getPlayerIsOnPlatform())
                }
     
            }
         
        }
        
        else {
            this.setPlayerIsOnPlatform(false)
        }
     
        return this.getPlayerIsOnPlatform()
    }


    moveScreen()
    {
        platform_down = true
      
    }

    updateState() 
    {
    
        if(this.x<10 || this.x > canvas.width - 140)
        {
            this.movement_direction *= -1 
        }   
        this.x += this.movement_direction *this.speed;
    
        
        this.degrees += 10;

        if(platform_down)
        {
            if(this.moveScreenValue < MOVE_SCREEN_VALUE)
            {
                console.log("move down everything");
                this.y += 10;
                this.moveScreenValue += 1;
            } else {
                this.moveScene = false;
                this.moveScreenValue = 0;
                platform_down = false;
            }
        }
          //check if is new record
          if(height>best_height)
          {
            NEW_RECORD = true;
          }

        if(MOVE_SCREEN){
            this.y += HEIGHT_MULTIPLIER;
            HEIGHT_MULTIPLIER += 0.00001
        }
    }

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

    moveScene(value)
    {
        this.y += value;
    }
}