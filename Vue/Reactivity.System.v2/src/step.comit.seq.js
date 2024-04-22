//step2：实现一个简单的响应式---深度检测对象的全部属性
// 方法：defineProperty
//step3：新增数组的响应式处理
const arrayMethods = Object.create(Array.prototype)
const methodNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodNeedChange.forEach(method=>{
    const origin = arrayMethods[method]
    //Q5:这里为什么不能用箭头函数
    def(arrayMethods,method,function(){
        console.log('dddd');
        origin.apply(this,arguments)
    },false)
})
class Observer {
    constructor(value) {
        //根据是否为数组还是对象进行不同响应式设计
        def(value,'_ob_',this)
        if(Array.isArray(value)) {
            observeArray(value)
            value.__proto__ = arrayMethods
            // Object.setPrototypeOf(value,arrayMethods)
        }else {
            this.walk(value)
        }
    }
    walk(value){
        const keys = Object.keys(value)
        keys.forEach(key=>defineReactive(value,key))
    }
}
function defineReactive(obj,key,val) {
    if(arguments.length === 2 ) {
        val = obj[key]
        if(typeof val === 'object') {
            new Observer(val)
        }
    }
    Object.defineProperty(obj,key,{
        enumerable:false,
        configurable: true,
        get:function reactiveGet() {
            return val
        },
        set:function reactiveSet(newVal) {
            val = newVal
            obeserve(val)
        }
    })
}
export function  observeArray (value) {
    for(let i=0;i<value.length;i++) {
        obeserve(value[i])
    }
}
// Q3：这个函数是干什么的？
function obeserve (value) {
    //Q1：为什么对象要这样子判断
    if(typeof value !== 'object') return 
    let ob
    //Q2： 为什么_ob_要判断两个条件 看起来第一个条件就成立了
    if(value.hasOwnProperty('_ob_') && value._ob_ instanceof Observer) {
        ob = value._ob_
    }else {
        ob = new Observer(value)
    }
    return ob

}
function def(obj,key,enumerable=false)  {
    Object.defineProperty(obj,key,{
        enumerable,
        //为什么要把value设置成this
        value:this
        
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
// new Observer(data)
// new Observer(data2)


data2 = {3:"2"}

let a = [1,2,3,4,5]
obeserve(a)
console.log(a);
a.push('ccc')
a.push('avk')
