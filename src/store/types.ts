export type File = {
    id: string,
    name: string;
    content: string;
    type: 'file';
}

export type CurrentFolder = {
    id: string;
    name: string;
    depth: number;
    folders: CurrentFolder[];
    files: File[];
    type: 'folder';
}

export type FolderId = {
    id: string;
} 

export type GetPostsApiPayload = {
    limit: number
}

export type PostType = {
    userId: number
    id: number
    title: string
    body: string
}

export type FoldersInfo = {
    [key: string]: any;
}
  