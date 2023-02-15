class Car{
	constructor(name){
		this.name = name + '-' + Math.random().toString(36).substring(2,15);
	}
	showInfo(){
		console.log(`I\'m ${this.name}`)
	}
}

module.exports = Car
