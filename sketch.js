//create var 
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;

var bowImage, arrowImage, green_balloonImage, red_balloonImage, 
    pink_balloonImage ,blue_balloonImage, backgroundImage;

var PLAY=1;

var END=0;

var gameState=PLAY;
var touches=[]; 
function preload(){
  //loading images
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  
  bowImage = loadImage("bow0.png");
  
  red_balloonImage = loadImage("red_balloon0.png");
  
  green_balloonImage = loadImage("green_balloon0.png");
  
  pink_balloonImage = loadImage("pink_balloon0.png");
  
  blue_balloonImage = loadImage("blue_balloon0.png");

  cloudImage = loadImage("cloud.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  //creating background
  // background = createSprite(windowWidth-800,windowHeight-500);
  // background.addImage(backgroundImage);
  // background.scale = 2.5;
  
  // creating bow to shoot arrow
  bow = createSprite(500,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  //create groups of allballoons and arrow
  redB=new Group();
  blueB=new Group();
  greenB=new Group();
  pinkB=new Group();
  arrowGroup=new Group();
  
  cloudsGroup = createGroup();
  //score =0
   score = 0  
}

function draw() {

  background("skyblue");
  // condition game state=PLAY then 
  if (gameState===PLAY){
    
     // moving ground
    // background.velocityX = -(3+2 * score/4);
    
    // release arrow when space key is pressed
  if (touches.length> 0 || keyWentDown("space")) {
    createArrow();
    touches =[1];
  } 
    
       //moving bow
  bow.y = World.mouseY
    
     //creating continous enemies
  var select_balloon = Math.round(random(1,4));
    
   //spawnning random balloons
    if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
      
    //condition when arrowGroup touch redB then destroy both arrow  Group and redB and score+1
    if (arrowGroup.isTouching(redB)){
      redB.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
    if (arrowGroup.isTouching(blueB)){
      blueB.destroyEach();
      arrowGroup.destroyEach();
      score=score+3;
    }
    
    if (arrowGroup.isTouching(greenB)){
      greenB.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    } 
    
    
    if (arrowGroup.isTouching(pinkB)){
      pinkB.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
    }
    
    //condition when balloon touch bow then gameState=END
    if (redB.isTouching(bow)||
        pinkB.isTouching(bow)||
       blueB.isTouching(bow)||greenB.isTouching(bow)){ 
      
      gameState=END;
    }

    spawnClouds();
  } 
  
  else if(gameState === END){
    // background.velocityX=0;
    redB.setVelocityXEach(0);
    greenB.setVelocityXEach(0);
    blueB.setVelocityXEach(0);
    pinkB.setVelocityXEach(0);
    
    
     
    
    textSize(20);
    
    //condition if r key is pressed then gameState=PLAY and score=0
  if (keyDown("r")){
    destroyed();
  gameState=PLAY;
  score=0;

  } 
    
  }
 
    // bow.debug=true;
    // if (background.x < 0){
    //   background.x = background.width/2;
    // }
  
 
  drawSprites();
  
  //displaying score
    text("Score: "+ score, 500,50); 
  
  //condition when gameState=END then display given text
 if (gameState===END){
    fill("black");
   textFont("CALVIN");
    text("GAME_OVER!",220,250);
    noFill();
   fill("red");
   text("PRESS R RESTART",200,280);
 } 
  
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = (3+2 * score/4);
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
  return red
  
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX =  (3+2 * score/4);
  blue.lifetime = 150;
  blue.scale = 0.1;
   blueB.add(blue);
  return blue;
 
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX =  (3+2 * score/4);
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
  return green;   
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX =  (3+2 * score/4);
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
  return pink;
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(20, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = bow.x;
  arrow.y=bow.y;
  arrow.velocityX = -8;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  // arrow.debug=true;
   arrow.setCollider("rectangle",0,0,200,20);
   arrowGroup.add(arrow);
  return arrow;
   
}


function destroyed(){
  redB.destroyEach();
  blueB.destroyEach();
  greenB.destroyEach();
  pinkB.destroyEach();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(10,windowHeight));
    cloud.addImage(cloudImage);
    cloud.scale = 1.2;
    cloud.velocityX = -(3+2* score/4);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
  
   
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

