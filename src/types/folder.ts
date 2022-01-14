export interface FolderTypes {
    id: number;
    name: string;
    parentId: number;
    type: 'folder';
    children: number[];
    parents: number[];
}