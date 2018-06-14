class WallNutEntity extends Entity{
	constructor(image, x, y, w ,h, life,casX,casY, crop){
		let casillaX = casX;
		let casillaY = casY;
		super(image, x, y, w, h, life, casillaX, casillaY, crop);
	}
}