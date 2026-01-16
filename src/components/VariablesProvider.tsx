import type { CSSProperties } from "react";

import { DEFAULT_VARIABLES } from "../constants/file-tree";
import type { VariablesProviderProps } from "../types/file-tree";

const VariablesProvider = ({
    nodeOptions,
    fileOptions,
    folderOptions,
    theme,
    children
}: VariablesProviderProps) => {
    return (
        <div
            data-variables-provider
            style={{
                "--file-color": fileOptions?.colors?.default?.color ?? nodeOptions?.colors?.default?.color ?? DEFAULT_VARIABLES[theme].color,
                "--file-background-color": fileOptions?.colors?.default?.backgroundColor ?? nodeOptions?.colors?.default?.backgroundColor ?? DEFAULT_VARIABLES[theme].backgroundColor,
                "--file-hover-color": fileOptions?.colors?.hover?.color ?? nodeOptions?.colors?.hover?.color ?? DEFAULT_VARIABLES[theme].hoverColor,
                "--file-hover-background-color": fileOptions?.colors?.hover?.backgroundColor ?? nodeOptions?.colors?.hover?.backgroundColor ?? DEFAULT_VARIABLES[theme].hoverBackgroundColor,
                "--file-focus-color": fileOptions?.colors?.focus?.color ?? nodeOptions?.colors?.focus?.color ?? DEFAULT_VARIABLES[theme].focusColor,
                "--file-focus-border-color": fileOptions?.colors?.focus?.borderColor ?? nodeOptions?.colors?.focus?.borderColor ?? DEFAULT_VARIABLES[theme].focusBorderColor,
                "--file-focus-background-color": fileOptions?.colors?.focus?.backgroundColor ?? nodeOptions?.colors?.focus?.backgroundColor ?? DEFAULT_VARIABLES[theme].focusBackgroundColor,
                "--file-selected-color": fileOptions?.colors?.selected?.color ?? nodeOptions?.colors?.selected?.color ?? DEFAULT_VARIABLES[theme].selectedColor,
                "--file-selected-background-color": fileOptions?.colors?.selected?.backgroundColor ?? nodeOptions?.colors?.selected?.backgroundColor ?? DEFAULT_VARIABLES[theme].selectedBackgroundColor,
                "--folder-color": folderOptions?.colors?.default?.color ?? nodeOptions?.colors?.default?.color ?? DEFAULT_VARIABLES[theme].color,
                "--folder-background-color": folderOptions?.colors?.default?.backgroundColor ?? nodeOptions?.colors?.default?.backgroundColor ?? DEFAULT_VARIABLES[theme].backgroundColor,
                "--folder-hover-color": folderOptions?.colors?.hover?.color ?? nodeOptions?.colors?.hover?.color ?? DEFAULT_VARIABLES[theme].hoverColor,
                "--folder-hover-background-color": folderOptions?.colors?.hover?.backgroundColor ?? nodeOptions?.colors?.hover?.backgroundColor ?? DEFAULT_VARIABLES[theme].hoverBackgroundColor,
                "--folder-focus-color": folderOptions?.colors?.focus?.color ?? nodeOptions?.colors?.focus?.color ?? DEFAULT_VARIABLES[theme].focusColor,
                "--folder-focus-border-color": folderOptions?.colors?.focus?.borderColor ?? nodeOptions?.colors?.focus?.borderColor ?? DEFAULT_VARIABLES[theme].focusBorderColor,
                "--folder-focus-background-color": folderOptions?.colors?.focus?.backgroundColor ?? nodeOptions?.colors?.focus?.backgroundColor ?? DEFAULT_VARIABLES[theme].focusBackgroundColor,
                "--folder-selected-color": folderOptions?.colors?.selected?.color ?? nodeOptions?.colors?.selected?.color ?? DEFAULT_VARIABLES[theme].selectedColor,
                "--folder-selected-background-color": folderOptions?.colors?.selected?.backgroundColor ?? nodeOptions?.colors?.selected?.backgroundColor ?? DEFAULT_VARIABLES[theme].selectedBackgroundColor,
                "--stuck-color": folderOptions?.colors?.stuck?.color ?? folderOptions?.colors?.default?.color ?? nodeOptions?.colors?.default?.color ?? DEFAULT_VARIABLES[theme].color,
                "--stuck-background-color": folderOptions?.colors?.stuck?.backgroundColor ?? folderOptions?.colors?.default?.backgroundColor ?? nodeOptions?.colors?.default?.backgroundColor ?? DEFAULT_VARIABLES[theme].backgroundColor,
                "--folding-shadow": folderOptions?.foldingShadow ?? DEFAULT_VARIABLES[theme].foldingShadow
            } as CSSProperties}
        >
            {children}
        </div>
    );
};

export default VariablesProvider;