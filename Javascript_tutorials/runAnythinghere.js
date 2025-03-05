array1=[1,2,3,4,5]
sumofarray=array1.reduce((a,b)=>a+b)
console.log(sumofarray)

filtereven=array1.filter((a)=>a%2==0)
console.log(filtereven)

multiplyeachby3=array1.map((a)=>a*3)
console.log(multiplyeachby3)

loopeach=array1.forEach((a)=>console.log(a))


repeatedarray=[1,2,3,4,5,1,2,3,4,5]
uniquearray=[...new Set(repeatedarray)]
console.log(uniquearray)


