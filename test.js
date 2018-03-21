const overlay = require('./index');
const assert = require('assert');

const flatOverlayData = {
  a: "a",
  b: "b",
  c: [],
  d: 12
};

const deepOverlayData = {
  a: "a",
  b: {
    bb: "bb"
  },
  c: [
    "c1", "c2", "c3"
  ],
  d: {
    dd: {
      ddd: {
        dddd: "dddd"
      }
    },
    dd2: {
      dd2d: [
        "dd2d1", "dd2d2", "dd2d3", {
          dd2d4d: "got me!"
        }
      ]
    }
  }
};

const shallowTest = function(){
  const inputData = {
    a: "keep",
    d: 15,
    f: "extra"
  };

  overlay(flatOverlayData, inputData);

  try{
    assert(inputData.a === "keep");
    assert(inputData.b === "b");
    assert(Array.isArray(inputData.c));
    assert(inputData.d === 15);
    assert(inputData.f === "extra");
    return true;
  } catch(error) {
    return error.message;
  }
};

const deepTest = function() {
  const inputData = {
    b: "ab",
    c: "not an array",
    d: {
      dd: {},
      dd2: {
        dd2d2: "dd2d2"
      }
    },
  };

  overlay(deepOverlayData, inputData);

  try {
    assert(inputData.d.dd.ddd.dddd === "dddd");
    assert(inputData.d.dd2.dd2d2 === "dd2d2");
    assert(inputData.d.dd2.dd2d[3].dd2d4d === "dd2d4d");
    return true;
  } catch(error) {
    return error.message;
  }

}

console.log("Shallow Overlay:");
let result = shallowTest();
if (result === true) {
  console.log("    success");
} else {
  console.log("    fail!", result);
}

console.log("Deep Overlay:");
result = deepTest();
if (result === true) {
  console.log("    success");
} else {
  console.log("    fail!", result);
}