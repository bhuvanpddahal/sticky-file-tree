import type { MouseEvent } from "react";

import ItemText from "./ItemText";
import {
    DEFAULT_ITEM_GAP_IN_REM,
    DEFAULT_ITEM_HEIGHT_IN_REM,
    DEFAULT_LEFT_OFFSET_IN_REM,
    DEFAULT_RIGHT_OFFSET_IN_REM,
    defaultInlineOffset,
    treeItemStyle
} from "../constants/file-tree";
import { FileIcon } from "./Icons";
import { useFileItemConfig } from "../context/FileItemConfig";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import type { FileItemOrFolderProps } from "../types/file-tree";

const FileItem = (
    { item, depth, elevation, currentPath }: FileItemOrFolderProps
) => {
    const { onFileSelect, fileOptions } = useFileItemConfig();
    const { selectedPath, depthDistance, itemOptions, setSelectedPath } = useFileTreeConfig();
    const { inlineOffset = defaultInlineOffset } = itemOptions ?? {};

    const isSelected = currentPath === selectedPath;
    const heightInRem = fileOptions?.height ?? itemOptions?.height ?? DEFAULT_ITEM_HEIGHT_IN_REM;
    const customProps = { path: currentPath, name: item.name, selected: isSelected };
    const defaultDepthOffset = depthDistance * (depth - 1);
    const leftOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.left ?? DEFAULT_LEFT_OFFSET_IN_REM);
    const rightOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.right ?? DEFAULT_RIGHT_OFFSET_IN_REM);
    const columnGap = fileOptions?.gap ?? itemOptions?.gap ?? DEFAULT_ITEM_GAP_IN_REM;
    const depthOffset = typeof fileOptions?.depthOffset === "function"
        ? fileOptions.depthOffset({ depth, depthDistance, gap: columnGap })
        : defaultDepthOffset;

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        setSelectedPath(currentPath);
        onFileSelect?.(currentPath);
    };

    return (
        <button
            data-tree-item
            data-file-item
            data-depth={depth}
            data-selected={isSelected}
            style={{
                ...treeItemStyle,
                height: `${heightInRem}rem`,
                position: "relative",
                paddingLeft: `${depthOffset + leftOffset}rem`,
                paddingRight: `${rightOffset}rem`,
                columnGap: `${columnGap}rem`,
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
                <ItemText name={item.name} {...fileOptions?.text} />
            )}
        </button>
    );
};

export default FileItem;