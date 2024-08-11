console.log("check the duplicate")
const data = [10,10,10,22,33,40,40,51,62,71,71,71,71,81,10,22]


const res = data.reduce((x,y)=>{
    if(x[y]){
        x[y] += 1
    }else{
        x[y] = 1
    }
    return x
}, {})

console.log(res)


console.log("remove duplicate")
const result = data.filter((item,index)=>{
    return data.indexOf(item) === index
})

console.log(result)