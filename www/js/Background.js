/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Background extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, x, y, width, height, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;


        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvasCtx = this.offscreenCanvas.getContext('2d');
        this.offscreenCanvas.width = canvas.width;
        this.offscreenCanvas.height = canvas.height;
      

        this.offscreenCanvasCtx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
        this.offscreenCanvasCtx.drawImage(this.image, this.x, this.y - canvas.height, canvas.width, canvas.height);

     

        this.color_multiplier = 5;
       

    }

    changePicColor()
    {
        console.log('changePicColor: ', this.color_multiplier);
        this.color_multiplier += 10;
        var imgPixels = this.offscreenCanvasCtx.getImageData(0, 0, this.width, this.height);
        for(var y = 0; y < this.height; y++){
            for(var x = 0; x < this.width; x++){
                var i = (y * 4) * this.width + x * 4;
              
                imgPixels.data[i] -= this.color_multiplier;
                imgPixels.data[i + 1] -= this.color_multiplier;
                imgPixels.data[i + 2] -= this.color_multiplier;

              
            }
        }
        console.log(imgPixels)
        this.offscreenCanvasCtx.putImageData(imgPixels, this.x, this.y, 0, 0, imgPixels.width, imgPixels.height);
     
    }

    updateState()
    {   
       
        this.y += 10
       
        if (this.y >= canvas.height)
        {
            this.changePicColor()
            this.render()
            this.y = 0;
        }
    }

    render()
    {
        ctx.drawImage(this.offscreenCanvas, this.x, this.y, canvas.width, canvas.height);
        ctx.drawImage(this.offscreenCanvas, this.x, this.y - canvas.height, canvas.width, canvas.height);
    }
}