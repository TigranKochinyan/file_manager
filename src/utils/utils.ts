export const getBreadCrumbs = (data, id) => {// TODO add brandCrumbs From Id 
    return null
}

export const getObject = (data: any, id: string | number): any | null => {//TODO change "any"_s to types or interfaces
    var result = null;
    if(data instanceof Array) {
        for(var i = 0; i < data.length; i++) {
            result = getObject(data[i], id);
            if (result) {
                break;
            }   
        }
    }
    else {
        for(var prop in data) {
            console.log(prop + ': ' + data[prop]);
            if(prop === 'id') {
                if(data[prop] === id) {
                    return data;
                }
            }
            if(data[prop] instanceof Object || data[prop] instanceof Array) {
                result = getObject(data[prop], id);
                if (result) {
                    break;
                }
            } 
        }
    }
    return result;
}