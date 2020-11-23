var PLAY=1
var END=0
var gameState=PLAY
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacle,ob1,ob2,ob3,ob4,ob5,ob6


var pointScore

var cloudGroup,obstacleGroup

var jumpSound,dieSound,checkpointSound

var restart,restartimage;
var gameover,gameOverImage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  ob1= loadImage("obstacle1.png")
  ob2= loadImage("obstacle2.png")
  ob3= loadImage("obstacle3.png")
  ob4= loadImage("obstacle4.png")
  ob5= loadImage("obstacle5.png")
  ob6= loadImage("obstacle6.png")
  
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
 trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  pointScore=0
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  //trex.debug=true;
  trex.setCollider("circle",0,0,35);
  
  restart=createSprite(300,100)
  restart.addImage(restartImage);
  restart.scale=0.7;
  
   gameOver=createSprite(300,140)
 gameOver.addImage(gameOverImage);
 gameOver.scale=0.7;
  
  restart.visible=false
  gameOver.visible=false
  
}

function draw() {
  background("lightBlue");
  textSize(30)
  fill("gray")
  text(pointScore,500,50);
  
  if(gameState===PLAY){
 pointScore=pointScore+Math.round(frameRate()/60) 
    if(pointScore>0 && pointScore %100===0){
       checkpointSound.play();
       }
     if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -13;
       jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -(4+pointScore/100);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    //spawn the clouds
  spawnClouds();
  happyObstacle();
    if(obstacleGroup.isTouching(trex)){
       gameState=END
      dieSound.play();
     //trex.velocityY = -13;
       //jumpSound.play();
    
       }
     }
  else
    if(gameState===END){
       ground.velocityX=0
      obstacleGroup.setVelocityXEach(0)
        cloudGroup.setVelocityXEach(0)
         obstacleGroup.setLifetimeEach(-2)
        cloudGroup.setLifetimeEach(-2)
      restart.visible=true
  gameOver.visible=true
      trex.changeAnimation("collided",trex_collided)
       trex.velocityY=0;
      
      if(mousePressedOver(restart)){
        reset();
         }
       }
  
  
 
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
function reset(){
  gameState=PLAY
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  restart.visible=false
  gameOver.visible=false
  trex.changeAnimation("running",trex_running)
  pointScore=0
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud)
    }
}
function happyObstacle(){
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600,175,10,40);
   
    obstacle.scale = 0.6;
    obstacle.velocityX = -(6+pointScore/100)
    obstacleGroup.add(obstacle)
    
    
    //assigning lifetime to the variable
    obstacle.lifetime = 100
    var r=Math.round(random(1,6))
    switch(r){
      case 1:obstacle.addImage(ob1);
        break;
        case 2:obstacle.addImage(ob2);
        break;
        case 3:obstacle.addImage(ob3);
        break;
        case 4:obstacle.addImage(ob4);
        break;
        case 5:obstacle.addImage(ob5);
        break;
        case 6:obstacle.addImage(ob6);
        break;
        default:break
        
           }
}
    
}
