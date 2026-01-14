import Folder from "./Folder";
import FileItem from "./FileItem";
import type { TreeContentProps } from "../types/file-tree";

const TreeContent = (
    { item, parentPath, ...restProps }: TreeContentProps
) => {
    const currentPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    const props = { item, ...restProps, currentPath };

    if (!item.children) {
        return <FileItem {...props} />;
    }

    return <Folder {...props} />;
};

export default TreeContent;