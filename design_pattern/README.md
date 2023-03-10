# Design Pattern in Node-js

* We know that design patterns allow us to re-use of code for re-occuring problems.
* Instead of solving the same problems again and again we can re-use efficient code that already works.

We use design patterns because they are:

* well documented and tested 
* reusable in many different situation 
* efficient
* save your time

Please consider that software design patterns can only be used in OOP languages. That's because they require code to be structured in objects and javascript is also an object oriented language.


## Type of design patterns

* Creational - the creation of the object instances 
* Structural - the way the object are designed 
* Behavioural - how object interacts with each other

# Creational Design Patterns 

* Singleton 
* Factory
* Builder
* Prototype

## Singleton

* We use this design pattern when we only want a single instance of a class.
* That means we cannot create multiple instances - just one.
* See here an [example](code/creational/singleton)
* Please note that there are two version of Singleton, one more classic and the other more subtle.
* The best version exploit the module caching system of node.
* The module caching system states that "modules are cached after the first time they are loaded.
* We export the instance of the class instead of the class, so with the module caching system this will be the only one instance of the class.



## Factory

* Instead of using class constructor or *new* keyword to create an object of a class, we can abstract this process.
* We can determine the type of the object at runtime, by the time of generating that class object.
* See here an [example](code/creational/factory)
* Why don’t we create the objects using new keyword? Because we want to separate the part of code that is most likely to change from the others.
* In the future, if we need to modify the process of creating objects, we only need to change code inside the create() method of SimpleFactory class. So this client is not affected by these modifications.
* CONST: In case we want to add a new Car subclass, or delete an existing one, we have to change code in the factory’s create() method.


# Structural Design Patterns

* Adapter
* Bridge


## Adapter

## Bridge

* The Adapter pattern is a structural design pattern that allows incompatible objects to work together by creating a wrapper that translates one interface to another. 
* It's useful when you have an existing codebase that you want to integrate with new code that has a different interface.
* In this [example](code/structural/bridge) the Bridge pattern is used to separate the abstraction of a weapon from its implementation, in a Middle Ages context.
* The starting situation is that we have a Weapon abstraction (Weapon) that defines the methods for all types of weapons, such as *getType()*, *getDamage()*, and *attack()*. We also have a specific type of weapon, Sword, that extends the Weapon abstraction and overrides the *attack()* method to include the implementation of swinging the sword.
* However, the specific implementation of how the weapon is used, such as how it is swung, is not part of the Weapon abstraction. This means that every time a new type of weapon is added, we need to modify the *attack()* method to include the specific implementation of that weapon.
* The vision is to separate the Weapon abstraction from its implementation, so that they can vary independently. This means that we can add new types of weapons without modifying the *attack()* method of the Weapon abstraction.
* To achieve this, we use the Bridge pattern to create an interface (WeaponImpl) for the implementation of a weapon, and a concrete implementation of the interface (WeaponImpl). 
* We then pass the concrete implementation to the constructor of the specific type of weapon (Sword), and call its *use()* method before calling the *attack()* method of the Weapon abstraction.
* This way, we can add new types of weapons by creating new classes that extend the Weapon abstraction and provide their own implementations of the *attack()* method, without having to modify the *attack()* method of the Weapon abstraction or the implementation of the weapon. This is the vision that the Bridge pattern helps us achieve.





