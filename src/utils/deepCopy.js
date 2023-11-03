function objectDeepCopy(obj) {
  if(typeof obj !== "object" || obj === null){
    return obj;
  }
  
  const deepCopyObj = {};
  
  for(let key in obj){
    deepCopyObj[key] = objectDeepCopy(obj[key]);
  }
  
  return deepCopyObj;
}

function arrayDeepCopy(obj) {
  if(typeof obj !== "object" || obj === null){
    return obj;
  }
  
  const deepCopyObj = [];
  
  let len = obj.length;
  for(let i=0; i<len; i++){
    deepCopyObj[i] = arrayDeepCopy(obj[i]);
  }
  
  return deepCopyObj;
}

function deepCopy(obj) {
  if(typeof obj !== "object" || obj === null){
    return obj;
  }
  
  //배열 복사
  if(Array.isArray(obj)) {
    let deepCopyObj = [];
    let len = obj.length;

    for(let i=0; i<len; i++) {
      deepCopyObj[i] = deepCopy(obj[i]);
    }

    return deepCopyObj;
  }
  //객체 복사
  else {
    let deepCopyObj = {};

    for(let key in obj){
      deepCopyObj[key] = deepCopy(obj[key]);
    }

    return deepCopyObj;
  }
}

export { objectDeepCopy, arrayDeepCopy, deepCopy };