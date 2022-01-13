/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Character extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(skeletonImage, centreX, centreY, updateStateMiliseconds)
    {
        super(updateStateMiliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.centreX = centreX;
        this.centreY = centreY;
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 3; // the number of rows and columns in the gameObject
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 6; // the number of rows and columns in the gameObject

        this.playerIsOnPlatform = false;

        this.column = 0;
        this.animationStartDelay = 0;
        this.skeletonImage = skeletonImage;

        this.SPRITE_WIDTH = (this.skeletonImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.skeletonImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);

        console.log(this.SPRITE_WIDTH)
        console.log(this.SPRITE_HEIGHT)

        this.colission = false;
        this.fall = false;
        this.bounce = false;

        this.setDirection(STOPPED_LEFT);

        this.FALLING_SPEED = 1;
        this.HORIZONTAL_SPEED = 1;
        this.BOUNCE_SPEED = 14;
        this.distance = 0;

        this.moveScene = false;
        this.moveScreenValue = 0;

        this.move_character = false;
        this.direction_of_movement = 0;

    
    }

    setMovement(direction, speed) 
    {
        this.move_character = true;
        this.direction_of_movement = direction;
        this.direction_of_movement *= speed;
    }

    moveScreen()
    {
        this.moveScene = true
    }

    updateState()
    {
        if(this.move_character)
        {
            console.log("move", this.direction_of_movement)
            this.centreX += this.direction_of_movement  
        }
        if(character_down)
        {
            if(this.moveScreenValue<MOVE_SCREEN_VALUE)
            {
                console.log("move down everything");
                this.centreY += 10;
                this.moveScreenValue +=1;
            } else {
                character_down = false;
                this.moveScreenValue = 0;
                character_down = false;
            }
           
           
        }

        if(this.centreY-50<0)
        {
            platform_down = true;
            character_down = true;
            background_down = true;
            MOVE_SCREEN_DOWN = true;
        } else {
            this.moveScene = false;
            platform_down = false;
            character_down = false;
            background_down = false;
            MOVE_SCREEN_DOWN = false;
        }

        if(MOVE_SCREEN){
            this.centreY += HEIGHT_MULTIPLIER;
            HEIGHT_MULTIPLIER += 0.00001
        }

        if(this.direction === RIGHT)
        {
            if(this.centreX + 30 > canvas.width){
                this.direction = LEFT;
            }
        }

        if(this.direction === LEFT)
        {
            if(this.centreX - 30 < 0){
                this.direction = RIGHT;
            }
        }
  
    let gravity = 1;
    let HORIZONTAL_SPEED = 10;

        if(!this.colission){
            if (this.direction === UP_RIGHT)
            {
                this.centreX += HORIZONTAL_SPEED;
                this.centreY -= this.CHARACTER_SPEED;
                if(this.CHARACTER_SPEED<0){
                    // this.centreX -= HORIZONTAL_SPEED;
                    this.centreY -= this.CHARACTER_SPEED;
                }
                this.CHARACTER_SPEED -= 0.5;
            }
            else if (this.direction === UP_LEFT)
            {
                this.centreX -= HORIZONTAL_SPEED;
                this.centreY -= this.CHARACTER_SPEED;
                if(this.CHARACTER_SPEED<0){
                    // this.centreX += HORIZONTAL_SPEED;
                    this.centreY -= this.CHARACTER_SPEED;
                }
                this.CHARACTER_SPEED -= 0.5;
            }
            else if (this.direction === LEFT)
            {
                gravity = 0;
                this.centreX -= this.CHARACTER_SPEED;
            }
            // else if (this.direction === DOWN)
            // {
            //     this.centreY += this.CHARACTER_SPEED;
            // }
            else if (this.direction === RIGHT)
            {
                gravity = 0;
                this.centreX += this.CHARACTER_SPEED;
            }

            else if (this.direction === STOPPED_LEFT)
            {
                gravity = 0;
            }

            else if (this.direction === STOPPED_RIGHT)
            {
                gravity = 0;
            }
    
            if (this.direction !== STOPPED_LEFT && this.direction !== STOPPED_LEFT)
            {
                this.column++;
                this.currentgameObject++;
    
                if (this.currentgameObject >= this.endgameObject)
                {
                    this.row = this.direction;
                    this.column = 0;
                    this.currentgameObject = this.startgameObject;
                }
                else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
                {
                    this.column = 0;
                    this.row++;
                }
            }
            else // stopped
            {
                console.log("stoped")
                gravity = 0;
                this.column = 0;
                this.row = 4;
                this.currentgameObject = 0;
            }
        } else
        {
            
            if (this.direction === UP_RIGHT)
            {
                this.CHARACTER_SPEED = 0;
                // this.centreX += HORIZONTAL_SPEED;
                this.centreY += 5;
              
               
            }
            else if (this.direction === UP_LEFT)
            {
                this.CHARACTER_SPEED = 0;
                // this.centreX -= HORIZONTAL_SPEED;
                this.centreY += 5;
              
            }
            this.colission = false;
            this.fall = true;
        }
   
         if(this.fall) {
            console.log("falling")
            this.centreY += this.FALLING_SPEED;
            if (this.direction === UP_RIGHT)
            {
                this.centreX += this.HORIZONTAL_SPEED;
            }
            else if (this.direction === UP_LEFT)
            {
                this.centreX -= this.HORIZONTAL_SPEED;
            }
            else if (this.direction === LEFT)
            {
                gravity = 0;
                this.centreX -= this.CHARACTER_SPEED;
            }
            else if (this.direction === RIGHT)
            {
                gravity = 0;
                this.centreX += this.CHARACTER_SPEED;
            }
            
        }
     
        if(this.bounce){
       
            console.log(this.BOUNCE_SPEED)

            if (this.direction === UP_RIGHT){
                this.centreY -= this.BOUNCE_SPEED;
                this.BOUNCE_SPEED -= 1;
                if(this.BOUNCE_SPEED < 0 ){
                    this.bounce = false;
                    this.BOUNCE_SPEED = this.BOUNCE_SPEED_DEFUALT
                }
            }
            else if (this.direction === UP_LEFT)
            {  
                this.centreY -= this.BOUNCE_SPEED;
                this.BOUNCE_SPEED -= 1;
                if(this.BOUNCE_SPEED < 0 ){
                    this.bounce = false;
                    this.BOUNCE_SPEED = this.BOUNCE_SPEED_DEFUALT
                }
            }
        }
    
    }
   
    render()
    {
        ctx.drawImage(this.skeletonImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - (this.SPRITE_WIDTH / 2), this.centreY - (this.SPRITE_HEIGHT / 2), this.WIDTH_OF_CHARACTER_ON_CANVAS, this.HEIGHT_OF_CHARACTER_ON_CANVAS);
    }

    setDirection(newDirection)
    {
        this.direction = newDirection;
        this.startgameObject = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.endgameObject = this.startgameObject + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.currentgameObject = this.startgameObject;
        this.row = this.direction;
        console.log(this.direction);
        this.column = 0;
    }


    setPlayerOnPlatformState(state){
        this.isOnPlatform = state
    }

    isPlayerOnPlatform()
    {
        return this.playerIsOnPlatform
    }

    getDirection()
    {
        return(this.direction);
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCentreY()
    {
        return this.centreY;
    }

    getDistance()
    {

    }
    setY(value)
    {
        this.centreY += value;
    }
    setX(value)
    {
        this.centreX += value;
    }
    resetSpeed()
    {
        this.CHARACTER_SPEED = 10;
        this.FALLING_SPEED = 0
        this.HORIZONTAL_SPEED = 0;
    }
    setCollision(value)
    {
        this.colission = value;
    }

    bounceJump(value)
    {
        this.bounce = value;
        if(this.direction === UP_RIGHT){
            this.direction = UP_LEFT
        }
        else if(this.direction === UP_LEFT){
            this.direction = UP_RIGHT
        }
    }
    fallOff(value)
    {
        this.fall = value;

        if(this.direction === RIGHT){
            this.direction = UP_RIGHT
        }
        else if(this.direction === LEFT){
            this.direction = UP_LEFT
        }
    }

    moveScene()
    {
        this.centreY += 50;
    }

    
   
}