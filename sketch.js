var edges;

var bruse,bruseImg;
var daniel,danielImg;
var david,davidImg;

var hero,heroImg;

var backgroundImg;

var enemy;

var enemyGroup;

var gameState=0;

var coin,coinGroup,coinImg;

var score=0;

function preload(){
  bruseImg=loadAnimation("ghost1.png","ghost2.png","ghost3.png")
  danielImg=loadImage("daniel.png");
  davidImg=loadImage("david.png");
  heroImg=loadImage("hero.png");
  backgroundImg=loadImage("background.jpg");
  coinImg=loadImage("coin.png");
}

function setup() {
  createCanvas(displayWidth-20,displayHeight-30);

  hero=createSprite(690, 550, 50, 50);
  hero.addImage(heroImg);
  hero.scale=(0.5);

  hero.debug=true;

  edges=createEdgeSprites();

  enemyGroup=new Group();
  coinGroup=new Group();
}

function draw() {
  background(backgroundImg);

  textSize(40);
  text("score: "+score,displayWidth-300,40);
  
  hero.bounceOff(edges);

  if(gameState===0){
    spawnEnemys();
    spawnCoins();


    if (keyDown("up")){
        hero.velocityX=0;
        hero.velocityY=-2;
    }

    if (keyDown("down")){
      hero.velocityX=0;
      hero.velocityY=2;
  }

    if (keyDown("left")){
    hero.velocityX=-2;
    hero.velocityY=0;
  }

    if (keyDown("right")){
    hero.velocityX=2;
    hero.velocityY=0;
  }

  if(enemyGroup.isTouching(hero)){
      gameState=1;
  }
  if(coinGroup.isTouching(hero)){
    score=score+1;
    coinGroup.destroyEach();
  }
}

if(gameState===1){
  textSize(40);
  stroke("red");
  text("game over",displayWidth/2,displayHeight/2);

  hero.destroy();
  enemyGroup.destroyEach();


}

  drawSprites();
}

function spawnEnemys(){
  if (frameCount%100===0){
      enemy=createSprite(0,0,10,10);
      enemy.x=Math.round(random(50,displayWidth-50));
      enemy.y=Math.round(random(50,displayHeight-50));

      var r=Math.round(random(1,3));
      switch(r){
        case 1:enemy.addAnimation(bruseImg);
        break;
        case 2:enemy.addImage(danielImg);
        break;
        case 3:enemy.addImage(davidImg);
        break;

      }
      enemy.scale=0.5;
      enemy.velocityX=Math.round(random(-5,5));
      enemy.velocityY=Math.round(random(-5,5));

      enemyGroup.add(enemy);
    }

}

function spawnCoins(){
  if(frameCount%100===0){
    coin=createSprite(0,0,20,20);
    coin.x=Math.round(random(50,displayWidth-50));
    coin.y=Math.round(random(50,displayHeight-50));

   coin.addImage(coinImg);
   coin.scale=(0.2);

   coinGroup.add(coin);
  }
}