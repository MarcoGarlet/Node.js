# Design Pattern in Node-js

[UML-diagram Cheatsheet](https://imgv2-1-f.scribdassets.com/img/document/329323300/original/9f4d8fc1fa/1683664721?v=1)

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
* Abstract Factory
* Static Factory
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

## Builder

* Builder design pattern separates the construction of complex objects from their representation. It allows you to construct objects step by step using a builder object, providing a clear and flexible way to create different configurations of objects while keeping the construction process simple and consistent.
* In this [example](code/creational/builder) there are two classes: *Character* and *CharacterBuilder*. 
* *Character* class represents a game character with properties like name, type, faction, weapon, and armor. 
* The *CharacterBuilder* class is responsible for constructing Character objects.
* The *CharacterBuilder* class has a constructor that takes in the initial values for the character's name and type. It also has additional methods like *setFaction()*, *setWeapon()*, and *setArmor()* to set the optional properties of the character.
* The methods in the *CharacterBuilder* class return the builder object itself (this), allowing method chaining.
* This allows you to set multiple properties of the character in a fluent manner: e.g. *evilMageBuilder = new CharacterBuilder('Saruman', 'Mage').setFaction('Evil').setWeapon('Staff').setArmor('Robe');*
* The *build()* method in the CharacterBuilder class creates a new Character object using the values provided through method chaining and returns it as the final result.



## Factory

* Instead of using class constructor or *new* keyword to create an object of a class, we can abstract this process.
* We can determine the type of the object at runtime, by the time of generating that class object.
* See here an [example](code/creational/factory)
* Why don’t we create the objects using new keyword? Because we want to separate the part of code that is most likely to change from the others.
* We separate the concrete factories (Audi, BMW) from the abstract factory to adhere the Open-Closed Principle.
* If we wrote abstract factory concrete, we would have an *orderCar* method with an internal switch case and every time we add a new Car Class the Factory class would be open for modification. 

## Abstract Factory

* We create abstract and concrete class for each products we want to produce.
* In my [example](code/creational/abstract_factory), we have two different concrete class (Warrior and Mage). For simplicity are the same concrete class for the factories but it is possible to have a different Warrior and Mage for the different factory extending the same interface.
* Two different concrete factories (Evil and Good) that produce Warriors and Mage.

## Static Factory

* The static factory method in this [example](code/creational/static_factory) provides a way to encapsulate and control the object creation process within the Car class.
* It separates the responsibility of object creation, offers flexibility, and simplifies the API for creating specific car models.
* The static factory methods provide a single point of entry for creating instances of specific car models. This allows you to modify the creation logic or introduce additional steps without affecting the calling code. For example, you can add validation, caching, or additional customization during the creation process.

# Structural Design Patterns

* Adapter
* Bridge


## Adapter

* The Adapter pattern is used to convert the interface of one class into another interface that clients expect. It allows classes with incompatible interfaces to work together by providing a common interface.
* In a system, you may have existing classes or components that have different interfaces and are not directly compatible. However, you need to use them together or interact with them as if they have a unified interface.
* In this [example](code/structural/adapter) the Adapter pattern is used to adapt a legacy API to be used as a new API.
* The core is in *APIAdapter*, where *newApi* is imported and it is instantiated when you want to call the method that old API do not offer.

## Bridge

* The Bridge pattern is used to decouple an abstraction from its implementation, allowing them to vary independently. It separates the abstraction and its implementation into separate hierarchies, allowing them to evolve independently.
* In this [example](code/structural/bridge) the Bridge pattern is used to separate the abstraction of a weapon from its implementation, in a Middle Ages context.
* The starting situation is that we have a Weapon abstraction (Weapon) that defines the methods for all types of weapons, such as *getType()*, *getDamage()*, and *attack()*. We also have a specific type of weapon, Sword, that extends the Weapon abstraction and overrides the *attack()* method to include the implementation of swinging the sword.
* However, the specific implementation of how the weapon is used, such as how it is swung, is not part of the Weapon abstraction. This means that every time a new type of weapon is added, we need to modify the *attack()* method to include the specific implementation of that weapon.
* The vision is to separate the Weapon abstraction from its implementation, so that they can vary independently. This means that we can add new types of weapons without modifying the *attack()* method of the Weapon abstraction.
* To achieve this, we use the Bridge pattern to create an interface (WeaponImpl) for the implementation of a weapon, and a concrete implementation of the interface (WeaponImpl). 
* We then pass the concrete implementation to the constructor of the specific type of weapon (Sword), and call its *use()* method before calling the *attack()* method of the Weapon abstraction.
* This way, we can add new types of weapons by creating new classes that extend the Weapon abstraction and provide their own implementations of the *attack()* method, without having to modify the *attack()* method of the Weapon abstraction or the implementation of the weapon. This is the vision that the Bridge pattern helps us achieve.





