/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Background extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, x, y, width, height, updateStateMilliseconds, number)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.number = number;
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvasCtx = this.offscreenCanvas.getContext('2d');
        this.offscreenCanvas.width = canvas.width;
        this.offscreenCanvas.height = canvas.height;
        this.offscreenCanvasCtx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
        this.offscreenCanvasCtx.drawImage(this.image, this.x, this.y - canvas.height, canvas.width, canvas.height);
        this.color_multiplier = 5;
        this.loop_counter = 0;
        this.moveScene = false;
        this.moveScreenValue = 0;
      
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


    moveScreen()
    {
        background_down = true
    }

    updateState()
    {   

        if(background_down)
        {
            if(this.moveScreenValue<MOVE_SCREEN_VALUE)
            {
                console.log("move down everything");
                this.y += 10;
                this.moveScreenValue+=1;
            } else {
                this.moveScene = false;
                this.moveScreenValue = 0;
                background_down = false;
            }
        }

        if(current_background==this.number){
            // this.y += 100
            if(MOVE_SCREEN){
                this.y += HEIGHT_MULTIPLIER;
                HEIGHT_MULTIPLIER += 0.0001
            }
       
        if (this.y >= canvas.height)
        {
            if(this.loop_counter>=this.number)
            {
                console.log("Stop: ", this.number)
                if(current_background!==BACKGROUND_END)
                {
                    this.stopAndHide()
                    current_background+=1;
                } else {
                   
                }
              
               
              
            }
            console.log("Img nr:" , this.number)
            console.log("cntr: ", this.loop_counter)
                this.loop_counter += 1;
                this.y = 0;
            
        } 

        if(current_background==BACKGROUND_END){
            this.y += 100
            if (this.y >= canvas.height)
            {
                this.y = 0;
            }
        }
        }
    }

    render()
    {
        ctx.drawImage(this.offscreenCanvas, this.x, this.y, canvas.width, canvas.height);
        ctx.drawImage(this.offscreenCanvas, this.x, this.y - canvas.height, canvas.width, canvas.height);
    }
}