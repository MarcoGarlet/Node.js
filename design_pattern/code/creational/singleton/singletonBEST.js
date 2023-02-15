class SingletonBest {
  constructor() {
    this.databaseConnection = 'conn1';
  }

  getNewDBConnection() {
    return this.databaseConnection;
  }
}

module.exports = new SingletonBest();
