class CarFactory {
	constructor(){
		if(this.constructor == CarFactory) {
			throw new Error("Abstract CarFactory can't be instantiated.");
		}
	}

	orderCar(){ 
	}
}


module.exports = CarFactory; // singleton
