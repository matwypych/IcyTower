/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Skeleton extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(skeletonImage, centreX, centreY)
    {
        super(100); /* as this class extends from GameObject, you must always call super() */

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
     
        this.setDirection(STOPPED_LEFT);
    }

    updateState()
    {

    let gravity = 1;
    let HORIZONTAL_SPEED = 10;
 
        if(!this.colission){
            if (this.direction === UP_RIGHT)
            {
                this.centreX += HORIZONTAL_SPEED;
                this.centreY -= this.SKELETON_SPEED;
                if(this.SKELETON_SPEED<0){
                    // this.centreX -= HORIZONTAL_SPEED;
                    this.centreY -= this.SKELETON_SPEED;
                }
                this.SKELETON_SPEED -= 0.5;
            }
            else if (this.direction === UP_LEFT)
            {
                this.centreX -= HORIZONTAL_SPEED;
                this.centreY -= this.SKELETON_SPEED;
                if(this.SKELETON_SPEED<0){
                    // this.centreX += HORIZONTAL_SPEED;
                    this.centreY -= this.SKELETON_SPEED;
                }
                this.SKELETON_SPEED -= 0.5;
            }
            else if (this.direction === LEFT)
            {
                gravity = 0;
                this.centreX -= this.SKELETON_SPEED;
            }
            // else if (this.direction === DOWN)
            // {
            //     this.centreY += this.SKELETON_SPEED;
            // }
            else if (this.direction === RIGHT)
            {
                gravity = 0;
                this.centreX += this.SKELETON_SPEED;
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
                gravity = 0;
                this.column = 0;
                this.row = 4;
                this.currentgameObject = 0;
            }
        } else {
            this.centreY += this.SKELETON_SPEED/4;
        }
    
    }
   
    render()
    {
        ctx.drawImage(this.skeletonImage, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_HEIGHT, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - (this.SPRITE_WIDTH / 2), this.centreY - (this.SPRITE_HEIGHT / 2), this.WIDTH_OF_SKELETON_ON_CANVAS, this.HEIGHT_OF_SKELETON_ON_CANVAS);
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
        this.SKELETON_SPEED = 10; 
    }
    setCollision(value)
    {
        this.colission = value;
    }
}