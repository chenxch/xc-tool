
// 对象深拷贝
export function cloneDeep (obj, objCache = new WeakMap()) {
  if (obj instanceof Array) {
    const newArray = [];
    for (const item of obj) {
      newArray.push(deep(item, objCache));
    }
    return newArray;
  } else if (obj instanceof Object) {
    let newObj = objCache.get(obj);
    if (newObj) {
      return newObj
    } else {
      newObj = {};
      Reflect.ownKeys(obj).forEach(key => {
        newObj[key] = deep(obj[key], objCache)
      })
      objCache.set(obj, newObj);
      return newObj;
    }  
  } else {
    return obj;
  }
}




export function uniq(array) {
  return [...new Set(array)];
}



export function remove(array,removeBy) {
    const removeIndexs = [];
    const removeAry = [];
    array.forEach((val,index)=>{
        if(removeBy(val)){
          	removeIndexs.push(index);
          	removeAry.push(val);
        };
    })
    removeIndexs.reverse().forEach(i=>{
        array.splice(i);
    })
    return removeAry;
}



export function mxa(array) {
  return Math.max(array);
}


export function maxBy(array, key) {
	const sortAry = array.sort((a, b) => {
        return b[key] - a[key];
     }
	)
    return sortAry[0];
}


export function chunk(array, size) {
      // 如果是空数组 直接返回就行了
      if (array.length === 0) {
        return array
      }
      // size 判断左右区间
      const newSize = size > 1 ? (size > array.length ? array.length: size) : 1
      // 结果
      const result = []
      // 小区块
      let smallChunk = []
      // this 指调用chunk方法的数组
      array.forEach((item) => {
        smallChunk.push(item)
        if (smallChunk.length === newSize) { // 每一个小碎片长度够了
          result.push(smallChunk)
          smallChunk = [] // 重置
        }
      })
      if (smallChunk.length > 0) {
        result.push(smallChunk) // 最后一次 长度不够size剩余的也加进去
      }
      return result
    }




export function isObject(obj) {
	return typeof obj === 'object';
}


export function isArray(obj) {
  return Array.isArray(obj)
}



export function isEmpty(val) {
    return !(!!val ? typeof val === 'object' ? Array.isArray(val) ? !!val.length : !!Object.keys(val).length : true : false);
}



export function orderBy(arr, props, orders) {
  return [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
  );
}



// 防抖
export function debounce (fn, time = 1000) {
  let timeId = null;
  return export function (...args) {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
     fn.apply(this, args);
     timeId = null;
    }, time)
  }
}


// 节流
export function throttle(func, delay = 1000) {
  let prev = Date.now();
  return export function () {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export function merge (target, ...arg) {
  return arg.reduce((acc, cur) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key]
      if (isObject(srcVal)) {
        subAcc[key] = merge(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else if (Array.isArray(srcVal)) {
        subAcc[key] = srcVal.map((item, idx) => {
          if (isObject(item)) {
            const curAccVal = subAcc[key] ? subAcc[key] : []
            return merge(curAccVal[idx] ? curAccVal[idx] : {}, item)
          } else {
            return item
          }
        })
      } else {
        subAcc[key] = srcVal
      }
      return subAcc
    }, acc)
  }, target)
}

export function isNil(val) {
	return val === null || val === void 0;
}


