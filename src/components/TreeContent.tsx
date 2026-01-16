import Folder from "./Folder";
import FileNode from "./FileNode";
import type { TreeContentProps } from "../types/file-tree";

const TreeContent = (
    { node, parentPath, ...restProps }: TreeContentProps
) => {
    const currentPath = `${parentPath}${node.name}`;
    const props = { node, ...restProps, currentPath };

    if (!node.children) {
        return <FileNode {...props} />;
    }

    return <Folder {...props} />;
};

export default TreeContent;