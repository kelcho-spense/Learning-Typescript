# Object-Oriented Programming in TypeScript

## Table of Contents

- [Introduction to OOP](#introduction-to-oop)
- [Classes and Objects](#classes-and-objects)
- [Properties and Methods](#properties-and-methods)
- [Constructors](#constructors)
- [Access Modifiers](#access-modifiers)
- [Encapsulation](#encapsulation)
- [Inheritance](#inheritance)
- [Polymorphism](#polymorphism)
- [Abstraction](#abstraction)
- [Interfaces](#interfaces)
- [Abstract Classes](#abstract-classes)
- [Static Members](#static-members)
- [Getters and Setters](#getters-and-setters)
- [Advanced Concepts](#advanced-concepts)

## Introduction to OOP

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code that manipulates that data. TypeScript fully supports OOP principles, enhancing them with static typing.

Key benefits of OOP include:

- **Modularity**: Encapsulating code into objects makes it easier to understand and maintain
- **Reusability**: Objects can be reused across different parts of an application
- **Scalability**: OOP makes it easier to scale applications by adding new objects without modifying existing code
- **Maintainability**: The structure provided by OOP makes code easier to debug and maintain

## Classes and Objects

### Classes

Classes are blueprints for creating objects. They define the structure and behavior of objects.

```typescript
class Person {
    // Class body
}
```

A `BankAccount` class can represent a customer's bank account.

```typescript
class BankAccount {
    // Properties (Attributes)
    accountHolder: string;
    balance: number;

    // Constructor to initialize object properties
    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // Method to deposit money
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Amount should be greater than 0");
        }
    }

    // Method to withdraw money
    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Invalid amount or insufficient funds.");
        }
    }
}
```

### Objects

Objects are instances of classes. They represent concrete entities with specific properties and behaviors.

```typescript
// Creating an instance (object) of a class
const person1 = new Person();
```

```typescript
// Creating an object (instance) of the class
const account = new BankAccount("John Doe", 1000);
account.deposit(500);  // Output: Deposited $500. New balance: $1500
account.withdraw(200);  // Output: Withdrew $200. New balance: $1300
```

## Properties and Methods

### Properties

Properties are variables declared in a class that represent the state of an object.

```typescript
class Person {
    // Properties
    name: string;
    age: number;
}

const person1 = new Person();
person1.name = "Alice";
person1.age = 30;
```

### Methods

Methods are functions defined within a class that describe the behaviors of an object.

```typescript
class Person {
    name: string;
    age: number;
  
    // Method
    greet(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person();
person1.name = "Bob";
person1.age = 25;
person1.greet(); // Output: Hello, my name is Bob and I am 25 years old.
```

## Constructors

Constructors are special methods called when creating an object. They initialize the object's properties.

```typescript
class Person {
    name: string;
    age: number;
  
    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
  
    greet(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// Creating an object with constructor
const person1 = new Person("Charlie", 35);
person1.greet(); // Output: Hello, my name is Charlie and I am 35 years old.
```

### Parameter Properties

TypeScript provides a shorthand for defining and initializing class properties in the constructor:

```typescript
class Person {
    // Parameter properties - shorthand for declaring and initializing class properties
    constructor(public name: string, public age: number) {
        // No need for explicit property assignment
    }
  
    greet(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
```

## Access Modifiers

TypeScript provides access modifiers to control the visibility and accessibility of class members.

```typescript
class Person {
    public name: string;        // Accessible from anywhere
    private dateOfBirth: Date;  // Accessible only within the class
    protected id: number;       // Accessible within the class and subclasses
  
    constructor(name: string, dob: Date, id: number) {
        this.name = name;
        this.dateOfBirth = dob;
        this.id = id;
    }
  
    // Public method - accessible from anywhere
    public getAge(): number {
        return new Date().getFullYear() - this.dateOfBirth.getFullYear();
    }
  
    // Private method - accessible only within the class
    private generateSecretCode(): string {
        return `SECRET-${this.id}`;
    }
}

const person = new Person("Diana", new Date(1990, 3, 15), 1001);
console.log(person.name);       // OK: Public property
// console.log(person.dateOfBirth); // Error: Private property
// console.log(person.id);          // Error: Protected property
console.log(person.getAge());   // OK: Public method
// person.generateSecretCode();     // Error: Private method
```

## Encapsulation

**Encapsulation** is the practice of restricting access to certain details of an object and exposing only the necessary functionality. This is achieved by using access modifiers like `public`, `private`, and `protected`.

```typescript
class BankAccount {
    private balance: number;  // Private property

    constructor(balance: number) {
        this.balance = balance;
    }

    // Public method to deposit money
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    // Public method to get balance
    getBalance(): number {
        return this.balance;
    }

    // Private method to validate the transaction
    private validateTransaction(amount: number): boolean {
        return amount > 0;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance());  // Output: 1500
// console.log(account.balance); // Error: 'balance' is private and cannot be accessed

```

## Inheritance

**Inheritance** allows a class to inherit properties and methods from another class. This is useful when creating more specialized classes based on a general class. For example, you can create a `SavingsAccount` class that inherits from the `BankAccount` class.

```typescript
// Base class (Parent class)
class BankAccount {
    accountHolder: string;
    balance: number;

    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): void {
        this.balance -= amount;
    }
}

// Derived class (Child class)
class SavingsAccount extends BankAccount {
    interestRate: number;

    constructor(accountHolder: string, balance: number, interestRate: number) {
        super(accountHolder, balance);  // Calling the parent class constructor
        this.interestRate = interestRate;
    }

    // Method to calculate interest
    calculateInterest(): void {
        const interest = this.balance * this.interestRate;
        console.log(`Interest earned: $${interest}`);
        this.balance += interest;
    }
}

// Creating an object of the derived class
const savings = new SavingsAccount("Jane Doe", 2000, 0.05);
savings.calculateInterest();  // Output: Interest earned: $100
console.log(savings.balance);  // Output: 2100

```

## Polymorphism

**Polymorphism** allows objects of different types to be treated as objects of a common superclass. This enables a common interface for different objects, while each object has its own specific behavior. This is often achieved through method overriding in derived classes.

```typescript
class BankAccount {
    accountHolder: string;
    balance: number;

    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // Common method for all accounts
    displayBalance(): void {
        console.log(`Balance for ${this.accountHolder}: $${this.balance}`);
    }
}

class CheckingAccount extends BankAccount {
    overdraftLimit: number;

    constructor(accountHolder: string, balance: number, overdraftLimit: number) {
        super(accountHolder, balance);
        this.overdraftLimit = overdraftLimit;
    }

    // Overriding the method to include overdraft limit
    displayBalance(): void {
        console.log(`Balance for ${this.accountHolder}: $${this.balance} (Overdraft limit: $${this.overdraftLimit})`);
    }
}

const accounts: BankAccount[] = [
    new BankAccount("John Doe", 500),
    new CheckingAccount("Jane Smith", 2000, 500)
];

accounts.forEach(account => account.displayBalance());

```

## Abstraction

**Abstraction** involves hiding the implementation details and showing only the necessary parts of an object. This can be achieved using abstract classes and interfaces. An abstract class cannot be instantiated directly and must be inherited by other classes that implement its methods.

### Abstract Classes

```typescript
abstract class Shape {
    color: string;
  
    constructor(color: string) {
        this.color = color;
    }
  
    // Abstract method (must be implemented by subclasses)
    abstract calculateArea(): number;
  
    // Concrete method
    displayColor(): void {
        console.log(`This shape is ${this.color}`);
    }
}

class Circle extends Shape {
    radius: number;
  
    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }
  
    // Implementation of abstract method
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;
  
    constructor(color: string, width: number, height: number) {
        super(color);
        this.width = width;
        this.height = height;
    }
  
    // Implementation of abstract method
    calculateArea(): number {
        return this.width * this.height;
    }
}

// const shape = new Shape("red"); // Error: Cannot create an instance of an abstract class
const circle = new Circle("blue", 5);
const rectangle = new Rectangle("green", 4, 6);

console.log(`Circle area: ${circle.calculateArea()}`); // Circle area: 78.53981633974483
console.log(`Rectangle area: ${rectangle.calculateArea()}`); // Rectangle area: 24
circle.displayColor(); // This shape is blue
```

```typescript
// Abstract class
abstract class BankAccount {
    accountHolder: string;
    balance: number;

    constructor(accountHolder: string, balance: number) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // Abstract method to be implemented in derived classes
    abstract accountType(): string;

    // Method to display balance
    displayBalance(): void {
        console.log(`${this.accountType()} - Balance for ${this.accountHolder}: $${this.balance}`);
    }
}

class SavingsAccount extends BankAccount {
    accountType(): string {
        return "Savings Account";
    }
}

class CheckingAccount extends BankAccount {
    accountType(): string {
        return "Checking Account";
    }
}

const savings = new SavingsAccount("Alice", 3000);
const checking = new CheckingAccount("Bob", 1500);

savings.displayBalance();  // Output: Savings Account - Balance for Alice: $3000
checking.displayBalance();  // Output: Checking Account - Balance for Bob: $1500

```

## Interfaces

Interfaces define contracts that classes must adhere to. They specify what properties and methods an object should have.

```typescript
// Interface definition
interface Vehicle {
    brand: string;
    year: number;
    start(): void;
    stop(): void;
}

// Class implementing an interface
class Car implements Vehicle {
    brand: string;
    year: number;
    model: string; // Additional property
  
    constructor(brand: string, year: number, model: string) {
        this.brand = brand;
        this.year = year;
        this.model = model;
    }
  
    start(): void {
        console.log(`Starting ${this.brand} ${this.model}`);
    }
  
    stop(): void {
        console.log(`Stopping ${this.brand} ${this.model}`);
    }
  
    // Additional method
    honk(): void {
        console.log("Beep beep!");
    }
}

// Another class implementing the same interface
class Motorcycle implements Vehicle {
    brand: string;
    year: number;
  
    constructor(brand: string, year: number) {
        this.brand = brand;
        this.year = year;
    }
  
    start(): void {
        console.log(`Starting ${this.brand} motorcycle`);
    }
  
    stop(): void {
        console.log(`Stopping ${this.brand} motorcycle`);
    }
  
    // Additional method
    wheelie(): void {
        console.log("Doing a wheelie!");
    }
}

// Using the interface type
function testDrive(vehicle: Vehicle) {
    vehicle.start();
    console.log(`Driving a ${vehicle.brand} from ${vehicle.year}`);
    vehicle.stop();
}

const myCar = new Car("Toyota", 2020, "Corolla");
const myMotorcycle = new Motorcycle("Harley-Davidson", 2019);

testDrive(myCar);
testDrive(myMotorcycle);
```

### Multiple Interfaces

Classes can implement multiple interfaces:

```typescript
interface Drivable {
    drive(): void;
}

interface Flyable {
    fly(): void;
}

class FlyingCar implements Drivable, Flyable {
    drive(): void {
        console.log("Driving on the road");
    }
  
    fly(): void {
        console.log("Flying in the air");
    }
}

const myFlyingCar = new FlyingCar();
myFlyingCar.drive();
myFlyingCar.fly();
```

## Abstract Classes

Abstract classes are similar to interfaces but can include implementation details.

```typescript
abstract class Database {
    // Properties
    protected url: string;
    protected port: number;
  
    constructor(url: string, port: number) {
        this.url = url;
        this.port = port;
    }
  
    // Concrete method with implementation
    connect(): void {
        console.log(`Connecting to database at ${this.url}:${this.port}`);
    }
  
    // Abstract methods (must be implemented by subclasses)
    abstract insert(data: any): void;
    abstract update(id: number, data: any): void;
    abstract delete(id: number): void;
    abstract select(id: number): any;
}

class MySQLDatabase extends Database {
    constructor(url: string, port: number = 3306) {
        super(url, port);
    }
  
    insert(data: any): void {
        console.log(`MySQL: Inserting ${JSON.stringify(data)}`);
    }
  
    update(id: number, data: any): void {
        console.log(`MySQL: Updating record ${id} with ${JSON.stringify(data)}`);
    }
  
    delete(id: number): void {
        console.log(`MySQL: Deleting record ${id}`);
    }
  
    select(id: number): any {
        console.log(`MySQL: Selecting record ${id}`);
        return { id, name: "Sample data" };
    }
}

class MongoDBDatabase extends Database {
    constructor(url: string, port: number = 27017) {
        super(url, port);
    }
  
    insert(data: any): void {
        console.log(`MongoDB: Inserting document ${JSON.stringify(data)}`);
    }
  
    update(id: number, data: any): void {
        console.log(`MongoDB: Updating document ${id} with ${JSON.stringify(data)}`);
    }
  
    delete(id: number): void {
        console.log(`MongoDB: Deleting document ${id}`);
    }
  
    select(id: number): any {
        console.log(`MongoDB: Finding document ${id}`);
        return { _id: id, data: "Sample document" };
    }
}

// Cannot instantiate abstract class
// const db = new Database("localhost", 3000); // Error

const mysql = new MySQLDatabase("localhost");
mysql.connect();
mysql.insert({ name: "John", email: "john@example.com" });

const mongodb = new MongoDBDatabase("localhost");
mongodb.connect();
mongodb.insert({ name: "Alice", email: "alice@example.com" });
```

## Static Members

Static members belong to the class itself, not to instances of the class.

```typescript
class MathUtils {
    // Static property
    static PI: number = 3.14159;
  
    // Static method
    static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }
  
    static calculateCircleCircumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.calculateCircleArea(5)); // 78.53975
console.log(MathUtils.calculateCircleCircumference(5)); // 31.4159

// Example with instance and static members
class User {
    // Instance properties
    name: string;
  
    // Static property
    static userCount: number = 0;
  
    constructor(name: string) {
        this.name = name;
        User.userCount++; // Increment the static counter when a new user is created
    }
  
    // Instance method
    greet(): void {
        console.log(`Hi, I'm ${this.name}`);
    }
  
    // Static method
    static getTotalUsers(): number {
        return User.userCount;
    }
}

const user1 = new User("Frank");
console.log(User.userCount); // 1
const user2 = new User("Grace");
console.log(User.userCount); // 2
console.log(User.getTotalUsers()); // 2

user1.greet(); // Hi, I'm Frank
user2.greet(); // Hi, I'm Grace
```

## Getters and Setters

Getters and setters provide a way to control access to class properties.

```typescript
class Product {
    private _price: number = 0; // Private property
    private _name: string;
  
    constructor(name: string, price: number) {
        this._name = name;
        this.price = price; // Note: This calls the setter
    }
  
    // Getter for price
    get price(): number {
        return this._price;
    }
  
    // Setter for price with validation
    set price(value: number) {
        if (value < 0) {
            throw new Error("Price cannot be negative");
        }
        this._price = value;
    }
  
    // Getter for name
    get name(): string {
        return this._name;
    }
  
    // Setter for name with validation
    set name(value: string) {
        if (value.trim() === "") {
            throw new Error("Name cannot be empty");
        }
        this._name = value;
    }
  
    // A method that uses the internal property directly
    applyDiscount(percentage: number): void {
        this._price = this._price * (1 - percentage / 100);
    }
}

const product = new Product("Laptop", 1000);
console.log(product.price); // 1000
console.log(product.name);  // "Laptop"

// Using the setters
product.price = 1200;
product.name = "Gaming Laptop";
console.log(product.price); // 1200
console.log(product.name);  // "Gaming Laptop"

// Using the method
product.applyDiscount(10);
console.log(product.price); // 1080

// This will throw an error
try {
    product.price = -500;
} catch (error) {
    console.error(error.message); // "Price cannot be negative"
}
```

## Advanced Concepts

### Method Overloading

TypeScript supports method overloading but in a different way than other languages like Java or C#.

```typescript
class Calculator {
    // Method overload signatures
    add(a: number, b: number): number;
    add(a: string, b: string): string;
  
    // Implementation
    add(a: any, b: any): any {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error("Parameters must be both numbers or both strings");
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3));           // 8
console.log(calc.add("Hello, ", "TypeScript")); // "Hello, TypeScript"
```

### Readonly Properties

```typescript
class Person {
    readonly id: number;
    name: string;
  
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
  
    updateInfo(name: string) {
        // this.id = 100; // Error: Cannot assign to 'id' because it is a read-only property
        this.name = name; // OK
    }
}

const person = new Person(1, "John");
// person.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
person.name = "John Doe"; // OK
```

### Namespaces and Modules

TypeScript provides namespaces and modules to organize and share code.

```typescript
// Namespace example
namespace Geometry {
    export interface Point {
        x: number;
        y: number;
    }
  
    export class Circle {
        constructor(public center: Point, public radius: number) {}
      
        area(): number {
            return Math.PI * this.radius * this.radius;
        }
    }
  
    // Non-exported (internal to namespace)
    const origin: Point = { x: 0, y: 0 };
}

// Using the namespace
const point: Geometry.Point = { x: 10, y: 20 };
const circle = new Geometry.Circle(point, 5);
console.log(circle.area()); // 78.53981633974483
```

### Design Patterns

Design patterns are common solutions to recurring problems in software design. Here's an example of the Singleton pattern:

```typescript
class Singleton {
    private static instance: Singleton;
  
    private constructor() {
        // Private constructor to prevent instantiation
    }
  
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
  
    public someMethod(): void {
        console.log("Method of the singleton object");
    }
}

// Usage
// const obj = new Singleton(); // Error: Constructor is private
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true - both variables reference the same instance

instance1.someMethod(); // "Method of the singleton object"
```

### Mixins

Mixins allow composing classes from reusable components.

```typescript
// Mixin classes
class Jumpable {
    jump() {
        console.log("Jumping!");
    }
}

class Swimmable {
    swim() {
        console.log("Swimming!");
    }
}

// Base class
class Character {
    name: string;
  
    constructor(name: string) {
        this.name = name;
    }
}

// Type for mixed classes
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin functions
function JumpableMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        jump() {
            console.log(`${this['name']} is jumping!`);
        }
    };
}

function SwimmableMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        swim() {
            console.log(`${this['name']} is swimming!`);
        }
    };
}

// Create a class that extends Character and includes both mixins
const PlayerCharacter = SwimmableMixin(JumpableMixin(Character));

// Use the composed class
const player = new PlayerCharacter("Mario");
player.jump(); // "Mario is jumping!"
player.swim(); // "Mario is swimming!"
```

This comprehensive guide covers the major aspects of Object-Oriented Programming in TypeScript, from basic concepts to advanced techniques. Use these examples as a foundation to build more complex applications with good OOP principles.
