export default class Inimigo extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children) {
        super(world, scene);
        this.scene = scene;
        
      }

      addNewEnemy(){
        var y = 100;
        var x = 100*Math.floor(Math.random() * 7) + 1;
        var ini=this.inimigo.create(x,y,'inimigo');
       
        ini.setFrame(2);
        ini.setScale(0.5);
        ini.checkWorldBounds = true;
        ini.outOfBoundsKill = true;
        ini.setVelocityY(100);
      }

}