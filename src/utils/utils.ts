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

export const getBreadCrumbs = (path) => {
    const ids: string[] = path.split('/').slice(1)
    const roads: { name: string, url: string }[] = ids.map((name, idIndex) => {
        const url: string = path.split('/').slice(0, idIndex + 2).join('/')
        return {name, url}
    })
    return roads;
}

export const idGenerator = (parentId: number) => {
    return parentId++;
}