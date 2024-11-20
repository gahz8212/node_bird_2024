// const obj={one:1,two:'2',three:3}
// //Map으로
// const map=new Map(Object.entries(obj))
// //객체에는 내장된 entries,keys,values 메서드가 없어서 Object에 있는 메서드를 빌려온다.
// console.log(map)
// //다시 객체로
// const obj2=Object.fromEntries(map.entries())
// console.log(obj2)
// const map1 = new Map([
//   ["one", 1],
//   ["two", 2],
// ]);
// const map2 = new Map([
//   ["one", "하나"],
//   ["two", "둘"],
// ]);
// const set = new Set([map1, map2]);
// console.log(set)
// for (let i of set) {
//   console.log(Array.from(i));
// }
const set=new Set([1,2,3,4])
const map=new Map();
map.set('one',set)
const obj=Object.fromEntries(map.entries())
console.log(Array.from(obj.one))