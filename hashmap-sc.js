const List = require('./list');

class HashMapSC {

  constructor(initialCapacity = 8){
    this._capacity = initialCapacity;
    this._length = 0;
    this._slots = [];

    for(let i = 0; i < this._capacity; i++){
      this._slots.push(new List());
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  _resize(size){
    const oldSlots = this._slots;
    this._capacity = size;
    this._length = 0;
    this._slots = [];

    console.log('resize() was called');
    for(let i = 0; i < this._capacity; i++){
      this._slots.push(new List());
    }
    
    oldSlots.forEach(list => {
      const pairs = list.pairs();

      // looping through pairs in a list and add each key value pair into new hash table
      pairs.forEach(pair => {
        const { key, value } = pair;
        this.set(key, value);
      });

    });
  }

  _findSlot(key){
    const hash = HashMapSC._hashString(key);
    return hash % this._capacity;
  }

  set(key, value){

    const LOAD_RATIO = (this._length + 1) / this._capacity;
    if(LOAD_RATIO > HashMapSC.MAX_LOAD_RATIO) this._resize(this._capacity * HashMapSC.SIZE_RATIO);
    const index = this._findSlot(key);
    const list = this._slots[index];
    if(!list.has(key)) {
      this._length++;
    }  
    list.set(key, value);
  }

  get(key){
    const index = this._findSlot(key);
    return this._slots[index].get(key);
  }

  remove(key){
    const index = this._findSlot(key);
    const list = this._slots[index];
    if(list.has(key)){
      this._length--;
      list.remove(key);
      return;
    }
    console.log(`${key} is an invalid key`);
  }

  print(){
    this._slots.forEach(list => list.print());
  }
}

HashMapSC.MAX_LOAD_RATIO = 1;
HashMapSC.SIZE_RATIO = 3;

if(require.main === module){
  let lorArr = [
    { Hobbit: 'Bilbo' },
    { Hobbit: 'Frodo' },
    { Wizard: 'Gandolf' },
    { Human: 'Aragon' },
    { Elf: 'Legolas' },
    { Maiar: 'The Necromancer' },
    { Maiar: 'Sauron' },
    { RingBearer: 'Gollum' },
    { LadyOfLight: 'Galadriel' },
    { HalfElven: 'Arwen' },
    { Ent: 'Treebeard' }
  ];

  let lor = new HashMapSC();
  lorArr.forEach(obj => {
    Object.keys(obj).forEach(key => lor.set(key, obj[key]));
  });
  // console.log(lor);
  lor.print();
  console.log(lor.get('Maiar'));
  lor.remove('Ent');
  console.log();
  lor.print();
  console.log(lor._capacity);
}
