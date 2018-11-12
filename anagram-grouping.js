'use strict';

//loop through values in array and create a key from the sorted string
//if the key already exists then push the value into the key's array

//input:['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
//output: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]

function anagramGrouping(arr) {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    let sortedWord = arr[i]
      .split('')
      .sort()
      .join();
    if (map.has(sortedWord)) {
      //add the word to the value array
      let arr = map.get(sortedWord);
      arr.push(word);
    } else {
      //set key to be sortedWord and the value to be an array w/ word
      map.set(sortedWord, [word]);
    }
  }
  return map.values();
}

console.log(
  anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])
);
