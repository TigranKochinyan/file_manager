export interface FileTypes {
    id: number;
    name: string;
    parentId: number;
    type: 'file';
    parents: number[];
    content: string;
}