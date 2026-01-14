import { Activity, type MouseEvent, useRef, useState } from "react";

import FolderItem from "./FolderItem";
import TreeContent from "./TreeContent";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import { folderContainerStyle } from "../constants/file-tree";
import type { FileItemOrFolderProps } from "../types/file-tree";

const Folder = (
    { item, depth, elevation, currentPath }: FileItemOrFolderProps
) => {
    const folderContentRef = useRef<HTMLDivElement>(null);
    const { selectedPath, setSelectedPath } = useFileTreeConfig();
    const [isOpen, setIsOpen] = useState(false);

    const isSelected = currentPath === selectedPath;

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        const folderContent = folderContentRef.current;
        const foldedFolderItem = folderContent?.querySelector("[data-folder-item][data-fold=true]");
        if (foldedFolderItem) {
            foldedFolderItem.setAttribute("data-fold", "false");
        }
        setIsOpen(!isOpen);
        setSelectedPath(currentPath);
    };

    return (
        <div
            data-folder
            style={{ position: "relative", zIndex: elevation }}
        >
            <FolderItem
                item={item}
                depth={depth}
                open={isOpen}
                selected={isSelected}
                currentPath={currentPath}
                onClick={handleClick}
            />
            <Activity mode={(isOpen && item.children) ? "visible" : "hidden"}>
                <div
                    ref={folderContentRef}
                    data-folder-content
                    style={folderContainerStyle}
                >
                    {item.children?.map((subItem, index) => (
                        <TreeContent
                            key={index}
                            item={subItem}
                            depth={depth + 1}
                            elevation={item.children!.length - index}
                            parentPath={currentPath}
                        />
                    ))}
                </div>
            </Activity>
        </div>
    );
};

export default Folder;