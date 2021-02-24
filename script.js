var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var rectList = [];
var rect = "";
var wide = canvas.width / 2;   //200
var tall = canvas.height / 2; //200
var colors = ["red", "blue", "green", "yellow"];
var tile;

var pattern = [];
var userClicked = [];
var counter = -1;
var timesClicked = 0;
var x;

// Creates the grid of 4 squares and stores in an array
function grid(){
  for(i = 0; i < 2; i++){
    for(j = 0; j < 2; j++){
      colorPos = colors[0];
      colors.shift();
      rect = {
        x : i * wide,
        y : j * tall,
        width : wide, //200
        height : tall, //200
        color : colorPos
      }
      rectList.push(rect);
    } 
  }
  paint();
}

// Makes the 4 squares in rectList visible on Canvas
function paint(){
  for(var i = 0; i < rectList.length; i++){
    rect = rectList[i];
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = rect.color;
    context.fill();
    context.stroke(); 
  }
  createPattern();
}

// Adds a random num. (0-4) to pattern[] so that there's
// a computer generated pattern that users can follow
function createPattern(){
  tile = Math.floor((Math.random() * 4)); 
  pattern.push(tile);
  selectSquares();
}

// Calls flashTile() once every 300 milliseconds
function selectSquares(){
  counter++;
  if(counter < pattern.length){
    window.interval = setInterval(function() {
      flashTile(rectList[pattern[counter]]);
    }, 300);
  } else {
    counter = -1;
  }
}

// Changes the color of tiles in pattern[] as a prompt for the user to follow a specified pattern
function flashTile(ele) {
  // var rect = ele;
  var tmpColCheck = ele.color;
  if (tmpColCheck === ele.color && x!= 1) {
    // rectList[0].color = col;
    x = 1;
    context.beginPath();
    context.rect(ele.x, ele.y, ele.width, ele.height);
    context.fillStyle = "grey";
    context.fill();
    context.stroke();
  } else if (x == 1) {
    context.beginPath();
    context.rect(ele.x, ele.y, ele.width, ele.height);
    context.fillStyle = ele.color;
    context.fill();
    context.stroke();
    x = 0;
    clearInterval(interval);
    selectSquares()
  }
}

// Tracks which tile user clicked on
function getCoords(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  // Source: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
  var mouseX = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var mouseY = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

  for(var k = 0; k < rectList.length; k++){
    rect1 = rectList[k];
    if (mouseX > rect1.x && mouseX < rect1.x + rect1.width && mouseY > rect1.y && mouseY < rect1.y + rect1.height){
      timesClicked++;
      checkTile(k);
    }
  }
}

// Checks whether the clicked tile was a part of pattern[]
function checkTile(index){
  if(index == pattern[timesClicked-1]){
    if(timesClicked == pattern.length){
      timesClicked = 0;
      createPattern();
    }
  } else {
    console.log("incorrect");
    document.getElementById("game-over").innerHTML = "Game Over!";
  }
}

grid();
