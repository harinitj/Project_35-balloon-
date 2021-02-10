var databse;
var balloon;
var position;


function preload(){
  bg = loadImage("pro-C35 images/Hot Air Ballon-01.png");
  img1 = loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png");

}






function setup() {
  databse = firebase.database();
  createCanvas(1700,860);
   balloon = createSprite(250, 650, 50, 50);
   balloon.addAnimation("fly",img1);
   var position = databse.ref('balloon/position');
   position.on("value",readPosHeight,showError)
  
}


function draw() {
  background(bg); 
  drawSprites();
  movement();
}


function movement(){
  if(keyDown(LEFT_ARROW)){
    updateHeight(-5,0);
    balloon.x -= 5;
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(+5,0);
    balloon.x += 5;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-5);
    balloon.scale -= 0.01;
    balloon.y -= 5
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+5);
    balloon.scale += 0.007;
    balloon.y += 5;
  }
}

function updateHeight(x,y){
  databse.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}
function readPosHeight(data) {
  position  = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  
}
function showError() {
  console.log('Error in writing to db');
  
}