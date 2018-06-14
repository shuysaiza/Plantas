class SunEntity extends Entity{
	constructor(image, x, y, w ,h,life, crop){
		super(image, x, y, w, h,life, crop);
	}

	static get DOWN(){
		return 1;
	}

}