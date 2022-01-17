import { FileTypes, FolderTypes } from "../types";

export const isEmptyObject = (object: { [key: string]: any }) => {
    return Object.keys(object).length === 0 && Object.getPrototypeOf(object) === Object.prototype;
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

export const fileCretor = (fileData: FileTypes) => {
    const file: FileTypes = { ...fileData };
    return file;
}

export const folderCretor = (folderData: FolderTypes) => {
    const folder: FolderTypes = { ...folderData };
    return folder;
}

export const idGenerator = (data: any[]): number => {
    if(!data.length) {
        return 1;
    }
    let id = data[data.length - 1].id + 1;
    while (data.find(item => item.id === id)) {
        id++;
    }
    return id;
}

export const filterByIds = (data: (FolderTypes | FileTypes)[], ids: number[]): (FolderTypes | FileTypes)[] => {
    return data.filter(item => ids.includes(item.id))
}

export const getAllChildrenIds = (data: (FolderTypes | FileTypes)[], id: number) => {
    let shouldDeleteIds_ = [id];
    const deletedItem: FolderTypes | any = data.find(item => item.id === id);
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