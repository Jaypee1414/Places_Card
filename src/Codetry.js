console.log("check the duplicate")
const data = [1,1,2,3,4,4,5,6,7,7,7,7,8,1,2]

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