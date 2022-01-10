
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

let skeletonImage = new Image();
skeletonImage.src = "images/sprite_character.png";

let background = new Image();
background.src = "images/background_red.png";

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

let buttonsImage = new Image();
buttonsImage.src = "images/buttons.png";

let confetti = new Image();
confetti.src = "images/confetti.gif";

//game update miliseconds
const UPDATE_TIME = 80;
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
const BUTTONS = 2;
const SKELETON = 3;
const DISTANCE_MESSAGE = 4;
const BEST_SCORE = 5
const PLATFORM_START = 6;
const PLATFORM_END = 15;
const EXIT_TEXT = 16;
const MENU = 17;
const PLAY_GAME_TEXT = 18;
const PLAY_GAME_TEXT_INFO = 19;
const SCORE_TEXT = 20;
const LOST_TEXT = 21;
const LOST_TEXT_SCORE = 22;
const TRY_AGAIN_TEXT = 23; 
const CONFETTI_GIF = 24; 

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
        gameObjects[PLAY_GAME_TEXT] = new InfoText("Play game", 40, 465, "Nerko One", 50, "red", true)
        gameObjects[PLAY_GAME_TEXT_INFO] = new InfoText("Click on the screen to play the game", 20, 490, "Nerko One", 20, "red",true)
        gameObjects[DISTANCE_MESSAGE] = new HeightMarks("Height: " + height, 360, 25, "Nerko One", 20, "white", false, false,UPDATE_TIME )
        gameObjects[BEST_SCORE] = new HeightMarks("Best: " + height, 360, 60, "Nerko One", 20, "white", false, true, UPDATE_TIME)
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

        gameObjects[BACKGROUND] = new Background(background, 0, 0, canvas.width, canvas.height, UPDATE_TIME);
        gameObjects[BORDERS] = new StaticImage(borders, 0, 0, canvas.width, canvas.height);
        gameObjects[BUTTONS] = new StaticImage(buttonsImage, 0, 0, canvas.width, canvas.height);
        gameObjects[SKELETON] = new MazeSkeleton(skeletonImage, canvas.width/2, canvas.height + 5, UPDATE_TIME);
        var heightPlacement = canvas.height;

        for(var i = PLATFORM_START; i <= PLATFORM_END; i++){
            let widthPlacement = getRandomInt(0,canvas.width-100);
            gameObjects[i] = new Platform(platform,i, widthPlacement , heightPlacement - 100, 100, 20, UPDATE_TIME, false);
            heightPlacement -= 100;
        }
        
   
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
