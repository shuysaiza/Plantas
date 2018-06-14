let entities;

let alea;
let cantSoles;
let cantZombies;

let posX;
let posY;
let widthCasilla;
let heightCasilla;
let level=1;
let chooseZombie=0;
let plantaTipo=0;

let tablero=[]

let endLose=false;
let endWin=false;

function setup() {
	
	createCanvas(1000, 500);
	frameRate(60);
	initGame();
	posX=190;
	posY=80;
	widthCasilla=60;
	heightCasilla=69;
}

function preload(){
	backL2=loadImage('images/level2.jpg');
	backL3=loadImage('images/level3.jpg');
	backL1=loadImage('images/level1.jpg');
	back=loadImage('images/level1.jpg');
	zombieN=loadImage('images/normal.png');
	zombieB=loadImage('images/bucket.png');
	zombieF=loadImage('images/frank.png');
	chichar=loadImage('images/Peas.png');
	sol=loadImage('images/sun.png');
	soles=loadImage('images/soles.png');
	zombies=loadImage('images/zombies.png');
	flor=loadImage('images/flor.png');
	nuez=loadImage('images/nuez.png');
	chicharin=loadImage('images/chicharo.png');
	repeater=loadImage('images/repeater.png');
	plantas=loadImage('images/plantasL3S.png');
	fondoEnd=loadImage('images/fondoEnd.png');
	
}

function draw() {
	background("white");
	if (cantZombies<=0) {
		level++
		if (level>3) {
			endWin=true;
		}else{
			initGame();
		}
	}
	
	if (frameCount%(600/level)===0) {
		chooseZombie=Math.round(random(1,level));
		switch(chooseZombie){
			case 1:
				createZombieN(Math.floor(random(0,5)));
			break;
			case 2:
				createZombieB(Math.floor(random(0,5)));
			break;
			case 3:
				createZombieF(Math.floor(random(0,5)));
			break;
		}
	}
	entities.forEach((entity)=>{
		
		entity.move()
		entity.draw();

		if (entity instanceof SunEntity) {
			if (mouseIsPressed) {
				if (mouseX>=entity.x && mouseX<=(entity.x+entity.w) && mouseY>=entity.y && mouseY<=(entity.y+entity.h)) {
					cantSoles++;
					let index = entities.indexOf(entity);
					entities.splice(index,1);
				}
			}
			if (entity.y>height) {
				let index = entities.indexOf(entity);
				entities.splice(index,1);
			}
		}
		if (entity instanceof PlantPeasEntity) {
			
			if (entity.life<=0) {
				tablero[entity.casillaY][entity.casillaX]=0;
				let index = entities.indexOf(entity);
				entities.splice(index,1);
			}else{
				if ((frameCount-entity.foto)%120==0) {
					createPeas(entity.x,entity.y);
				}
			}
		}
		if (entity instanceof WallNutEntity) {
			if (entity.life<=0) {
				let index = entities.indexOf(entity);
				entities.splice(index,1);
			}
		}

		if (entity instanceof PlantRepeaterEntity) {
			
			if (entity.life<=0) {
				tablero[entity.casillaY][entity.casillaX]=0;
				let index = entities.indexOf(entity);
				entities.splice(index,1);
			}else{
				if ((frameCount-entity.foto)%60==0) {
					createPeas(entity.x,entity.y);
				}
			}
		}
		if (entity instanceof PlantSunEntity) {
			if (entity.life<=0) {
				tablero[entity.casillaY][entity.casillaX]=0;
				let index = entities.indexOf(entity)
				entities.splice(index,1);
			}else{
				if ((frameCount-entity.foto)%300===0) {
					createSun(entity.x,entity.y);
				}
			}
		}
		if (entity instanceof PeasEntity) {
			if (entity.x>width-279) {
				let index = entities.indexOf(entity);
				entities.splice(index,1);
			}
		}
		if (entity instanceof NormalZEntity) {
			if (entity.life>=1) {
				if (entity.x<155) {
					endLose=true;
					let index = entities.indexOf(entity);
					entities.splice(index,1);
				}
				entities.forEach((plantas)=>{
					if (plantas instanceof PlantPeasEntity || plantas instanceof PlantSunEntity || plantas instanceof WallNutEntity || plantas instanceof PlantRepeaterEntity) {
						if (coordenadasEnX(entity.x-posX)===plantas.casillaX && coordenadasEnY(entity.y)===plantas.casillaY) {
							plantas.life--;
							entity.x+=200;
							let index = entities.indexOf(plantas);
							entities.splice(index,plantas);
						}
					}
					if (plantas instanceof PeasEntity) {
						if ((entity.x===plantas.x || entity.x===plantas.x-1 || entity.x===plantas.x+1) && (coordenadasEnY(entity.y)+1)===coordenadasEnY(plantas.y)) {
							entity.life--;
							let index = entities.indexOf(plantas);
							entities.splice(index,1);
						}
					}

				});
			}else{
				let index = entities.indexOf(entity);
				entities.splice(index,1);
				cantZombies--;
			}
		}
		if (entity instanceof BucketZEntity) {
			if (entity.life>=1) {
				if (entity.x<155) {
					endLose=true;
					let index = entities.indexOf(entity);
					entities.splice(index,1);
				}
				entities.forEach((plantas)=>{

					if (plantas instanceof PlantPeasEntity || plantas instanceof PlantSunEntity || plantas instanceof WallNutEntity || plantas instanceof PlantRepeaterEntity) {
						if (coordenadasEnX(entity.x-posX)===plantas.casillaX && coordenadasEnY(entity.y)===plantas.casillaY) {
							plantas.life--;
							entity.x+=100;
							let index = entities.indexOf(plantas);
							entities.splice(index,plantas);
						}
					}
					if (plantas instanceof PeasEntity) {
							if ((entity.x===plantas.x || entity.x===plantas.x-1 || entity.x===plantas.x+1) && (coordenadasEnY(entity.y)+1)===coordenadasEnY(plantas.y)) {
								entity.life--;
								let index = entities.indexOf(plantas);
								entities.splice(index,1);							
							}
						}

				});
			}else{
				let index = entities.indexOf(entity);
				entities.splice(index,1);
				cantZombies-=2;
			}
		}
		if (entity instanceof FrankZEntity) {
			if (entity.life>=1) {
				if (entity.x<155) {					
					endLose=true;
					let index = entities.indexOf(entity)
					entities.splice(index,1);
				}
				entities.forEach((plantas)=>{
					if (plantas instanceof PlantPeasEntity || plantas instanceof PlantSunEntity || plantas instanceof WallNutEntity || plantas instanceof PlantRepeaterEntity) {
						if (coordenadasEnX(entity.x-posX)===plantas.casillaX && coordenadasEnY(entity.y)===plantas.casillaY) {
							plantas.life=0;
							let index = entities.indexOf(plantas);
							entities.splice(index,plantas);
						}
					}
					if (plantas instanceof PeasEntity) {
						if ((entity.x===plantas.x || entity.x===plantas.x-1 || entity.x===plantas.x+1) && (coordenadasEnY(entity.y)+1)===coordenadasEnY(plantas.y)) {
							entity.life--;
							let index = entities.indexOf(plantas);
							entities.splice(index,1);
						}
					}

				});
			}else{
				let index = entities.indexOf(entity);
				entities.splice(index,1);
				cantZombies-=3;
			}
		}
	});
	alea=Math.floor(random(0,600));
	if (alea===2) {
		sun(SunEntity.UP);
	}
	
	image(soles,1,24);
	image(zombies,833,24);
	fill("white");
	textSize(50);
	if (cantSoles<10){
		text(cantSoles,90,80);
	}else{
		text(cantSoles,80,80);
	}
	if (cantZombies<10) {
		text(cantZombies,922,80);
	}else{
		text(cantZombies,905,80);
	}

	switch(plantaTipo){
		case 1:
			image(chicharin,mouseX-20,mouseY-20,49, 51);
		break;
		case 2:
			image(flor,mouseX-20,mouseY-20,49, 55);
		break;
		case 3:
			image(nuez,mouseX-20,mouseY-20,49, 58);
		break;
		case 4:
			image(repeater,mouseX-20,mouseY-20,49, 51);
		break;
	}

	if (endLose || endWin) {
		image(fondoEnd,150,90)
		textSize(90);
		if (endWin) {
			text("YOU WIN", 232,200)
		}else{
			text("YOU LOSE",200,200)
		}
		noLoop()
	}


}



