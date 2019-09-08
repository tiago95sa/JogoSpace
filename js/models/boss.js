export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "boss");
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      scene.physics.world.enable(this);
      this.setFrame(1);
      this.vida = 100000;
    }


}