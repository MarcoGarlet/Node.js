const CarFactory = require('./car_factory');
const BMW = require('./BMW');

class BMWCarFactory extends CarFactory {
	orderCar(){
		return new BMW();
	} 
}

module.exports = BMWCarFactory;