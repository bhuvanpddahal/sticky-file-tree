import { useRef } from "react";

import "../styles/file-tree.css";
import TreeContent from "./TreeContent";
import VariablesProvider from "./VariablesProvider";
import {
    DEFAULT_DEPTH_DISTANCE,
    DEFAULT_PADDING_BOTTOM,
    DEFAULT_VARIABLES,
    fileTreeStyles
} from "../constants/file-tree";
import { createFileTree } from "../lib/utils";
import type { FileTreeProps } from "../types/file-tree";
import { FileNodeConfigProvider } from "../context/FileNodeConfig";
import { FileTreeConfigProvider } from "../context/FileTreeConfig";
import { FolderNodeConfigProvider } from "../context/FolderNodeConfig";
import { useUpdateFolderShadows } from "../hooks/useUpdateFolderShadows";

/**
 * This component renders a highly customizable, accessible, and performant 
 * tree structure for file system navigation.
 */
// @see {@link https://my-docs-site.com/components/file-tree|Full Documentation}
const FileTree = ({
    files,
    onFileSelect,
    folding = true,
    depthDistance = DEFAULT_DEPTH_DISTANCE,
    paddingBottom = DEFAULT_PADDING_BOTTOM,
    backgroundColor,
    nodeOptions,
    fileOptions,
    folderOptions,
    scrollContainerRef,
    theme = "light"
}: FileTreeProps) => {
    const fileTree = createFileTree(files);
    const fileTreeRef = useRef<HTMLDivElement | null>(null);
    const finalizedScrollContainerRef = folding ? scrollContainerRef : undefined;
    const fileTreeConfig = { depthDistance, nodeOptions };
    const folderNodeConfig = { scrollContainerRef: finalizedScrollContainerRef, folding, folderOptions };
    const fileNodeConfig = { onFileSelect, fileOptions };

    useUpdateFolderShadows(fileTreeRef, folding);

    return (
        <div
            ref={fileTreeRef}
            data-file-tree
            style={{
                ...fileTreeStyles,
                paddingBottom: `${paddingBottom}px`,
                backgroundColor: backgroundColor ?? DEFAULT_VARIABLES[theme].backgroundColor
            }}
        >
            <VariablesProvider
                nodeOptions={nodeOptions}
                fileOptions={fileOptions}
                folderOptions={folderOptions}
                theme={theme}
            >
                <FileTreeConfigProvider config={fileTreeConfig}>
                    <FolderNodeConfigProvider config={folderNodeConfig}>
                        <FileNodeConfigProvider config={fileNodeConfig}>
                            {fileTree.map((node, index) => (
                                <TreeContent
                                    key={node.name}
                                    node={node}
                                    depth={1}
                                    elevation={fileTree.length - index}
                                    parentPath=""
                                />
                            ))}
                        </FileNodeConfigProvider>
                    </FolderNodeConfigProvider>
                </FileTreeConfigProvider>
            </VariablesProvider>
        </div>
    );
};

export default FileTree;