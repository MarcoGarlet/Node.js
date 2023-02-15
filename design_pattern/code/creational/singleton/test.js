const Singleton = require('./singleton');
const SingletonBest = require('./singletonBEST') // this is an instance no more a class


let s = new Singleton('conn1')
console.log(s)
try{
	let s1 = new Singleton('conn2')
} catch(err){
	console.log('Singleton creation error')
}

let s3 = SingletonBest;
console.log(s3);

let s4 = SingletonBest;
console.log(s4);

