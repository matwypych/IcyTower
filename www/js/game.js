
/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.       */
/* This file holds the global variables that will be used in all games.    */
/* This file always calls the playGame function().                         */
/* It also holds game specific code, which will be different for each game */

/************** Declare data and functions that are needed for all games ************/

/* Always create a canvas and a ctx */
let canvas = null;
let ctx = null;

/* Always create an array that holds the default game gameObjects */
let gameObjects = [];
let background_images = [];

let skeletonImage = new Image();
skeletonImage.src = "images/sprite_character.png";

let background = new Image();
background.src = "images/background.png";

let background_red = new Image();
background_red.src = "images/background_red.png";

let background_white = new Image();
background_white.src = "images/background_white.png";

let background_green = new Image();
background_green.src = "images/background_green.png";

let background_pink = new Image();
background_pink.src = "images/background_pink.png";

let background_purple = new Image();
background_purple.src = "images/background_purple.png";

let background_yellow = new Image();
background_yellow.src = "images/background_yellow.png";

let background_blue = new Image();
background_blue.src = "images/background_blue.png";

let mazeGrid = new Image();
mazeGrid.src = "images/maze_grid1.png";

let platform = new Image();
platform.src = "images/platform.png";

let borders = new Image();
borders.src = "images/borders.png";

let menu = new Image();
menu.src = "images/menu_no_text.png";

let button = new Image();
button.src = "images/button.png";

let red_button = new Image();
red_button.src = "images/red_button.png";

let buttonsImage = new Image();
buttonsImage.src = "images/buttons.png";

let confetti = new Image();
confetti.src = "images/confetti.gif";

//game update miliseconds
const UPDATE_TIME = 70;
var HEIGHT_MULTIPLIER = 1;
var WIDTH_MULTIPLIER = 0.1;

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
const BACKGROUND_START = 0;
const BACKGROUND_END = 7;
const BORDERS = 8;
const BUTTONS = 9;
const SKELETON = 10;
const DISTANCE_MESSAGE = 11;
const BEST_SCORE = 12
const PLATFORM_START = 13;
const PLATFORM_END = 100;
const EXIT_TEXT = 101;
const MENU = 102;
const PLAY_GAME_TEXT = 103;
const PLAY_GAME_TEXT_INFO = 104;
const SCORE_TEXT = 105;
const LOST_TEXT = 106;
const LOST_TEXT_SCORE = 107;
const TRY_AGAIN_TEXT = 108; 
const CONFETTI_GIF = 109; 
const MOVE_SCREEN_VALUE = 20;


var current_background = 0;
var NEW_RECORD = false;
var MOVE_SCREEN = false;
var END_GAME = false;
var counterClick = 0;
var HOME_SCREEN = true;
var TRY_AGAIN = false;
let game = null;
var height = 0;
var best_height = 0;
var user_name = "";
var user_document = null;
var max_platform = 0;

