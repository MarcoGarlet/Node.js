# Reactor Pattern

Node works on event driven architecture and it has a event demultiplexer and event queue.

All I/O (the most expensive instructions) generates a event and these events are processed in the following steps:
* Event demultiplexer collects I/O requests that come from a set of watched resources.
* When I/O completes, push events and handlers into the Event Queue.
* For each event available in the Queue, the Event Loop process them in sequence until event queue get empty.
* Once event queue gets empty and there is no more I/O operations registered in event demultiplexer, the event loop stops working and program will complete.


The event loop is the core of nodejs architecture, making nodejs non blocking and asynchronous.
Event Loop is single threaded and semi infinite loop, its called semi-infinite because it can be stopped or paused by certain events or by explicitly calling functions such as *process.exit()* or *setImmediate()*. The term *semi-infinite* is used to indicate that the loop can run indefinitely as long as there are events to process, but it can still be interrupted or stopped if necessary.

# Event Demultiplexer

Is a native mechanism to handle concurrent, non blocking resources in an efficient way; this mechanism is also called synchronous event demultiplexer or event notification interface.
This component collects and queue I/O events that comes from a set of watched resources, and block until new events are available to process.

## example

```
socketA, pipeB;
watchedList.add(socketA, FOR_READ); //[1]
watchedList.add(pipeB, FOR_READ);
while(events = demultiplexer.watch(watchedList)) { //[2]
	//event loop
	foreach(event in events) { //[3]
	 //This read will never block and will always return data
		data = event.resource.read();
		if(data === RESOURCE_CLOSED)
			 //the resource was closed, remove it from the watched list
			 demultiplexer.unwatch(event.resource);
 		else
		//some actual data was received, process it
			consumeData(data);
 	}
}
``` 
* The resources are added to a data structure, associating each one of them with a specific operation, in our example a read.
* The event notifier is set up with the group of resources to be watched. This call is synchronous and blocks until any of the watched resources is ready for a read. When this occurs, the event demultiplexer returns from the call and a new set of events is available to be processed.
* Each event returned by the event demultiplexer is processed. At this point, the resource associated with each event is guaranteed to be ready to read and to not block during the operation. When all the events are processed, the flow will block again on the event demultiplexer until new events are again available to be processed. This is called the event loop.


# Libuv

* Each Operating System has its own interface for the Event Demultiplexer: epoll on linux, kqueue on Mac OSX, and I/O Completion Port API (IOCP) on Windows.
* Besides that, each I/O operation can behave quite differently depending on the type of the resource, even within the same OS.
* For example, in Unix, regular filesystem files do not support non-blocking operations, so, in order to simulate a non-blocking behavior, it is necessary to use a separate thread outside the Event Loop. 
* All these inconsistencies across and within the different operating systems required a higher-level abstraction to be built for the Event Demultiplexer. 
* This is exactly why the Node.js core team created a C library called libuv, with the objective to make Node.js compatible with all the major platforms and normalize the non-blocking behavior of the different types of resource; libuv today represents the low-level I/O engine of Node.js.
* Besides abstracting the underlying system calls, libuv also implements the reactor pattern, thus providing an API for creating event loops, managing the event queue, running asynchronous I/O operations, and queuing other types of tasks.

# Recipes for Node.js

The reactor pattern and *libuv* are the basic building blocks of Node.js, but we need the following three other components to build the full platform:
* A set of bindings responsible for wrapping and exposing the *libuv* and other low-level functionality to Javascript.
* V8, the Javascript engine originally developed by Google for the Chrome browser.
* A core JavaScript library (called node-core) that implements the high-level Node.js API.

# Thread Pool

There are some complexities with some I/O operations which requires more time to get processed, modules like fs, crypto, database operations. 
To avoid the blocking of event loop, Thread Pool (aka Worker Pool) concept is added to Node js.

Thread Pool is maintained by the libuv library to perform long running operations in background and stops blocking the event loop. The default size of libuv thread pool is 4 and can be increased by setting UV\_THREADPOOL\_SIZE in environment variable.

# Using Events

* Core feature of Node.js is asynchronous programming.
* Code in Node.js may not be executed sequentially.
* Data may not be determined in a fixed amount of time.
* When an event with a given name is emitted: the event can listen to the listener, if the listener is specified to listen to the event with the name. 
* Event emitter functions are called synchronously.
* Node.js has an EventEmitter class — it can be extended by a new class created to emit events that can be listened to by event listeners.


# Define Event Emitters

Simple example of creating and using *EventEmitter* class:
```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();

eventEmitter.on('event', () => {
  console.log('event emitted!');
});

eventEmitter.emit('event');
```
* In the code above, we created the Emitter which extends the EventEmitter class.
* It has the emit function we called in the last line.
* The argument of the emit function is the name of the event.
* The callback function, after the *event* argument above, is the event handler function, that runs when the event is received.

