import type { CSSProperties } from "react";

import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_COLOR,
    DEFAULT_FOCUS_BACKGROUND_COLOR,
    DEFAULT_FOCUS_BORDER_COLOR,
    DEFAULT_FOCUS_COLOR,
    DEFAULT_FOLDING_SHADOW,
    DEFAULT_HOVER_BACKGROUND_COLOR,
    DEFAULT_HOVER_COLOR,
    DEFAULT_SELECTED_BACKGROUND_COLOR,
    DEFAULT_SELECTED_COLOR
} from "../constants/file-tree";
import type { ColorsProviderProps } from "../types/file-tree";

const ColorsProvider = ({
    itemOptions,
    fileOptions,
    folderOptions,
    children
}: ColorsProviderProps) => {
    return (
        <div
            data-colors-provider
            style={{
                "--file-color": fileOptions?.colors?.default?.color ?? itemOptions?.colors?.default?.color ?? DEFAULT_COLOR,
                "--file-background-color": fileOptions?.colors?.default?.backgroundColor ?? itemOptions?.colors?.default?.backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
                "--file-hover-color": fileOptions?.colors?.hover?.color ?? itemOptions?.colors?.hover?.color ?? DEFAULT_HOVER_COLOR,
                "--file-hover-background-color": fileOptions?.colors?.hover?.backgroundColor ?? itemOptions?.colors?.hover?.backgroundColor ?? DEFAULT_HOVER_BACKGROUND_COLOR,
                "--file-focus-color": fileOptions?.colors?.focus?.color ?? itemOptions?.colors?.focus?.color ?? DEFAULT_FOCUS_COLOR,
                "--file-focus-border-color": fileOptions?.colors?.focus?.borderColor ?? itemOptions?.colors?.focus?.borderColor ?? DEFAULT_FOCUS_BORDER_COLOR,
                "--file-focus-background-color": fileOptions?.colors?.focus?.backgroundColor ?? itemOptions?.colors?.focus?.backgroundColor ?? DEFAULT_FOCUS_BACKGROUND_COLOR,
                "--file-selected-color": fileOptions?.colors?.selected?.color ?? itemOptions?.colors?.selected?.color ?? DEFAULT_SELECTED_COLOR,
                "--file-selected-background-color": fileOptions?.colors?.selected?.backgroundColor ?? itemOptions?.colors?.selected?.backgroundColor ?? DEFAULT_SELECTED_BACKGROUND_COLOR,
                "--folder-color": folderOptions?.colors?.default?.color ?? itemOptions?.colors?.default?.color ?? DEFAULT_COLOR,
                "--folder-background-color": folderOptions?.colors?.default?.backgroundColor ?? itemOptions?.colors?.default?.backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
                "--folder-hover-color": folderOptions?.colors?.hover?.color ?? itemOptions?.colors?.hover?.color ?? DEFAULT_HOVER_COLOR,
                "--folder-hover-background-color": folderOptions?.colors?.hover?.backgroundColor ?? itemOptions?.colors?.hover?.backgroundColor ?? DEFAULT_HOVER_BACKGROUND_COLOR,
                "--folder-focus-color": folderOptions?.colors?.focus?.color ?? itemOptions?.colors?.focus?.color ?? DEFAULT_FOCUS_COLOR,
                "--folder-focus-border-color": folderOptions?.colors?.focus?.borderColor ?? itemOptions?.colors?.focus?.borderColor ?? DEFAULT_FOCUS_BORDER_COLOR,
                "--folder-focus-background-color": folderOptions?.colors?.focus?.backgroundColor ?? itemOptions?.colors?.focus?.backgroundColor ?? DEFAULT_FOCUS_BACKGROUND_COLOR,
                "--folder-selected-color": folderOptions?.colors?.selected?.color ?? itemOptions?.colors?.selected?.color ?? DEFAULT_SELECTED_COLOR,
                "--folder-selected-background-color": folderOptions?.colors?.selected?.backgroundColor ?? itemOptions?.colors?.selected?.backgroundColor ?? DEFAULT_SELECTED_BACKGROUND_COLOR,
                "--stuck-color": folderOptions?.colors?.stuck?.color ?? folderOptions?.colors?.default?.color ?? itemOptions?.colors?.default?.color ?? DEFAULT_COLOR,
                "--stuck-background-color": folderOptions?.colors?.stuck?.backgroundColor ?? folderOptions?.colors?.default?.backgroundColor ?? itemOptions?.colors?.default?.backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
                "--folding-shadow": folderOptions?.foldingShadow ?? DEFAULT_FOLDING_SHADOW
            } as CSSProperties}
        >
            {children}
        </div>
    );
};

export default ColorsProvider;