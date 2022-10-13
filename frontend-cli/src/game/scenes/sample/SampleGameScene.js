import { Scene } from 'phaser'
import sky from '@/game/assets/sky.png'
import bomb from '@/game/assets/bomb.png'
import ground from '@/game/assets/platform.png'
import star from '@/game/assets/star.png'
import dude from '@/game/assets/dude.png'

var platforms;
var player;
var cursors;
var stars;
var bombs;

var score = 0;
var gameOver = false;
var gameOvertxt;
var scoreText;

export default class SampleGameScene extends Scene {
  constructor () {
    super({ key: 'SampleGameScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.image('ground', ground)
    this.load.image('star',star);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
  }

  create () {
    this.add.image(400, 300, 'sky')

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);

    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
     });

    player.body.setGravityY(300)

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
  
    stars.children.iterate(function (child) {
  
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
    });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.physics.add.collider(stars, platforms);
    
    this.physics.add.overlap(player, stars, collectStar, null, this);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    gameOvertxt = this.add.text(400, 300,"Game Over",{ font: "70px Arial", fill: "#FFFFFF" }); 
      
    gameOvertxt.visible = false;

    
  }

  update () {
    
    if(gameOver)
    {
      
      return;
    }
    
    if (cursors.left.isDown)
    {
      player.setVelocityX(-160);
      
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
      player.setVelocityX(160);
      
      player.anims.play('right', true);
    }
    else
    {
      player.setVelocityX(0);
      
      player.anims.play('turn');
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.setVelocityY(-470);
    }
  }
}

function collectStar (player, star)
  {
    star.disableBody(true, true);
    
    score += 10;
    scoreText.setText('Score: ' + score);
    
    if (stars.countActive(true) === 0)
    {
      //  A new batch of stars to collect
      stars.children.iterate(function (child) {
        
        child.enableBody(true, child.x, 0, true, true);
        
      });
      
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      
      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
      
    }
  }

  function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

     gameOver = true;
    
    gameOvertxt.visible=true;

    
}
