
class HeightMarks extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, text, x, y, font, fontSize, colour, centered, best, updateStateMiliseconds)
    {
        super(updateStateMiliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.best = best;
        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
        this.distance = 505;
        this.image = image;

        if(centered)
        {
            this.x = (canvas.width - this.width) / 2;
        }
       
        console.log(this.text)
        
    }

    updateState()
    {    
        if(this.best)
        {
            this.text = "Best: " + best_height;
        } else 
        {
           
            this.text = "Height: " + height;
        }
    }

    render()
    {
        ctx.drawImage(this.image, this.x-5, this.y-33, 120, 60);
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        ctx.fillText(this.text, this.x, this.y);
    }
}