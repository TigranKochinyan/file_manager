export interface FolderTypes {
    readonly id: number;
    name: string;
    readonly parentId: number;
    readonly type: 'folder';
    children: number[];
    readonly parents: number[];
}