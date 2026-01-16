import { Activity, type MouseEvent, useRef, useState } from "react";

import FolderNode from "./FolderNode";
import TreeContent from "./TreeContent";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import { folderContainerStyles } from "../constants/file-tree";
import type { FileNodeOrFolderProps } from "../types/file-tree";

const Folder = (
    { node, depth, elevation, currentPath }: FileNodeOrFolderProps
) => {
    const folderContentRef = useRef<HTMLDivElement>(null);
    const { selectedPath, setSelectedPath } = useFileTreeConfig();
    const [isOpen, setIsOpen] = useState(false);

    const isSelected = currentPath === selectedPath;

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        const folderContent = folderContentRef.current;
        const foldedFolderNode = folderContent?.querySelector("[data-folder-node][data-fold=true]");
        if (foldedFolderNode) {
            foldedFolderNode.setAttribute("data-fold", "false");
        }
        setIsOpen(!isOpen);
        setSelectedPath(currentPath);
    };

    return (
        <div
            data-folder
            style={{ position: "relative", zIndex: elevation }}
        >
            <FolderNode
                node={node}
                depth={depth}
                open={isOpen}
                selected={isSelected}
                currentPath={currentPath}
                onClick={handleClick}
            />
            <Activity mode={(isOpen && node.children) ? "visible" : "hidden"}>
                <div
                    ref={folderContentRef}
                    data-folder-content
                    style={folderContainerStyles}
                >
                    {node.children?.map((subNode, index) => (
                        <TreeContent
                            key={index}
                            node={subNode}
                            depth={depth + 1}
                            elevation={node.children!.length - index}
                            parentPath={`${currentPath}/`}
                        />
                    ))}
                </div>
            </Activity>
        </div>
    );
};

export default Folder;