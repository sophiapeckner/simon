var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var rectList = [];
var rect = "";
var wide = canvas.width / 2; //200
var tall = canvas.height / 2; //200
var colors = ["red", "blue", "green", "yellow"];
var tile;

var pattern = [];
var userClicked = [];
var counter = -1;
var timesClicked = 0;
var x;

// CREATES THE GRID OF 4 SQUARES (IN ARRAY)
function grid(){
  for(i = 0; i < 2; i++){
    for(j = 0; j < 2; j++){
       //https://www.w3schools.com/jsref/jsref_shift.asp
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

// MAKES THE FOUR SQUARES VISIBLE ON CANVAS
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

// ADDS A RANDOM NUMBER (0-4) TO pattern[] SO THAT THERE'S
// A COMPUTER-GENERATED PATTERN THAT USER FOLLOWS
function createPattern(){
  //https://www.w3schools.com/jsref/jsref_random.asp
  tile = Math.floor((Math.random() * 4)); 
  pattern.push(tile);
  selectSquares();
}

// CALLS flashTile() ONCE EVERY 300ms
function selectSquares(){
  counter++;
  if(counter < pattern.length){
    // https://stackoverflow.com/questions/5786851/define-a-global-variable-in-a-javascript-function
    window.interval = setInterval(function() {
      flashTile(rectList[pattern[counter]]);
    }, 300);
  } else {
    counter = -1;
  }
}

// http://jsfiddle.net/neuroflux/rXVUh/14/
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_setinterval_clearinterval2
// CHANGES THE COLOR OF THE TILES IN pattern[] TO PROMPT USER TO CLICK
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
    clearInterval(interval); //https://stackoverflow.com/questions/16437173/stop-setinterval/16437215
    selectSquares()
  }
}

// SEES WHICH TILE USER CLICKED ON
function getCoords(canvas, event) {
  var rect = canvas.getBoundingClientRect();
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

// CHECKS WHETHER OR NOT THE TILE CLICKED WAS A PART OF pattern[]
function checkTile(index){
  if(index == pattern[timesClicked-1]){
    if(timesClicked == pattern.length){
      timesClicked = 0;
      createPattern();
    }
  } else {
    console.log("incorrect");
  }
}

grid();
