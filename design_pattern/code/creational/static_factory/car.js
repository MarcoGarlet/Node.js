class Car{
	static createAudi(){
		let audi = new Car();
		audi.name = 'Audi' + '-' + Math.random().toString(36).substring(2,15);
		return audi
	}
	static createBMW(){
		let bmw = new Car();
		bmw.name = 'BMW' + '-' + Math.random().toString(36).substring(2,15);
		return bmw
	
	}

	showInfo(){
		console.log(`I\'m ${this.name}`)
	}
}

module.exports = Car

