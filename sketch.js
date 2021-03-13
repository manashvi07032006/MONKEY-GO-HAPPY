var monkey,monkey_running, monkey$y, banana, bananaImage,jungle, jungleImage,stone, stoneImage, back, bananaGroup, ObstacleGroup, ground,monkey$;
var score = 0, count=0, texture, t2, t3;
var PLAY = 1, END = 0, gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
  monkey$ = loadAnimation("Monkey_01.png");
}

function setup() {
  createCanvas(800, 400);
  
  background = createSprite(400, 200, 800, 400);
  background.addImage("jungle", jungleImage);
  background.velocityX = -4;
 
  //backgroundy = createSprite(300, 100,600, 200);
  //backgroundy.addImage("backy", jungleImage);
  monkey = createSprite(50, 340, 20, 20);
  monkey.addAnimation("mon", monkey_running);
  monkey.scale = 0.1;
  monkey$y = createSprite(80, 320, 20, 20);
  monkey$y.addAnimation("monk", monkey$);
  monkey$y.visible = false
  monkey$y.scale = 0.2;
  
  ground = createSprite(200, 410, 800, 40);
  ground.visible = false; 
  
  bananaGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() {
  //background (jungleImage);
  monkey.collide( ground );
  console.log(gameState);
if(gameState===PLAY){
 if(background.x<400){
    background.x = background.width/2;
  }
  
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY += 0.8; 
  
  stroke("white");

  spawnBananas();
  obstacles();
  
  if(monkey.isTouching(bananaGroup)){
    score += 2;
    bananaGroup.destroyEach();
    //console.log(score);  
  }
   if(monkey.isTouching(ObstacleGroup)){
    monkey.scale = 0.05;
    count++;
    ObstacleGroup.destroyEach();
    //console.log(score);  
  }
  
  switch(score){
      case 10: monkey.scale = 0.12; break;
      case 20: monkey.scale = 0.14; break;
      case 30: monkey.scale = 0.16; break;
      case 40: monkey.scale = 0.18; break;
      case 50: monkey.scale = 0.20; break;
      case 60: monkey.scale = 0.22; break;
      case 70: monkey.scale = 0.24; break;
      case 80: monkey.scale = 0.26; break;
      case 90: monkey.scale = 0.28; break;
      case 100: monkey.scale = 0.30; break;
      default: break;
  }
  if(count === 2 || score === 100){
    gameState = END;
  }
  if(gameState === END){
    monkey.visible = false ;
    monkey$y.visible = true;
    //background.visible = false;
    monkey.velocityX=0;
    background.velocityX=0;
    bananaGroup.destroyEach();
    ObstacleGroup.destroyEach();
    
  }
}
  
  drawSprites();
  textSize(20);
  fill("white");
  text("Score: " + score,600,50);
  if(gameState===END){
    if(count === 2){
      lose();
    }
    if(score === 100){
      win();
    } 
    if(keyDown("enter")){
    reset();
    } 
  }
}

function spawnBananas(){
  if(frameCount%250 === 0){
    var banana = createSprite(800,120,40,10);
    //banana.debug = true;
    banana.y = Math.round(random(100,200));
    banana.addImage("cloud",bananaImage);
    banana.scale = 0.08;
    banana.velocityX = - (6 + 3*score/100);
    //assign lifetime to the variable
    banana.lifetime = 267;
    
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300 === 0){
    var stone = createSprite(800, 345, 10, 40);
    stone.addImage("stony", stoneImage);
    stone.scale = 0.15;
    stone.velocityX = -3;
    stone.lifetime = 270;
    //add the stone sprites to the stone group
    ObstacleGroup.add(stone);
  }
}

function lose(){
  drawSprites();
  fill("white");
  textSize(50);
  texture = text("LETS TRY AGAIN !! 😊😊😊", 100, 250);
  textSize(30);
  t3 = text("Press ENTER key to play again", 200, 340);
  textSize(20);
  t2 = text("Score: "+score, 600, 50);
}

function win(){
  drawSprites();
  fill("white");
  textSize(50);  
  texture = text("YOU DID IT !! 👍👍👍", 200, 200);
  textSize(30);
  t3 = text("Press ENTER key to play again", 200, 340);
  textSize(20);
  t2 = text("Score: "+score, 600, 50);
}

function reset(){
  gameState = PLAY;
  monkey$y.visible = false;
  monkey.visible = true;
  monkey.scale = 0.1;
  monkey.collide(ground); 
  background.visible = true;
  ObstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  background.velocityX=-4;
 
  score = 0;
  count=0;
}