const sun = function(dir){
	let x=Math.floor(random(0,width));

	let sonny= new SunEntity(sol,x,0,100,100)
	sonny.speedY=1
	entities.push(sonny);
}

const createBg = function(){
	let crop={
		x : 0,
		y : 0,
		w : 800,
		h : 429,
	}
	let bgEntity = new GroundEntity(back, 10, 10, width, height, crop);
	entities.push(bgEntity);
}

const createPlantas = function(){
	let width=0;
	let crop={
		x:0,
		y:0,
		w:0,
		h:197,
	}
	switch(level){
		case 1:
			//crop.x=100
			crop.w=340;
			width=121;
		break;
		case 2:
			crop.w=504;
			width=179;
		break;
		case 3:
			crop.w=676;
			width=240;
		break;
	}
	let plantasEn = new PlantasEntity(plantas,190,10,width,70,undefined, undefined, undefined,crop);
	entities.push(plantasEn);
}

const createZombieN = function(casilla){
	let yPos=-20+(casilla*90);
	if (yPos<0) {
		yPos=0;
	}

	let height= 108;
	let casillaY=coordenadasEnY(yPos+height/2);
	let zombiEn = new NormalZEntity(zombieN, width-109,yPos, 50, height,2);

	zombiEn.speedX=-0.5;
	entities.push(zombiEn);
}

const createZombieB = function(casilla){
	let yPos=10+(casilla*80);
	let height= 124;
	let casillaY=coordenadasEnY(yPos+height/2);
	let zombiEn = new BucketZEntity(zombieB, width-posX, yPos,50,height,4);

	zombiEn.speedX=-0.5;
	entities.push(zombiEn);
}

const createZombieF = function(casilla){
	let yPos=-10+(casilla*80);
	if (yPos<0) {
		yPos=0;
	}
	let height= 200;
	let casillaY=coordenadasEnY(yPos+height/2);

	let zombiEn = new FrankZEntity(zombieF, width-209,yPos,188,height,6);

	zombiEn.speedX=-0.5;
	entities.push(zombiEn);
}

const createChicharo = function(mX,mY){
	let casillaY=coordenadasEnY(mY-posY);
	let casillaX=coordenadasEnX(mX-posX);
	if (cantSoles>0 && tablero[casillaY][casillaX]===0) {

		let chicharinEn = new PlantPeasEntity(chicharin, posX+widthCasilla*casillaX, posY+heightCasilla*casillaY, 49, 51,5,casillaX, casillaY,undefined,frameCount);

		tablero[casillaY][casillaX]=1;
		cantSoles--;
		plantaTipo=0;
		entities.push(chicharinEn);
	}
}

const createRepeater = function(mX,mY){
	let casillaY=coordenadasEnY(mY-posY);
	let casillaX=coordenadasEnX(mX-posX);
	if (cantSoles>0 && tablero[casillaY][casillaX]===0) {

		let repeaterEn = new PlantRepeaterEntity(repeater, posX+widthCasilla*casillaX, posY+heightCasilla*casillaY, 49, 51,7,casillaX, casillaY,undefined,frameCount);
		
		tablero[casillaY][casillaX]=1;

		cantSoles-=2;
		plantaTipo=0;
		entities.push(repeaterEn);
	}
}

const createFlor = function(mX,mY){
	let casillaY=coordenadasEnY(mY-posY);
	let casillaX=coordenadasEnX(mX-posX);
	if(cantSoles>1 && tablero[casillaY][casillaX]===0){		
		let florEn = new PlantSunEntity(flor, posX+widthCasilla*casillaX, posY+heightCasilla*casillaY, 49, 55,5,casillaX, casillaY,undefined,frameCount);
		tablero[casillaY][casillaX]=1;
		cantSoles-=2;
		plantaTipo=0;
		entities.push(florEn);
	}

}

const createNuez = function(mX,mY){
	let casillaY=coordenadasEnY(mY-posY);
	let casillaX=coordenadasEnX(mX-posX);
	if (cantSoles>1 && tablero[casillaY][casillaX]===0) {
		let nuezEn = new WallNutEntity(nuez, posX+widthCasilla*casillaX, posY+heightCasilla*casillaY, 49, 58, 10,casillaX, casillaY);
		tablero[casillaY][casillaX]=1;
		cantSoles--;
		plantaTipo=0;
		entities.push(nuezEn);
	}
}

const createPeas = function(casX,casY){
	let peasEn = new PeasEntity(chichar, casX+22, casY+19, 22, 19);
	peasEn.speedX=1;
	entities.push(peasEn);
}

const createSun = function(casX,casY){
	let sunEn = new SunEntity(sol, casX-69, casY-69, 100, 100);
	sunEn.speedY=1;
	entities.push(sunEn);
}

const coordenadasEnY = function(dato){
	for(let i=1;i<=6;i++){
		if (dato<=heightCasilla*i && dato>=heightCasilla*(i-1)) {
			return i-1;
		}
	}
}

const coordenadasEnX = function(dato){
	for(let i=1;i<=9;i++){
		if (dato<=widthCasilla*i && dato>=widthCasilla*(i-1)) {
			return i-1;
		}
	}
}


const initGame = function(){
	tablero=[]
	cantSoles=0;
	cantZombies=0;
	entities=[];
	for(let i=0;i<5;i++){
		tablero[i]=[];
		for(let j=0;j<9;j++){
			tablero[i][j]=0;
		}
	}

	switch(level){
		case 1:
			cantZombies=10;
			back=backL1;
		break;
		case 2:
			cantZombies=20;
			back=backL2;
		break;
		case 3:
			cantZombies=30;
			back=backL3;
		break;
	}
	createBg();
	createPlantas();
	
}

function mouseReleased() {
	switch(plantaTipo){
		case 1:
			createChicharo(mouseX,mouseY);
		break;
		case 2:
			createFlor(mouseX,mouseY);
		break;
		case 3:
			createNuez(mouseX,mouseY);
		break;
		case 4:
			createRepeater(mouseX,mouseY);
		break;
	}
	
}

function mousePressed() {
	if (cantSoles>0 && mouseX>192 && mouseX<410 && mouseY>18 && mouseY <68) {
			if (mouseX < 234) {
				//peasShot
				plantaTipo=1;				
			}else if(mouseX<288){
				//SunFlower
				plantaTipo=2;				
			}else if (level>1 && mouseX<347) {
				//WallNut
				plantaTipo=3;
			}else if (level>2){
				//Repeater
				plantaTipo=4;
			}
		}
}
