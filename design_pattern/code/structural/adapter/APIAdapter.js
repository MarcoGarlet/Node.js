const NewAPI = require('./newAPI');
const LegacyApi = require('./legacyAPI');

class APIAdapter {
  constructor(legacyAPI) {
    this.legacyAPI = legacyAPI;
  }

  getNameAndAge() {
    const name = this.legacyAPI.getName();
    const age = this.legacyAPI.getAge();
    const newAPI = new NewAPI(name, age);
    return newAPI.getNameAndAge();
  }
}

module.exports = APIAdapter;


