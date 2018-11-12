function checkPalindrome(str){
  const map =  new Map();

  for(let c of str){

    if(!map.has(c)){
      map.set(c, 1);
    } else {
      map.set(c, map.get(c) + 1);
    }
  }

  let odd = 0;
  map.forEach((value, key) => {
    odd += value % 2 !== 0 ? 1 : 0;
  });

  return odd <= 1;
}

if(require.main === module){
  console.log(checkPalindrome('acecarr'));
  console.log(checkPalindrome('north'));
}