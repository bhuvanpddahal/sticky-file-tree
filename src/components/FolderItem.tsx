import { useRef } from "react";

import ItemText from "./ItemText";
import {
    DEFAULT_ITEM_GAP_IN_REM,
    DEFAULT_ITEM_HEIGHT_IN_REM,
    DEFAULT_LEFT_OFFSET_IN_REM,
    DEFAULT_RIGHT_OFFSET_IN_REM,
    defaultInlineOffset,
    folderItemStyle,
    treeItemStyle
} from "../constants/file-tree";
import { ArrowIcon } from "./Icons";
import { useFolderStuck } from "../hooks/useFolderStuck";
import type { FolderItemProps } from "../types/file-tree";
import { useFileTreeConfig } from "../context/FileTreeConfig";
import { useFolderItemConfig } from "../context/FolderItemConfig";

const FolderItem = (
    { item, depth, open, selected, currentPath, onClick }: FolderItemProps
) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const { depthDistance, itemOptions } = useFileTreeConfig();
    const { folderOptions, folding, scrollContainerRef } = useFolderItemConfig();
    const { inlineOffset = defaultInlineOffset } = itemOptions ?? {};

    const customProps = { path: currentPath, name: item.name, open };
    const heightInRem = folderOptions?.height ?? itemOptions?.height ?? DEFAULT_ITEM_HEIGHT_IN_REM;
    const topInRem = heightInRem * (depth - 1);
    const defaultDepthOffset = depthDistance * (depth - 1);
    const leftOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.left ?? DEFAULT_LEFT_OFFSET_IN_REM);
    const rightOffset = typeof inlineOffset === "number"
        ? inlineOffset
        : (inlineOffset.right ?? DEFAULT_RIGHT_OFFSET_IN_REM);
    const columnGap = folderOptions?.gap ?? itemOptions?.gap ?? DEFAULT_ITEM_GAP_IN_REM;
    const depthOffset = typeof folderOptions?.depthOffset === "function"
        ? folderOptions.depthOffset({ depth, depthDistance, gap: columnGap })
        : defaultDepthOffset;
    const isStuck = useFolderStuck(scrollContainerRef, ref, topInRem, open);

    return (
        <button
            ref={ref}
            data-tree-item
            data-folder-item
            data-open={open}
            data-depth={depth}
            data-selected={selected}
            data-stuck={isStuck}
            data-fold="false"
            style={{
                ...treeItemStyle,
                ...((scrollContainerRef && folding) ? { ...folderItemStyle, top: `${topInRem}rem` } : {}),
                height: `${heightInRem}rem`,
                paddingLeft: `${depthOffset + leftOffset}rem`,
                paddingRight: `${rightOffset}rem`,
                columnGap: `${columnGap}rem`
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
                <ItemText name={item.name} {...folderOptions?.text} />
            )}
        </button>
    );
};

export default FolderItem;