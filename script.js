var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
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

function grid(){
  for(i = 0; i < 2; i++){
    for(j = 0; j < 2; j++){
      colorPos = colors[0]; //https://www.w3schools.com/jsref/jsref_shift.asp
      colors.shift();
      rect = {
        x : i * wide,
        y : j * tall,
        width : wide,
        height : tall,
        color : colorPos
      }
      rectList.push(rect);
    } 
  }
  paint();
}

function paint(){
  for(var i = 0; i < rectList.length; i++){
    rect = rectList[i];
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = rect.color;
    ctx.fill();
    ctx.stroke(); 
  }
  createPattern();
}

function createPattern(){
  //https://www.w3schools.com/jsref/jsref_random.asp
  tile = Math.floor((Math.random() * 4)); 
  pattern.push(tile);
  selectSquares();
}

function selectSquares(){
  counter++;
  if(counter < pattern.length){
    // console.log(counter)
    // https://stackoverflow.com/questions/5786851/define-a-global-variable-in-a-javascript-function
    window.interval = setInterval(function() {
      flashtext(rectList[pattern[counter]]);
    }, 300);
  } else {
    counter = -1;
  }
}

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

function checkTile(index){
  if(index == pattern[timesClicked-1]){
    console.log("correct");
    if(timesClicked == pattern.length){
      timesClicked = 0;
      console.log("you're done!");
      createPattern();
    }
  } else {
    console.log("incorrect");
  }

}

// http://jsfiddle.net/neuroflux/rXVUh/14/
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_setinterval_clearinterval2
function flashtext(ele) {
  var rect = ele;
  var tmpColCheck = rect.color;
  if (tmpColCheck === rect.color && x!= 1) {
    // rectList[0].color = col;
    x = 1;
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.stroke();
  } else if (x == 1) {
    // rectList[0].color = "red";
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = ele.color;
    ctx.fill();
    ctx.stroke();
    x = 0;
    clearInterval(interval); //https://stackoverflow.com/questions/16437173/stop-setinterval/16437215
    selectSquares()
  }
}

grid();
