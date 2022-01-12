export interface FileTypes {
    id: number;
    name: string;
    parentId: string;
    type: 'file';
    parents: number[];
    content: string;
}