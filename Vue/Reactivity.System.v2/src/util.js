export function def (obj,key,value,enumerable) {
    Object.defineProperty(obj,key,{
        value,
        enumerable:enumerable||false,
        writable:true,
        configurable:true
    })
}