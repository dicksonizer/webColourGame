var numSquares = 6;
var colors = [];
var pickedColor ;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  //Mode buttons event listeners
  setupModeButtons();
  setupSquares();
  reset();
}


function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      //Ternary, instead of 4 lines of if else
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length ; i++){
    //Add initial colours to squares
    squares[i].style.backgroundColor = colors[i];

    //Add click listeners to squares
    squares[i].addEventListener("click", function(){
      //Grab colour of clicked squares
      var clickedColor = this.style.backgroundColor;
      //Compare colour to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = "Try again";
      }
    });
  }
}



function reset(){
  //Generate all new colours
  colors = generateRandomColors(numSquares);
  //Pick a new random colour from array
  pickedColor = pickColor();
  //Change colorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colours";
  messageDisplay.textContent = "";
  //Change colours of all squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //Reset h1
  h1.style.backgroundColor = "steelblue";
}


resetButton.addEventListener("click", function(){
  reset();
});


function changeColors(color){
  //Loop through all squares
  for (var i = 0; i < colors.length; i++) {
      //Change each colour to match given colours
      squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //Make array
  var arr = [];
  //Add num random colours to array
  //Repeat num times
  for(var i = 0; i < num; i ++){
    //get random colors and push into array
    arr.push(randomColor());
  }
  //Return
  return arr;
}

function randomColor() {
  //Pick a red from 0 to 255
  var r = Math.floor(Math.random() * 256);
  //Pick a green from 0 to 255
  var g = Math.floor(Math.random() * 256);
  //Pick a blue from 0 to 255
  var b = Math.floor(Math.random() * 256);
  //rgb(r, g, b)
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
