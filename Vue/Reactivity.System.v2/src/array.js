import { def } from "./util.js"
import { observeArray } from "./index.js"
//array import 了index index也import了 array？不会出错吗
export const arrayMethods = Object.create(Array.prototype)
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
        console.log('dddd')
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = [...arguments]
                break;
            case 'splice':
                inserted = [...arguments].slice(2)
                break;
            default:
                break;
        }
        inserted && observeArray(inserted)
        origin.apply(this,arguments)
    },false)
})
function modifyArray(arr) {
    //1.
    // arr.__proto__ = arrayMethods
    //

    for(let i = 0 ;i<methodNeedChange.length; i++) {
        const key = methodNeedChange[i]
        def(arr,key,arrayMethods[key])
    }
    
}
//array   的测试代码

//为什么这里的代码跑了

// const a = [1,2,3,4,5]
// console.log(a);
// modifyArray(a)
// a.push('22')
// console.log(a);