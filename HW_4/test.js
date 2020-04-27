const arr = ['hello', 'world', 'my', 'name', 'is', 'laurenG', 'give', 'me', 'a', 'developer', 'job']

console.log(arr.sort((a,b)=> a.length < b.length ? -1: a.length>b.length ? 1 : 0 ))