In the code above, we emitted an event. 
However, it’s not very useful since we didn’t pass any data with the emitted event when we emit the event so it doesn’t do much. 
Therefore, we want to send data with the event so that we can pass data around so that we can do something useful in the event listener. 
To pass data when we emit an event, we can pass in extra arguments after the first argument, which is the event name. 

For instance, we can write the following code:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on('event', (a, b) => {
  console.log(a, b);
});
eventEmitter.emit('event', 'a', 'b');
```


Accessing the event emitter object inside the event listener callback function we can discover an interesting behaviour:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on('event', function(a, b){
  console.log(a, b);
  console.log(`Instance of EventEmitter: ${this instanceof EventEmitter}`);
  console.log(`Instance of Emitter: ${this instanceof Emitter}`);
});
eventEmitter.emit('event', 'a', 'b');

```

Running the above code we get this logged in console log:

```
a b
Instance of EventEmitter: true
Instance of Emitter: true
```


On the other hand if we have the following:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on('event', (a, b) => {
  console.log(a, b);
  console.log(`Instance of EventEmitter: ${this instanceof EventEmitter}`);
  console.log(`Instance of Emitter: ${this instanceof Emitter}`);
});
eventEmitter.emit('event', 'a', 'b');
```

Then we get this logged in the console.log:

```
a b
Instance of EventEmitter: false
Instance of Emitter: false
```

This is because arrow functions do not change the this object inside it. 

# Let's dive into it:


* Usually this inside a function can be different from this outside the function, depending on how the function is called.
* When you use this inside a function, the value of this depends on the function's execution context. 
* If the function is called as a method of an object, this will refer to the object that the method is called on. 

```
const myObj = {
  myMethod() {
    console.log(this); // logs myObj
  }
};

myObj.myMethod();
```


* However, if the function is called with a regular function call, the value of this will be the global object in non-strict mode, or undefined in strict mode:

```
function myFunction() {
  console.log(this); // logs the global object (in non-strict mode)
}

myFunction();
```

* In this case, the value of this inside myFunction is the global object, because myFunction is being called with a regular function call.


* In arrow functions, this is lexically bound, which means it is determined by the surrounding execution context, rather than the function's execution context. 
* When you use this inside an arrow function, it will refer to the value of this in the enclosing lexical scope.

```
const myObj = {
  myMethod() {
    const myArrowFunction = () => {
      console.log(this); // logs myObj
    };
    myArrowFunction();
  }
};

myObj.myMethod();
```


* Events are handled every time they’re emitted. 
* Event listeners are called in the order in which they were registered and this is provided by the EventEmitter object:

For example, if we have:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
let x = 1;
eventEmitter.on('event', (a, b) => {
  console.log(x++);
});
for (let i = 0; i < 5; i++){
  eventEmitter.emit('event');
}
```

When you register an event listener using the on method of an EventEmitter instance, the listener function is added to an internal array of listeners for that particular event. When the event is emitted using the emit method, the listeners are called in the order in which they were added.

This behavior is documented in the Node.js documentation for EventEmitter:

```
From documentation... 

When the emit method is called, all of the functions listening to that particular event are called in order. A typical use case for the EventEmitter is a scenario where you need to handle some sort of asynchronous or synchronous event. When the event is emitted, each registered listener is called synchronously, in the order in which they were registered. This allows the events to be handled in the order in which they were received.
```

However if we modify the code in this manner:
```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
let x = 1;
eventEmitter.on('event', (a, b) => {
  setImmediate(() => {
    console.log('event handled asychronously');
  	});
  });
for (let i = 0; i < 5; i++){
  eventEmitter.emit('event');
}
```

* The event listener function is wrapped in a setImmediate call, which schedules the listener to be executed on the next turn of the event loop, rather than immediately after the emit call.
* The setImmediate method is used to delay the execution of a callback function until after the current turn of the event loop has completed. This means that any other callbacks that have been added to the event loop before the setImmediate callback will be executed first.
* The execution order of the callback function in the given code example is not guaranteed to be the same as the order in which they were added.

Another interesting example is this:
```
//If we want to emit an event and handle it only the first time it’s emitted, then we use the eventEmitter.once() function, as in this code:
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
let x = 1;
eventEmitter.once('event', (a, b) => {
  console.log(x++);
});
for (let i = 0; i < 5; i++){
  eventEmitter.emit('event');
}

```

As expected, we only get this logged in the console.log statement of the event handler above:

```
1
```

# Error Handling


If an error event is emitted in the case of errors, it’s treated as a special case within Node.js. 
If the EventEmitter doesn’t have at least one error event listener register and an error is emitted, the error is thrown, and the stack trace of the error will be printed, and the process will exit. 

