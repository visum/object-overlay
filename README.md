Better implementations of this are available elsewhere, like in lodash, so this is archived and I never really used it. I don't want to delete though, 'cuz I might find it fun to look back and chuckle at past me sometime in the future.

# object-overlay
Deeply apply values from a source object to a target which lacks properties from the source.

Useful for loading an object with default values, such as with options parameters and React props.

Modifies the `target`. Any existing keys in the target object will be left alone.

## Usage
```JavaScript
overlay(source, target, [options]);
```

### Note that...
* Arrays are assigned from the source to the target by reference, they are not deep cloned.

## Example
```JavaScript
const overlay = require('object-overlay');

let defaultValues = {
  firstName:"",
  middleName:"",
  lastName:"",
  address:{
    line1:"",
    line2:null,
    city:"",
    state:"UT"
  },
  nickNames:[]
};

let inputData = {
  firstName:"Thomas",
  lastName:"Testerson"
}

overlay(defaultValues, inputData);

assert(Array.isArray(inputData.nickNames));
assert(inputData.address.state === "UT");
assert(inputData.firstName === "Thomas");

```
