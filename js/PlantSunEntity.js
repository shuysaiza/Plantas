class PlantSunEntity extends Entity{
	constructor(image, x, y, w ,h, life,casX,casY, crop,foto){
		let casillaX = casX;
		let casillaY = casY;
		super(image, x, y, w, h, life, casillaX, casillaY, crop,foto);
	}
}