Decorator for portation of haskell typeclass EQ
===============================================

The Eq Interface defines equality and inequality in [typescript](https://www.typescriptlang.org/).
The decorator implements the EQ-Interface.
On the other hand it is a library for funtions.
Mainly Lists of this interface are used.

There is an es5-translation in the dist-directory.
[tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) was used for transpiling.

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
 
### Using EqConfig
#### clone():IEqConfig 
```javascript
  let copyOfConfig = config.clone(); 
```

#### fields:Array<IField>
```javascript
  let newFields:Array<IField> = [];
  copyOfFields.fields.foreach((val, key) => if(key%2) newFields.push(val));
  copyOfFields.fields = newFields;
```
 
### Using EqOr
#### fuzzyEq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[]
```javascript
  fuzzyEq(listOfCars, new Car('leather', null)) //all listOfCars
  fuzzyEq(listOfCars, new Car('leather', 'di')) //reveals Audi and Cadillac or leather cars
```

#### eq(cs:IEq[], refs:IEq[], config:IEqConfig):IEq[]
```javascript
  eq(listOfCars, new Car('leather', null)) //all leather cars
  eq(listOfCars, new Car('leather', 'di')) //reveals leather cars
  eq(listOfCars, new Car('leather', 'audi')) //reveals leather cars or audis
```


## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
* 0.1.2 transpiling from typescript to es5