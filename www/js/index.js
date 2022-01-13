/***************************************************************************/
/* This file is the same for every game.                                   */
/* DO NOT EDIT THIS FILE                                                   */
/***************************************************************************/

/* Wait for all game assets, such as audio and images to load before starting the game */
/* The code below will work for both websites and Cordova mobile apps                  */
//window.addEventListener("load", onAllAssetsLoaded);           // needed for websites
document.addEventListener("deviceready", onAllAssetsLoaded, false);
window.addEventListener("deviceorientation", handleOrientation.bind(this), true)
window.addEventListener("devicemotion", handleMotion.bind(this), true);
  // needed for Cordova mobile apps
document.write("<div id='loadingMessage'>Loading...</div>");
  
function onAllAssetsLoaded()
{
    /* hide the webpage loading message */
    document.getElementById('loadingMessage').style.visibility = "hidden";

    /* Initialise the canvas and associated variables */
    /* This code never changes                        */
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
	// canvas.width = Math.min(window.innerWidth);
    // canvas.height = Math.min(window.innerHeight);
    
	canvas.width = window.innerWidth
    canvas.height =  window.innerHeight

    console.log("Inner width: " + window.innerWidth)
    console.log("client Width: " + canvas.clientWidth)
    console.log("screen width: " + window.screen.width)

   
    console.log("Inner height: " + window.innerHeight)
    console.log("client height: " + canvas.clientHeight)
    console.log("screen height: " + window.screen.height)

    playGame(); // Each game will include its own .js file, which will hold the game's playGame() function
   
}


/* global functions */

/* Convert from degrees to radians */
Math.radians = function (degrees)
{
    return degrees * Math.PI / 180;
};




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }