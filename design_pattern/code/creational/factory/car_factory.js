
const Audi = require('./Audi');
const BMW = require('./BMW');

class CarFactory {
	create(type){ // no constructor just method create
		switch (type){
			case 'Audi':
				return new Audi();
			case 'BMW':
				return new BMW();
			default:
				console.log('Unknown car type ...');
	
		}

	}
}


module.exports = new CarFactory(); // singleton
