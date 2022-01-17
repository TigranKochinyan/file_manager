export interface FileTypes {
    readonly id: number;
    name: string;
    readonly parentId: number;
    readonly type: 'file';
    readonly parents: number[];
    content: string;
}