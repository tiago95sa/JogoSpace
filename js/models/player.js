import Bullets from './Bullets.js';

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'player');        
        this.scene=scene;
        this.alive=true;
      
        
        this.nextTick=0;
        
        this.bullets=this.scene.physics.add.group({
            classType: Bullets,
            key:"bullet"
          });
        this.bulletNormal=true;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this); 
    }


    fire(time){

        
        if(time > this.nextTick) {
            var bullet = this.bullets.get();
                if (bullet) {
                    this.scene.tiro.play(); 
                    bullet.fire(this.x, this.y,0,-250);
                }
           
            var tickFreq=300;
            this.nextTick = time + tickFreq;
        }        
    }


    update (cursors) {
        this.setVelocity(0);
        if(this.y >200){
        
        if (cursors.up.isDown) {
          this.setVelocityY(-150);
          this.direction='up';
        } else if (cursors.down.isDown) {
          this.direction='down';
          this.setVelocityY(150);
        }

       
        if (cursors.left.isDown) {
          this.direction='left';
          this.setVelocityX(-150);
        } else if (cursors.right.isDown) {
          this.direction='right';
          this.setVelocityX(150);
        }
      } else {
      this.scene.gameOver();
      }
    }

}