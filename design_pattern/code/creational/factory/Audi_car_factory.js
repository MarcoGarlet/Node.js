const CarFactory = require('./car_factory');
const Audi = require('./Audi');

class AudiCarFactory extends CarFactory {
	orderCar(){
		return new Audi();
	} 
}

module.exports = AudiCarFactory;