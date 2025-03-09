// // // // main class
// // // class BankAccount {
// // //     constructor(
// // //         public Balance: number = 0,
// // //         public accountHolder: string
// // //     ) { }

// // //     public deposit(amount: number): void {
// // //         this.Balance += amount;
// // //     }

// // //     public withdraw(amount: number): void {
// // //         this.Balance -= amount;
// // //     }
// // // }

// // // const myAccount = new BankAccount(100, 'John Doe');
// // // // console.log(`initial balance: ${myAccount.Balance}`); // 150
// // // // myAccount.deposit(50);
// // // // console.log(`balance after deposit: ${myAccount.Balance}`); // 150

// // // // derived class
// // // class SavingsAccount extends BankAccount {
// // //     protected interestRate: number = 0.01;

// // //     constructor(accountHolder: string, balance: number, _interestRate: number) {
// // //         super(balance, accountHolder);
// // //         this.interestRate = _interestRate;
// // //     }

// // //     public calculateInterest(): number {
// // //         const interest = this.Balance * this.interestRate;
// // //         return this.Balance += interest;        
// // //     }
// // // }

// // // const mySavingsAccount = new SavingsAccount('John Doe', 100, 0.02);
// // // console.log(mySavingsAccount.calculateInterest())
// // // mySavingsAccount.deposit(50);
// // // console.log(mySavingsAccount.calculateInterest())

// //  class BankAccount {
// //     accountHolder: string;
// //     balance: number;

// //     constructor(accountHolder: string, balance: number) {
// //         this.accountHolder = accountHolder;
// //         this.balance = balance;
// //     }

// //     // Common method for all accounts
// //     displayBalance(): void {
// //         console.log(`Balance for ${this.accountHolder}: $${this.balance}`);
// //     }
// // }

// // class CheckingAccount extends BankAccount {
// //     overdraftLimit: number;

// //     constructor(accountHolder: string, balance: number, overdraftLimit: number) {
// //         super(accountHolder, balance);
// //         this.overdraftLimit = overdraftLimit;
// //     }

// //     // Overriding the method to include overdraft limit
// //     displayBalance(): void {
// //         console.log(`Balance for ${this.accountHolder}: $${this.balance} (Overdraft limit: $${this.overdraftLimit})`);
// //     }
// // }

// // const accounts: BankAccount[] = [
// //     new BankAccount("John Doe", 500),
// //     new CheckingAccount("Jane Smith", 2000, 500)
// // ];

// // accounts.forEach(account => account.displayBalance());

// abstract class shape {
//     color: string;
//     constructor(color: string) {
//         this.color = color;
//     }

//     abstract area(): number;

//     abstract displayColor(): void; 
// }

// class Circle extends shape {
//     public radius: number;
//     constructor(color: string, radius: number) {
//         super(color);
//         this.radius = radius;
//     }

//     area (): number {
//         return Math.PI * this.radius * this.radius;
//     }

//     displayColor(): void {
//         console.log(`Color of the circle is ${this.color}`);
//     }
// }

// const myCircle = new Circle('red', 10);
// console.log(myCircle.area());

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

const myCar = new Car("Toyota", 2020, "Corolla");
console.log(myCar.start()); // Toyota