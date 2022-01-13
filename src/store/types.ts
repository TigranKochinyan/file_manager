export type File = {
    id: string,
    name: string;
    content: string;
    type: 'file';
}

export type CurrentFolder = {
    id: number;
    name: string;
    depth: number;
    folders: CurrentFolder[];
    files: File[];
    type: 'folder';
}

export type FolderId = {
    id: number;
}

export type FoldersInfo = {
    [key: string]: any;
}