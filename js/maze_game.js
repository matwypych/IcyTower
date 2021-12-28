/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */





/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */

let skeletonImage = new Image();
skeletonImage.src = "images/sprite_character.png";

let background = new Image;
background.src = "images/background.png";

let mazeGrid = new Image;
mazeGrid.src = "images/maze_grid1.png";

let platform = new Image;
platform.src = "images/platform.png";

let borders = new Image;
borders.src = "images/borders.png";

//game update miliseconds
const UPDATE_TIME = 100;
var HEIGHT_MULTIPLIER = 1;

/* Direction that the skeleton is walking */
/* Note that this matches the row in the gameObject image for the given direction */

const UP_LEFT = 0;
const UP_RIGHT = 1;
const LEFT = 2;
const RIGHT = 3;
const STOPPED_RIGHT = 4;
const STOPPED_LEFT = 5;


/* The various gameObjects */
/* These are the positions that each gameObject is held in the gameObjects[] array */
const BACKGROUND = 0;
const BORDERS = 1;
const SKELETON = 2;
const WIN_MESSAGE = 3;
const PLATFORM_START = 4;
const PLATFORM_END = 15;
const LOST_TEXT = 16;
const TRY_AGAIN_TEXT = 17;
const EXIT_TEXT = 18;

var MOVE_SCREEN = false;

/******************* END OF Declare game specific data and functions *****************/



/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */
function playGame()
{
    /* We need to initialise the game objects outside of the Game class */
    /* This function does this initialisation.                          */
    /* This function will:                                              */
    /* 1. create the various game game gameObjects                   */
    /* 2. store the game gameObjects in an array                     */
    /* 3. create a new Game to display the game gameObjects          */
    /* 4. start the Game                                                */


    /* Create the various gameObjects for this game. */
    /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */

    gameObjects[BACKGROUND] = new StaticImage(background, 0, 0, canvas.width, canvas.height);
    gameObjects[BORDERS] = new StaticImage(borders, 0, 0, canvas.width, canvas.height);
    gameObjects[SKELETON] = new MazeSkeleton(skeletonImage, canvas.width/2, canvas.height + 5, UPDATE_TIME);
    var heightPlacement = canvas.height;

    for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
        let widthPlacement = getRandomInt(0,canvas.width-100);
        gameObjects[i] = new Platform(platform,i, widthPlacement , heightPlacement - 100, 100, 20, UPDATE_TIME, false);
        heightPlacement -= 100;
    }
    
    console.log(gameObjects)
  

    console.log(ctx)
    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    let game = new MazeSkeletonCanvasGame(borders);

    /* Always play the game */
    game.start();

	/*New controls to the game */
	// document.getElementById("up_btn").addEventListener('click', function (e){
        
    //     if(gameObjects[SKELETON].getDirection() === LEFT){
    //         gameObjects[SKELETON].setDirection(UP_LEFT);
    //     } 
    //     else if(gameObjects[SKELETON].getDirection() === RIGHT){
    //         gameObjects[SKELETON].setDirection(UP_RIGHT);
    //     }
    //     else if(gameObjects[SKELETON].getDirection() === STOPPED_LEFT){
    //         gameObjects[SKELETON].setDirection(UP_LEFT);
    //     }
    //     else if(gameObjects[SKELETON].getDirection() === STOPPED_RIGHT){
    //         gameObjects[SKELETON].setDirection(UP_RIGHT);
    //     }
		
	// });
	// // document.getElementById("down_btn").addEventListener('click', function (e){
	// // 	gameObjects[SKELETON].setDirection(DOWN);
	// // });
	// document.getElementById("left_btn").addEventListener('click', function (e){
	// 	gameObjects[SKELETON].setDirection(LEFT);
	// });
	// document.getElementById("right_btn").addEventListener('click', function (e){
	// 	gameObjects[SKELETON].setDirection(RIGHT);
	// });
	
   
    document.addEventListener('keydown', function (e)
    {
        if (e.keyCode === 37)  // left
        {
            if (gameObjects[SKELETON].getDirection() === UP_LEFT){
                gameObjects[SKELETON].setDirection(UP_LEFT);
            }
            else if (gameObjects[SKELETON].getDirection() === UP_RIGHT){
                gameObjects[SKELETON].setDirection(UP_LEFT);
            }
            else if (gameObjects[SKELETON].getDirection() === STOPPED_LEFT){
                gameObjects[SKELETON].setDirection(LEFT);
            }
            else if (gameObjects[SKELETON].getDirection() === STOPPED_RIGHT){
                gameObjects[SKELETON].setDirection(LEFT);
            }
            else if (gameObjects[SKELETON].getDirection() === RIGHT){
                gameObjects[SKELETON].setDirection(LEFT);
            }
            else if (gameObjects[SKELETON].getDirection() === LEFT){
                gameObjects[SKELETON].setDirection(LEFT);
            }

        }
        else if (e.keyCode === 38) // up
        {
            if(gameObjects[SKELETON].getDirection() === LEFT){
                gameObjects[SKELETON].setDirection(UP_LEFT);
            } 
            else if(gameObjects[SKELETON].getDirection() === RIGHT){
                gameObjects[SKELETON].setDirection(UP_RIGHT);
            }
            else if(gameObjects[SKELETON].getDirection() === STOPPED_LEFT){
                gameObjects[SKELETON].setDirection(UP_LEFT);
            }
            else if(gameObjects[SKELETON].getDirection() === STOPPED_RIGHT){
                gameObjects[SKELETON].setDirection(UP_RIGHT);
            }
            
        }
        else if (e.keyCode === 39) // right
        {
            if (gameObjects[SKELETON].getDirection() === UP_RIGHT){
                gameObjects[SKELETON].setDirection(UP_RIGHT);
            }
            else if (gameObjects[SKELETON].getDirection() === UP_LEFT){
                gameObjects[SKELETON].setDirection(UP_RIGHT);
            }
            else if (gameObjects[SKELETON].getDirection() === STOPPED_LEFT){
                gameObjects[SKELETON].setDirection(RIGHT);
            }
            else if (gameObjects[SKELETON].getDirection() === STOPPED_RIGHT){
                gameObjects[SKELETON].setDirection(RIGHT);
            }
            else if (gameObjects[SKELETON].getDirection() === RIGHT){
                gameObjects[SKELETON].setDirection(RIGHT);
            }
            else if (gameObjects[SKELETON].getDirection() === LEFT){
                gameObjects[SKELETON].setDirection(RIGHT);
            }

        }
        // else if (e.keyCode === 40) // down
        // {
        //     gameObjects[SKELETON].setDirection(DOWN);
        // }
    });
	
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }