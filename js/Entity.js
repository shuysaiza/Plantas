class Entity{
	constructor(image, x, y, w, h,life=undefined, casillaX=undefined, casillaY=undefined, crop=undefined, foto=undefined){
		this.sprite = new Sprite(image);
		this.x = x;	
		this.y = y;
		this.w = w;
		this.h = h;
		this.dx = 0;
		this.dy = 0;
		this.casillaX=casillaX;
		this.casillaY=casillaY;
		this.foto=foto;
		this.life=life;
		this.crop = crop;
	}

	set speedX(dx){
		this.dx = dx;
	}

	get speedX(){
		return this.dx;
	}

	set speedY(dy){
		this.dy = dy;
	}

	get speedY(){
		return this.dy;
	}

	move(){
		this.x += this.dx;
		this.y += this.dy; 
	}

	draw(){
		this.sprite.draw(this.x, this.y, this.w, this.h, this.crop);
	}
}