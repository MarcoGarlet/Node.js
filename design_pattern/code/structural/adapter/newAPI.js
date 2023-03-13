class NewAPI {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getNameAndAge() {
    return `${this.name} is ${this.age} years old`;
  }
}

module.exports = NewAPI;
