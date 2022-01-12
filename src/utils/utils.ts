export const getObject = (data: any, id: string | number): any | null => {//TODO change "any"_s to types or interfaces
    let result = null;
    if(data instanceof Array) {
        for(let i = 0; i < data.length; i++) {
            result = getObject(data[i], id);
            if (result) {
                break;
            }   
        }
    }
    else {
        for(let prop in data) {
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

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export const pathCreator = (id: number, parents: number[]): string => {
    let path: number[] = [];
    if (parents.length) {
        path = [...parents]
    }
    path.push(id)
    return path.join('/')
}

export const getBreadCrumbs = (path) => {
    const ids: string[] = path.split('/').slice(1)
    const roads: { name: string, url: string }[] = ids.map((name, idIndex) => {
        const url: string = path.split('/').slice(0, idIndex + 2).join('/')
        return {name, url}
    })
    return roads;
}

export const getPathFromId = (data, id) => {
    let path: number|string[] = [];
    let currentItem = getObject(data, id);
    while (currentItem.id !== 0) {
        path.unshift(currentItem.id)
        currentItem = getObject(data, currentItem.parentId)
    }
    return [...path].join('/');
}

export const idGenerator = (parentId: number) => {
    return parentId++;
}

export const filterByIds = (data: any[], ids: number[]) => {
    return data.filter(item => ids.includes(item.id))
}