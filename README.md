Decorator for portation of haskell typeclass EQ
===============================================

The Eq Interface defines equality and inequality.
The decorator implements the EQ-Interface.
On the other hand it is a library for funtions.
Mainly Lists of this interface are used.

## Installation

  npm install decorator-eq --save

## Usage
### Decorator
```javascript
  const carConfig = new EqConfig();
  
  @Eq.implement({
      config: carConfig
  })
  class Car implements IEq {
    @Eq.field({})
    private interior:TInterior;
 
    @Eq.field({fuzzy:true})
    private name:string;
    
    constructor(interior:TInterior, name:string){
        this.interior=interior;
        this.name=name;
    }
    
    //this is neccessary to ensure the interface
    eq:(a:IEq)=>boolean;
    neq:(a:IEq)=>boolean;
 }
```
Notice the Configuration-Object.
Objects of car can now be seen as equal, if the two properties interior
and name are the same. Be aware that the properties can be any type 
that support "===" or has IEq implemented.

### Using the EQ-Library
#### eq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[]
```javascript
  eq(listOfCars, new Car('plastic','cheapo'), config:IEqConfig):IEq[]
  eq(listOfCars, new Car(null,'bmw'), config:IEqConfig):IEq[] // reveals all bmws
```
 
#### fuzzyEq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[]
```javascript
  fuzzyEq(listOfCars, new Car(null,'di'), config:IEqConfig):IEq[] //reveals Audi and Cadillac 
```
 
#### neq(cs:IEq[], ref:IEq, config:IEqConfig):IEq[]
```javascript
  neq(listOfCars, new Car('leather',null), config:IEqConfig):IEq[] //reveals all none leather cars 
```
 
 
## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
* 0.1.2 transpiling from typescript to es5