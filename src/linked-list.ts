class LinkedListNode<T> {
  readonly value: T;

  next: LinkedListNode<T> | null = null;
  prev: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  first: LinkedListNode<T> | null = null;
  last: LinkedListNode<T> | null = null;
  listLength = 0;

  add(value: T) {
    let newNode;

    this.listLength += 1;

    if (this.first === null || this.last === null) {
      newNode = new LinkedListNode(value);
      this.first = newNode;
      this.last = newNode;
      return newNode;
    }

    newNode = new LinkedListNode(value);
    newNode.next = null;
    newNode.prev = this.last;

    this.last.next = newNode;
    this.last = newNode;

    return newNode;
  }

  [Symbol.iterator]() {
    let current = this.first;
    let iteration = 0;
    const listLength = this.listLength;

    return {
      next() {
        const value = current?.value;
        const done = iteration++ >= listLength;

        if (current === null) {
          return {
            done: true,
            value: undefined
          };
        }

        current = current.next;

        return {
          done,
          value
        };
      }
    };
  }
}

const list = new LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list?.first?.value);
console.log(list?.last?.value);
console.log(list?.first?.next?.value);
console.log(list?.first?.next?.prev?.value);
console.log(list.listLength);

for (let item of list) {
  console.log("item", item);
}
