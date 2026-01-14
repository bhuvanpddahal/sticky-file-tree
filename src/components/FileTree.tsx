import { useRef } from "react";

import "../styles/file-tree.css";
import TreeContent from "./TreeContent";
import ColorsProvider from "./ColorsProvider";
import {
    DEFAULT_DEPTH_DISTANCE_IN_REM,
    DEFAULT_PADDING_BOTTOM_IN_REM,
    fileTreeStyle
} from "../constants/file-tree";
import { createFileTree } from "../lib/utils";
import type { FileTreeProps } from "../types/file-tree";
import { FileItemConfigProvider } from "../context/FileItemConfig";
import { FileTreeConfigProvider } from "../context/FileTreeConfig";
import { FolderItemConfigProvider } from "../context/FolderItemConfig";
import { useUpdateFolderShadows } from "../hooks/useUpdateFolderShadows";

const FileTree = ({
    files,
    onFileSelect,
    folding = true,
    depthDistance = DEFAULT_DEPTH_DISTANCE_IN_REM,
    paddingBottom = DEFAULT_PADDING_BOTTOM_IN_REM,
    itemOptions,
    fileOptions,
    folderOptions,
    scrollContainerRef
}: FileTreeProps) => {
    const fileTree = createFileTree(files);
    const fileTreeRef = useRef<HTMLDivElement | null>(null);
    const finalizedScrollContainerRef = folding ? scrollContainerRef : undefined;
    const fileTreeConfig = { depthDistance, itemOptions };
    const folderItemConfig = { scrollContainerRef: finalizedScrollContainerRef, folding, folderOptions };
    const fileItemConfig = { onFileSelect, fileOptions };

    useUpdateFolderShadows(fileTreeRef, folding);

    return (
        <div
            data-file-tree
            ref={fileTreeRef}
            style={{ ...fileTreeStyle, paddingBottom: `${paddingBottom}rem` }}
        >
            <ColorsProvider
                itemOptions={itemOptions}
                fileOptions={fileOptions}
                folderOptions={folderOptions}
            >
                <FileTreeConfigProvider config={fileTreeConfig}>
                    <FolderItemConfigProvider config={folderItemConfig}>
                        <FileItemConfigProvider config={fileItemConfig}>
                            {fileTree.map((item, index) => (
                                <TreeContent
                                    key={index}
                                    item={item}
                                    depth={1}
                                    elevation={fileTree.length - index}
                                    parentPath=""
                                />
                            ))}
                        </FileItemConfigProvider>
                    </FolderItemConfigProvider>
                </FileTreeConfigProvider>
            </ColorsProvider>
        </div>
    );
};

export default FileTree;