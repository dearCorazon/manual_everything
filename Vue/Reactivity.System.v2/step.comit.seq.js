//按照commit覆盖
//step1：实现一个简单的响应式---深度检测对象的全部属性
// 方法：defineProperty
// 

class Obeserver {
    constructor(value) {
        this.walk(value)
    }
    walk(value){
        const keys = Object.keys(value)
        keys.forEach(key=>defineReactive(value,key))
    }
}
function defineReactive(obj,key,val) {
    if(arguments.length === 2 ) {
        val = obj[key]
        if(typeof val === Object) {
            new Obeserver(val)
        }
    }
    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable: true,
        get:function reactiveGet() {
            return val
        },
        set:function reactiveSet(newVal) {
            val = newVal
        }
    })
}


let data = Object.assign({},{
    a:'1',
    b:1122,
    c: {
        c1:'c1',
        c2:'c2'
    },
    d:{
        d1:'d1',
    },
    e: {
        e1:{
            e11:'e11',
            e12:'e12',
        },
        e2:{
            e21:'e21',
            e22:{
                e221:'e221'
            }
        }
    }
    
})
let data2 ={
    a:'1',
    b:1122,
    c: {
        c1:'c1',
        c2:'c2'
    },
    d:{
        d1:'d1',
    },
    e: {
        e1:{
            e11:'e11',
            e12:'e12',
        },
        e2:{
            e21:'e21',
            e22:{
                e221:'e221'
            }
        }
    }}
new Obeserver(data)
new Obeserver(data2)


data2 = {3:"2"}


console.log(data);
console.log(data2);

