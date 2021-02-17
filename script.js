var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rectList = [];
var rect = "";
var wide = canvas.width / 2; //200
var tall = canvas.height / 2; //200
var colors = ["red", "blue", "green", "yellow"];
var tile;
var pattern = [];

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
  // createPattern();
  pattern = [0,0];
  selectSquares()
}

function createPattern(){
  //https://www.w3schools.com/jsref/jsref_random.asp
  tile = Math.floor((Math.random() * 4)); 
  pattern.push(tile);
}

// function lightUp(){
//   for(var i = 0; i < pattern.length; i++){
//     var tile1 = pattern[i];
//     ctx.beginPath();
//     ctx.rect(rect.x, rect.y, rect.width, rect.height);
//     ctx.fillStyle = rect.color;
//     ctx.fill();
//     ctx.stroke(); 
//   }
// }

var counter = -1;

function selectSquares(){
  counter++;
  if(counter < pattern.length){
    window.interval = setInterval(function() {
      flashtext(rectList[counter]);
    }, 300);
  } else {
    console.log(counter)
    counter = 0;
  }
}

var x;

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
    clearInterval(interval);
    selectSquares()
  }
}

grid();
