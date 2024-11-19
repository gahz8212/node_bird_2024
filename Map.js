const map = new Map();
map.set("one", 1);
map.set("two", 2);
map.set("three", 3);
// console.log(map);
const obj=Object.fromEntries(map.entries())
console.log(obj['one'])
const map2=new Map(Object.entries(obj))
map2.set('one','하나')
console.log(map2)
const obj2=Object.fromEntries(map2.entries())
console.log(obj2.one)