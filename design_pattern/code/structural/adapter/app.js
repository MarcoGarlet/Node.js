const LegacyAPI = require('./legacyAPI');
const APIAdapter = require('./APIAdapter');

const legacyAPI = new LegacyAPI();
const apiAdapter = new APIAdapter(legacyAPI);
console.log(apiAdapter.getNameAndAge()); 




