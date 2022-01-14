import { FileTypes } from "../types/file";
import { FolderTypes } from "../types/folder";

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

export const pathCreator = (id: number, parents: number[], prev: boolean = false): string => {
    let path: number[] = [];
    if (parents.length) {
        path = [...parents]
    }
    if (!prev) {
        path.push(id)
    }
    return path.join('/')
}

export const getBreadCrumbs = (path: string): {name: string, url: string}[] => {
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

export const fileCretor = (fileData: FileTypes) => {
    const file: FileTypes = { ...fileData };
    return file;
}

export const folderCretor = (folderData: FolderTypes) => {
    const folder: FolderTypes = { ...folderData };
    return folder;
}

export const idGenerator = (data: any[]) => {
    let id = data[data.length - 1].id + 1;
    while (data.find(item => item.id === id)) {
        id++
    }
    return id;
}

export const filterByIds = (data: any[], ids: number[]) => {
    return data.filter(item => ids.includes(item.id))
}

export const getAllChildrenIds = (data: any[], id: number) => {
    let shouldDeleteIds_ = [id];
    const deletedItem = data.find(item => item.id === id);
    if(deletedItem && deletedItem.children && deletedItem.children.length) {
        deletedItem.children.forEach(childId => {
            shouldDeleteIds_ = shouldDeleteIds_.concat(getAllChildrenIds(data, childId))
        });
    }
    return [...shouldDeleteIds_]   
}

export const getIdFromPath = (path: string): number => {
    let paths: string[] = path.split('/')
    let path_: number = Number(paths[paths.length - 1]);
    return path_;
}