import { useRef } from "react";

import NodeText from "./NodeText";
import {
    DEFAULT_LEFT_OFFSET,
    DEFAULT_NODE_GAP,
    DEFAULT_NODE_HEIGHT,
    DEFAULT_RIGHT_OFFSET,
    defaultInlineOffset,
    folderNodeStyles,
    treeNodeStyles
} from "../constants/file-tree";
import { ArrowIcon } from "./Icons";
import { useFolderStuck } from "../hooks/useFolderStuck";
import type { FolderNodeProps } from "../types/file-tree";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import { useFolderNodeConfig } from "../context/FolderNodeConfig";

const FolderNode = (
    { node, depth, open, selected, currentPath, onClick }: FolderNodeProps
) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const { depthDistance, nodeOptions } = useFileTreeConfig();
    const { folderOptions, folding, scrollContainerRef } = useFolderNodeConfig();
    const { inlineOffset = defaultInlineOffset } = nodeOptions ?? {};

    const customProps = { path: currentPath, name: node.name, open };
    const height = folderOptions?.height ?? nodeOptions?.height ?? DEFAULT_NODE_HEIGHT;
    const top = height * (depth - 1);
    const defaultDepthOffset = depthDistance * (depth - 1);
    const leftOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.left ?? DEFAULT_LEFT_OFFSET);
    const rightOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.right ?? DEFAULT_RIGHT_OFFSET);
    const columnGap = folderOptions?.gap ?? nodeOptions?.gap ?? DEFAULT_NODE_GAP;
    const depthOffsetProps = { depth, depthDistance, gap: columnGap };
    const depthOffset =
        folderOptions?.depthOffset?.(depthOffsetProps) ??
        nodeOptions?.depthOffset?.(depthOffsetProps) ??
        defaultDepthOffset;
    const isStuck = useFolderStuck(scrollContainerRef, ref, top, open);

    return (
        <button
            ref={ref}
            data-tree-node
            data-folder-node
            data-open={open}
            data-depth={depth}
            data-selected={selected}
            data-stuck={isStuck}
            data-fold="false"
            style={{
                ...treeNodeStyles,
                ...((scrollContainerRef && folding) ? { ...folderNodeStyles, top: `${top}px` } : {}),
                height: `${height}px`,
                paddingLeft: `${depthOffset + leftOffset}px`,
                paddingRight: `${rightOffset}px`,
                columnGap: `${columnGap}px`
            }}
            onClick={onClick}
        >
            {typeof folderOptions?.icon === "function" ? (
                <folderOptions.icon {...customProps} />
            ) : (
                <ArrowIcon
                    {...folderOptions?.icon}
                    style={{
                        ...(folderOptions?.icon?.style ?? {}),
                        rotate: open ? "90deg" : undefined
                    }}
                />
            )}
            {typeof folderOptions?.text === "function" ? (
                <folderOptions.text {...customProps} />
            ) : (
                <NodeText name={node.name} {...folderOptions?.text} />
            )}
        </button>
    );
};

export default FolderNode;