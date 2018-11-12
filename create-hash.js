'use strict';

const HashMap = require('./hashmap-oa');

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

function main() {
  let lor = new HashMap();
  lorArr.forEach(obj => {
    Object.keys(obj).forEach(key => lor.set(key, obj[key]));
  });
  console.log(lor);

  console.log(lor.get('Maiar'));
}

main();
