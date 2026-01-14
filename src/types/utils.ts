export type FileTree = {
    name: string;
    children: FileTree[] | null;
};