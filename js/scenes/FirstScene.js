import Player from "../models/player";
import Inimigo from "../models/inimigo";

export default class FirstScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.spritesheet("inimigo", "assets/enemies.png", {
      frameWidth: 96,
      frameHeight: 96,

    });

    this.load.image("background", "assets/background.jpg");
 
    this.load.image("bullet", "assets/bullet.png");

    this.load.image("player", "assets/player");

    this.load.audio('musica','assets/sound/som.ogg');
    this.load.audio('tiro', 'assets/sound/tiro.wav');
    this.load.audio('dano','assets/sound/levar_dano.ogg');
  }

  create() {


    this.soundtrack=this.sound.add('musica');
    this.tiro = this.sound.add('tiro');
    this.levar_dano = this.sound.add('dano');
    this.soundtrack.play();
    this.soundtrack.volume= 0.2;
    //background
    this.add.image(375, 250, 'background');
    

    //player
    this.player = new Player(this, 375, 450).setSize(40,60).setOffset(20, 30);

    //inimigos
    this.inimigo = new Inimigo(this.physics.world, this, []);
    
    //input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //evento
    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.inimigo.addNewEnemy,
      callbackScope: this,
      repeat: -1
    });

    //Colisao
    this.player.setCollideWorldBounds(true);
    this.physics.add.overlap(this.player , this.inimigo, this.gameOver,null,this);
    this.physics.add.overlap(this.player.bullets, this.inimigo,this.colisionHandler,null,this);
    
    // criar contador tempo 
    this.tempo = 90 ;
    this.txtTime = this.add.text( 500, 15 , 'TEMPO: ' + this.tempo,{font:'15px emulogic',fill:'#fff'});
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.funcaoTempo, callbackScope: this, loop: true });

    //variaveis
    this.pontos = 0;
    this.qtPontos = this.add.text(15,15,"PONTOS: " + this.pontos , {font: '15px emulogic' , fill: '#fff'});

  }

  update(time) {
    this.player.update(this.cursors);
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      //tempo do jogo será passado para o objeto nave
      this.player.fire(time);
    }
  }

  gameOver(){
    this.soundtrack.stop();
    this.scene.stop();
    this.scene.start('GameOver');
    
  }

  gameOverWin(){
    //this.soundtrack.stop();
    this.scene.stop();
    this.scene.start('FinalScene');
  }
  

  colisionHandler(bullet, enemy) {
    this.levar_dano.play();
    bullet.destroy();
    enemy.destroy();
    this.pontos++;
    this.qtPontos.text = "PONTOS: " + this.pontos;
    if(this.pontos == 10){
      this.gameOverWin();
    }
  }

  funcaoTempo(){
    if(this.tempo == 0){
      this.gameOver();

    }
    this.tempo -- ;
    this.txtTime.text = "Tempo: " + this.tempo; 
  }

}