class Node {
  constructor(key, value, next = null){
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class List {

  constructor(){
    this.head = null;
  }

  set(key, value){
    let temp = this.head;

    while(temp){
      if(temp.key === key){
        temp.value = value;
        return;
      }
      temp = temp.next;
    }
    this.head = new Node(key, value, this.head);
  }

  get(key){

    let temp = this.head;

    while(temp){
      if(temp.key === key){
        return temp.value;
      }
      temp = temp.next;
    }

    console.log(`Key ${key} is not in hash table`);
    return null;
  }

  has(key){
    let temp = this.head;

    while(temp){
      if(temp.key === key){
        return true;
      }
      temp = temp.next;
    }

    return false;
  }

  remove(key){
    this.head = this.removeHelper(key, this.head);
  }

  removeHelper(key, node){
    if(!node) return null;
    
    if(node.key === key){
      return node.next;
    }

    node.next = this.removeHelper(key, this.next);
    return node;
  }

  pairs(){
    const pairs = [];
    
    let temp = this.head;
    while(temp){
      const { key, value } = temp;
      pairs.push({ key, value });
      temp = temp.next;
    }
    return pairs;
  }

  print(){
    let temp = this.head;
    while(temp){
      console.log(`${temp.key}: ${temp.value}`);
      temp = temp.next;
    }
  }

}

if(require.main === module){
  const test = new List();
  test.set('Test', 'Value');
  test.set('Second', 'Second');
  // console.log(test);
  // console.log(test.get('Test'));
  // test.remove('Test');
  // console.log(test);
  test.print();
}

module.exports = List;