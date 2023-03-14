const BMWCarFactory = require('./BMW_car_factory');
const AudiCarFactory = require('./Audi_car_factory');


audyFactory = new AudiCarFactory();
BMWFactory = new BMWCarFactory();

my_audi = audyFactory.orderCar();
my_bmw = BMWFactory.orderCar();

my_audi.showInfo();
my_bmw.showInfo();






