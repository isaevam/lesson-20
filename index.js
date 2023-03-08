"use strict";
//Unique values
const unique = (anagrams) => {
  const set = new Set();
  const newArray = JSON.parse(anagrams);
  for (let i = 0; i < newArray.length; i++) {
    set.add(newArray[i]);
    for (let j = i + 1; j < newArray.length; j++) {
      const firstString = newArray[i]
        .replace(/\s/g, "")
        .toLowerCase()
        .split("")
        .sort()
        .join("");
      const secondString = newArray[j]
        .replace(/\s/g, "")
        .toLowerCase()
        .split("")
        .sort()
        .join("");
      if (firstString === secondString) {
        newArray.splice(j, 1);
        j = j - 1;
      }
    }
  }
  document.getElementById("outputSet").value = JSON.stringify(Array.from(set));
};

//Unique values (version 2)
const unique2 = (anagrams) => {
  const newAnagrams = JSON.parse(anagrams);
  const set = new Set();
  const array = [];
  newAnagrams.forEach((item) => {
    set.add(item.toLowerCase().split("").sort().join("").trim());
  });
  set.forEach((value) => {
    const uniqueItem = newAnagrams.find((item) => {
      const string = item.toLowerCase().split("").sort().join("").trim();
      return value === string;
    });
    array.push(uniqueItem);
  });
  document.getElementById("outputSet2").value = JSON.stringify(array);
};

//Getter and setter
function getterSetter(string) {
  const user = {
    firstName: "",
    lastName: "",
    age: "",
    get userInfo() {
      const inform = `${this.firstName} ${this.lastName} is ${this.age}`;
      document.getElementById("outputGetter").value = inform;
    },
    set userInfo(arg) {
      if (arg.indexOf("{") >= 0) {
        const jsonString = arg.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        const obj = JSON.parse(jsonString);
        const { firstName, lastName, age } = obj;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
      } else {
        const [name, surname, age] = arg.split(" ");
        this.firstName = name;
        this.lastName = surname;
        this.age = age;
      }
    },
  };
  user.userInfo = string;
  user.userInfo;
}

//Create arr method
const createArrMethod = (fromArr, toArr) => {
  const obj = {
    from: +fromArr,
    to: +toArr,
  };
  function createArr() {
    const arr = [];
    for (let i = this.from; i < this.to; i++) {
      arr.push(i);
    }
    this.arr = arr;
  }
  // Solution 1
  //obj.createArr=createArr;
  //obj.createArr();

  // Solution 2
  //const binded=createArr.bind(obj);
  //binded();

  //Solution 3
  createArr.call(obj);
  createArr.apply(obj);
  document.getElementById("outputArray").value = obj.arr;
};

//Constructor Function
function Car(model, color, age, speed, gasTank, started) {
  this.model = model;
  this.color = color;
  this.age = age;
  this.speed = speed;
  this.maxSpeed = 200;
  this.gasTank = gasTank;
  this.maxGas = 20;
  this.started = started;
  this.startEngine = startEngine;
  this.drive = drive;
  this.stop = stop;
  this.speedUp = speedUp;
  this.slowDown = slowDown;
  this.addGas = addGas;
}
function startEngine() {
  this.started = this.gasTank !== 0 ? true : (this.started = false);
  return this;
}
function drive() {
  if (this.gasTank !== 0 && this.started === true) {
    this.speed = 30;
  }
  return this;
}
function stop() {
  this.started = false;
  this.speed = 0;

  return this;
}
function speedUp(addSpeed) {
  if (this.gasTank !== 0 && this.started === true) {
    const newGas = this.gasTank - 5;
    if (newGas < 0) {
      this.gasTank = 0;
      this.stop();
    } else {
      this.gasTank = newGas;
    }
    const newSpeed = this.speed + addSpeed;
    this.speed = newSpeed > this.maxSpeed ? this.maxSpeed : newSpeed;
  } else {
    this.stop();
  }
  return this;
}
function slowDown(subtractSpeed) {
  const newSpeed = this.speed - subtractSpeed;
  if (newSpeed < 0) {
    this.stop();
  } else {
    this.speed = newSpeed;
  }
  return this;
}
function addGas(gas) {
  const newGas = this.gasTank + gas;
  this.gasTank = newGas > this.maxGas ? this.maxGas : newGas;
  return this;
}
const car = new Car("BMW", "black", 5, 5, 15, true);
console.log(car);
