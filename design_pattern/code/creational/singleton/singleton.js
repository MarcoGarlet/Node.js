class Singleton {
	static instanceCount=0;
	constructor(connection) {
		if(Singleton.instanceCount==0){
			this.connection = connection;
			Singleton.instanceCount+=1;
		}
		else
			throw new Error('Use the getInstance() method on the Singleton object!');
	}

	getInstance(){
		return this.connection;
	}

}
module.exports = Singleton
