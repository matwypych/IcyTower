/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Menu extends StaticImage
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, x, y, width, height)
    {
        super(image, x, y, width, height); /* as this class extends from GameObject, you must always call super() */


        image.addEventListener('click', function(){
            console.log("Play game")
        });

    }

    render()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}