export default class bola extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, player) {
        super(world, scene);
        this.scene = scene;
        this.player = player; 
     
      }

      
    

      addNovaBola(player){
        
        var vly = 100;
        var vlx = 0;

        var x = 400;
        var y = 250;
        var bolaa=this.bola.create(x,y,"bola");

        bolaa.anims.play("explusao" , true);
      
      

    if(this.player.x < 100 ){
      vlx = -150;
     
    }else if(this.player.x < 200){
      vlx = -100;
      
    }else if(this.player.x < 300){
      vlx = -50;
      
    }else if(this.player.x < 400){
      vlx = 0;
      
    }else if(this.player.x < 500){
      vlx = 50;
      
    }else if(this.player.x < 600){
      vlx = 100
      
    }else{
      vlx = 150;
      
    }

    bolaa.setVelocityX(vlx);
    bolaa.setVelocityY(vly);

    /*

   if(this.player.x < 250 && this.player.y < 166){
    bolaa.setVelocityX(-150);
    bolaa.setVelocityY(-50);
} else if((this.player.x >= 250 && this.player.x < 500) && this.player.y < 166){
   
    bolaa.setVelocityY(-150);

} else if((this.player.x >= 500 && this.player.x < 750) && this.player.y < 166){
    bolaa.setVelocityX(150);
    bolaa.setVelocityY(-50);

}else if((this.player.x >= 0 && this.player.x < 250) && (this.player.y >= 166 && this.player.y<= 332)){
    bolaa.setVelocityX(-150);
   

}else if((this.player.x >= 500 && this.player.x < 750) && (this.player.y >= 166 && this.player.y<= 332)){
    bolaa.setVelocityX(150);
 

}else if((this.player.x >= 0 && this.player.x < 250) && this.player.y >332){
    bolaa.setVelocityX(-150);
    bolaa.setVelocityY(50);

}else if((this.player.x >= 250 && this.player.x < 500) && this.player.y >332){
    bolaa.setVelocityY(150);
}else if((this.player.x >= 500 && this.player.x < 750) && this.player.y >332){
    bolaa.setVelocityX(150);
    bolaa.setVelocityY(30); // aqui
}else if((this.player.x >= 250 && this.player.x < 375) && this.player.y <=249){
    bolaa.setVelocityX(-150);
    bolaa.setVelocityY(-50);
}else if((this.player.x >= 375 && this.player.x < 500) && this.player.y <=249){
    bolaa.setVelocityX(150);
    bolaa.setVelocityY(-50);
}else if((this.player.x >= 250 && this.player.x < 375) && this.player.y >249){
    bolaa.setVelocityX(-150);
    bolaa.setVelocityY(50);
}else if((this.player.x >= 250 && this.player.x < 375) && this.player.y >249){
    bolaa.setVelocityX(150);
    bolaa.setVelocityY(30);
}*/

      
      }
}