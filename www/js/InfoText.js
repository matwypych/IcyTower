
class InfoText extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(text, x, y, font, fontSize, colour, centered)
    {
        super(null); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.colour = colour;
        this.height = ""
        ctx.font = this.fontSize + "px " + this.font;
        this.width = ctx.measureText(this.text).width;
     
        if(centered)
        {
            this.x = (canvas.width - this.width) / 2;
        }
       
        
    }

    
    setHeight(height)
    {
        this.height = height;
    }
    render()
    {
        ctx.fillStyle = this.colour;
        ctx.font = this.fontSize + "px " + this.font; // need to set the font each time, as it might have been changed by other gameObjects.
        if(height!=""){
            ctx.fillText(this.text + this.height, this.x - 40, this.y);
        } else {
            ctx.fillText(this.text + this.height, this.x, this.y);
        }
       
    }
}