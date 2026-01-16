import type { MouseEvent } from "react";

import NodeText from "./NodeText";
import {
    DEFAULT_LEFT_OFFSET,
    DEFAULT_NODE_GAP,
    DEFAULT_NODE_HEIGHT,
    DEFAULT_RIGHT_OFFSET,
    defaultInlineOffset,
    treeNodeStyles
} from "../constants/file-tree";
import { FileIcon } from "./Icons";
import { useFileNodeConfig } from "../context/FileNodeConfig";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import type { FileNodeOrFolderProps } from "../types/file-tree";

const FileNode = (
    { node, depth, elevation, currentPath }: FileNodeOrFolderProps
) => {
    const { onFileSelect, fileOptions } = useFileNodeConfig();
    const { selectedPath, depthDistance, nodeOptions, setSelectedPath } = useFileTreeConfig();
    const { inlineOffset = defaultInlineOffset } = nodeOptions ?? {};

    const isSelected = currentPath === selectedPath;
    const height = fileOptions?.height ?? nodeOptions?.height ?? DEFAULT_NODE_HEIGHT;
    const customProps = { path: currentPath, name: node.name, selected: isSelected };
    const defaultDepthOffset = depthDistance * (depth - 1);
    const leftOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.left ?? DEFAULT_LEFT_OFFSET);
    const rightOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.right ?? DEFAULT_RIGHT_OFFSET);
    const columnGap = fileOptions?.gap ?? nodeOptions?.gap ?? DEFAULT_NODE_GAP;
    const depthOffsetProps = { depth, depthDistance, gap: columnGap };
    const depthOffset =
        fileOptions?.depthOffset?.(depthOffsetProps) ??
        nodeOptions?.depthOffset?.(depthOffsetProps) ??
        defaultDepthOffset;

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        setSelectedPath(currentPath);
        onFileSelect?.({ path: currentPath, name: node.name });
    };

    return (
        <button
            data-tree-node
            data-file-node
            data-depth={depth}
            data-selected={isSelected}
            style={{
                ...treeNodeStyles,
                height: `${height}px`,
                position: "relative",
                paddingLeft: `${depthOffset + leftOffset}px`,
                paddingRight: `${rightOffset}px`,
                columnGap: `${columnGap}px`,
                zIndex: elevation
            }}
            onClick={handleClick}
        >
            {typeof fileOptions?.icon === "function" ? (
                <fileOptions.icon {...customProps} />
            ) : (
                <FileIcon {...fileOptions?.icon} />
            )}
            {typeof fileOptions?.text === "function" ? (
                <fileOptions.text {...customProps} />
            ) : (
                <NodeText name={node.name} {...fileOptions?.text} />
            )}
        </button>
    );
};

export default FileNode;