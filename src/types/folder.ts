export interface FolderTypes {
    id: number;
    name: string;
    parentId: string;
    type: 'folder';
    children: number[];
    parents: number[];
}