var MOVE_SCREEN_DOWN = false;
var platform_down = false;
var character_down = false;
var background_down = false;

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
  
    //background images add
    background_images.push(background_white)
    background_images.push(background_red)
    background_images.push(background_yellow)
    background_images.push(background_green)
    background_images.push(background_blue)
    background_images.push(background_purple)
    background_images.push(background_pink)
    background_images.push(background)

    console.log(background_images)
    // this is function for getting the device uid to indentify the user
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())
    // Get the visitor identifier when you need it.
  
    
    //get user uid
    fpPromise
    .then(fp => fp.get())
    .then(result => {
 
    const visitorId = result.visitorId

    var usersRef = db.collection("users");
    
    // Create a query against the collection.
    var query = usersRef.where("uid", "==", visitorId);
    
    query.get()
    .then((querySnapshot) => {
        console.log(querySnapshot.empty)
     
        if(querySnapshot.empty)
        {

            while(user_name==""){
                user_name = prompt("What is your name?");
                if(user_name==null){
                    user_name=""
                }
               }
               
               db.collection("users").add({
                        name: user_name,
                        best_score: "0",
                        uid: visitorId
                    })
                    .then((docRef) => {
                        user_document = docRef.id;
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
    
        } else {
            querySnapshot.forEach((doc) => {
                if(!querySnapshot.empty){
                    console.log(doc.id, " => ", doc.data());
                    var data = doc.data();

                    if(data.uid===visitorId){
                        best_height = data.best_score;
                        user_document = doc.id;
                    }
                  
                } 
            });
        }
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    })


        gameObjects[MENU] = new Menu(menu, 0, 0, canvas.width, canvas.height)
        gameObjects[PLAY_GAME_TEXT] = new InfoText("Play game", 40,  canvas.height - 80, "Nerko One", 50, "red", true)
        gameObjects[PLAY_GAME_TEXT_INFO] = new InfoText("Click on the screen to play the game", 20, canvas.height - 50, "Nerko One", 20, "red",true)
        gameObjects[DISTANCE_MESSAGE] = new HeightMarks(button,"Height: " + height, canvas.width - 120, 25, "Nerko One", 20, "white", false, false,UPDATE_TIME )
        gameObjects[BEST_SCORE] = new HeightMarks(button,"Best: " + height, canvas.width - 120 , 60, "Nerko One", 20, "white", false, true, UPDATE_TIME)
        gameObjects[CONFETTI_GIF] = new Confetti(confetti, 0, 0, canvas.width, canvas.height, UPDATE_TIME);

        canvas.addEventListener('click', function() {
            counterClick+=1;
        
            gameObjects[MENU].stopAndHide()
            gameObjects[PLAY_GAME_TEXT].stopAndHide()
            gameObjects[PLAY_GAME_TEXT_INFO].stopAndHide()
            gameObjects[TRY_AGAIN_TEXT].stopAndHide()
            gameObjects[LOST_TEXT_SCORE].stopAndHide()
            gameObjects[LOST_TEXT].stopAndHide()
            HOME_SCREEN = false;
        });

         // init background images
            for(j = 0; j< background_images.length; j++) {
                let img = background_images[j]
                console.log(img.src)
                gameObjects[background_images.length - j - 1] = new Background(img, 0, 0, canvas.width, canvas.height,UPDATE_TIME,j);
            }
       
       
        gameObjects[BORDERS] = new StaticImage(borders, 0, 0, canvas.width, canvas.height);
       // gameObjects[BUTTONS] = new StaticImage(buttonsImage, 0, 0, canvas.width, canvas.height);
     
        var heightPlacement = canvas.height;

        for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
            let widthPlacement = getRandomInt(0,canvas.width-160);
            gameObjects[i] = new Platform(platform,i, widthPlacement , heightPlacement - 100, 140-WIDTH_MULTIPLIER, 20, UPDATE_TIME, false);
            WIDTH_MULTIPLIER += 1
            heightPlacement -= 93;
        }
        
        gameObjects[SKELETON] = new MazeSkeleton(skeletonImage, canvas.width/2, canvas.height + 5, UPDATE_TIME);
        gameObjects[LOST_TEXT_SCORE] = new InfoText("Your score: ", 100, 350, "Nerko One", 50, "blue", true);
        gameObjects[LOST_TEXT] = new InfoText("You Lost !", 100, 300, "Nerko One", 50, "red", true);
        gameObjects[TRY_AGAIN_TEXT] = new ButtonText("Click to try again", 20, 400, "Nerko One", 50, "red");
       
     
       
        console.log(gameObjects)
    
    
        console.log(ctx)
    /* END OF game specific code. */


    /* Always create a game that uses the gameObject array */
    game = new MazeSkeletonCanvasGame(borders);

    /* Always play the game */
    game.start();


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
                //gameObjects[SKELETON].setDirection(LEFT);
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
                //gameObjects[SKELETON].setDirection(UP_RIGHT);
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
                //gameObjects[SKELETON].setDirection(RIGHT);
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


function handleOrientation(event)
{
    //turn right
    if(event.gamma<0)
    {
        if (gameObjects[SKELETON].getDirection() === UP_RIGHT){
            //gameObjects[SKELETON].setDirection(UP_RIGHT);
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
            //gameObjects[SKELETON].setDirection(RIGHT);
        }
        else if (gameObjects[SKELETON].getDirection() === LEFT){
            gameObjects[SKELETON].setDirection(RIGHT);
        }

    }
    //turn left 
    else if(event.gamma>0)
    {
        if (gameObjects[SKELETON].getDirection() === UP_LEFT){
            //gameObjects[SKELETON].setDirection(UP_LEFT);
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
           // gameObjects[SKELETON].setDirection(LEFT);
        }

    }
   
 
}


function handleMotion(event)
{
    console.log("Interval :"+ event.interval);
    console.log("Rotation Rate: "+event.rotationRate);
    console.log("Acceleration:"+event.acceleration);
    console.log("Acceleration with G:"+event.accelerationIncludingGravity);
}