For example, if we have the following code:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.emit('error', new Error('Error occured'));
```

Then we get something like this and the program exits:


```
Error [ERR_UNHANDLED_ERROR]: Unhandled error. (Error: Error occured
    at evalmachine.<anonymous>:5:28
    at Script.runInContext (vm.js:133:20)
    at Object.runInContext (vm.js:311:6)
    at evaluate (/run_dir/repl.js:133:14)
    at ReadStream.<anonymous> (/run_dir/repl.js:116:5)
    at ReadStream.emit (events.js:198:13)
    at addChunk (_stream_readable.js:288:12)
    at readableAddChunk (_stream_readable.js:269:11)
    at ReadStream.Readable.push (_stream_readable.js:224:10)
    at lazyFs.read (internal/fs/streams.js:181:12))
    at Emitter.emit (events.js:187:17)
    at evalmachine.<anonymous>:5:14
    at Script.runInContext (vm.js:133:20)
    at Object.runInContext (vm.js:311:6)
    at evaluate (/run_dir/repl.js:133:14)
    at ReadStream.<anonymous> (/run_dir/repl.js:116:5)
    at ReadStream.emit (events.js:198:13)
    at addChunk (_stream_readable.js:288:12)
    at readableAddChunk (_stream_readable.js:269:11)
    at ReadStream.Readable.push (_stream_readable.js:224:10)
```


To prevent the Node.js program from crashing, we can listen to the error event with a new event listener and handle the error gracefully in the error event handler. 
For example, we can write:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on('error', (error) => {
  console.log('Error occurred');
});
eventEmitter.emit('error', new Error('Error occurred'));
```

This is of course a toy example since the event emitter is listening on error and take one object as argument which is the error object.
However we get what we want: the *"error occurred"* logged.


# More Ways to Deal with Events

* Node.js will emit one special event without writing any code to emit the event: The newListener.
* The newListener event is emitted before a listener is added to the internal array of listeners. 

For example, if we have the following code:
```
const EventEmitter = require('events');
class Emitter extends EventEmitter {}
const eventEmitter = new Emitter();
eventEmitter.on('newListener', (event, listener) => {
  console.log(event);
});
```

Then we get something like this logged:


```
Emitter {
  _events: [Object: null prototype] { newListener: [Function] },
  _eventsCount: 1,
  _maxListeners: undefined }
```

* To trigger the listener function for the newListener event, you can either emit the event explicitly using the emit method, or add a listener for the newListener event using the on method.

The removeListener function can be used to stop event listener functions from listening to events. This takes two arguments: The first is a string that represents the event name, the second is the function that you want to stop using to listen to events. For example, if we want to stop listening to the “event” event with our listener function, then we can write this:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter { }
const eventEmitter = new Emitter();
const listener = () => {
  console.log('listening');
}
eventEmitter.on('event', listener)
setInterval(() => {
  eventEmitter.emit('event');
}, 300);
setTimeout(() => {
  console.log("removing");
  eventEmitter.removeListener('event', listener);
}, 2000);
```

Then we get something like this in the output:


```
Timeout {
  _called: false,
  _idleTimeout: 2000,
  _idlePrev: [TimersList],
  _idleNext: [TimersList],
  _idleStart: 1341,
  _onTimeout: [Function],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(unrefed)]: false,
  [Symbol(asyncId)]: 10,
  [Symbol(triggerId)]: 7 }listening
listening
listening
listening
listening
listening
removing
```

* The event emitter emits the “event” event in the code above once every 300 milliseconds. 
* This is listened to by the listener function, until it’s been prevented from listening again by calling the removeListener function with the “event” as the event name the listener event listener function in the callback of the setTimeout function.

* Multiple event listeners can register for a single event. 
* By default, the limit for the maximum number of event listeners is ten. 
* We can change this with the defaultMxListeners function in the EventEmitter class. 
* We can set it to any positive number. 
* If it’s not a positive number, then a TypeError is thrown. 
* If more listeners than the limit are registered then a warning will be output. 

For example, if we run the following code to register 11 event listeners for the “event” event:

```
const EventEmitter = require('events');
class Emitter extends EventEmitter { }
const eventEmitter = new Emitter();
const listener = () => {
  console.log('listening');
}
for (i = 1; i <= 11; i++){
  eventEmitter.on('event', listener);
}
eventEmitter.emit('event');
```

When we run the code above, we get this:



```
listening
listening
listening
listening
listening
listening
listening
listening
listening
listening
listening
(node:345) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 event listeners added. Use emitter.setMaxListeners() to increase limit
```

The sense is that we can attach multiple event listeners to one event that can do different things.
