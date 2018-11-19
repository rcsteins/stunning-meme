
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class UnitCalories {
  constructor(name,caloriesPer) {
    this.name = name;
    this.caloriesPer = caloriesPer;
  }
  
  caloriesForAmount(amount) {
    return this.caloriesPer * amount;
  }
}

class MenuItem {
  constructor(kind,amount) {
    this.amount = amount;
    this.kind = kind;
    this.uid = guid();
  }
  
  toListItemProps(){
    return {
      item:this.itemName(),
      amount:this.amount,
      calories:this.renderCalories(),
      key:this.uid,
      uid:this.uid
    }
  }
  
  totalCalories() {
    return this.kind.caloriesForAmount(this.amount);
  }
  
  renderCalories() {
    return this.totalCalories().toFixed(2)
  }
  
  itemName() {
  	return this.kind.name;
  }
}

export class FoodDirectory {
  constructor() {
    this.list = {}
  }
  
  addEntry(name,caloriesPer) {
    this.list[name] = new UnitCalories(name,caloriesPer)
  }
  
  valueFor(name){
    return this.list[name]
  }
  
  entryList() {
    var values = Object.keys(this.list).map(e => this.list[e])
    return values;
  }
  
  createMenuItem(name,amount) {
    let kind = this.list[name]
    return new MenuItem(kind,amount)
  }
  
  static sampleMenu() {
    let fd = new FoodDirectory();
    fd.addEntry('chicken',47);
    fd.addEntry('peanuts',170);
    fd.addEntry('frozen raspberries',16);
    fd.addEntry('kale',19);
    fd.addEntry('greek yougurt(5%)',23.44);
    return fd
  }
}

export class Meal {
  constructor() {
    this.menuItems = [];
  }
  
  totalCalories() {
    var fn =  (runningTotal, sMenuItem)  => { return sMenuItem.totalCalories()  + runningTotal}
    return this.menuItems.reduce( fn , 0); 
  }
  
  static totalCalories(items) {
    return this.createFrom(items).totalCalories().toFixed(2);
  }
  
  static createFrom(items) {
    let meal = new Meal();
    for(let mi of items) {
      meal.menuItems.push(mi)
    }
    return meal;
  }
}
