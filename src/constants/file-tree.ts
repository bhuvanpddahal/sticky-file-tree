import type { HTMLAttributes } from "react";

export const DEFAULT_DEPTH_DISTANCE_IN_REM = 1;
export const DEFAULT_PADDING_BOTTOM_IN_REM = 1;
export const DEFAULT_ITEM_HEIGHT_IN_REM = 2;
export const DEFAULT_LEFT_OFFSET_IN_REM = 0.75;
export const DEFAULT_RIGHT_OFFSET_IN_REM = 0.25;
export const DEFAULT_ITEM_GAP_IN_REM = 0.5;
export const DEFAULT_COLOR = "#525252";
export const DEFAULT_BACKGROUND_COLOR = "#ffffff";
export const DEFAULT_HOVER_COLOR = "black";
export const DEFAULT_HOVER_BACKGROUND_COLOR = "#f1f1f1";
export const DEFAULT_FOCUS_COLOR = "#0a0a0a";
export const DEFAULT_FOCUS_BORDER_COLOR = "#1e40af";
export const DEFAULT_FOCUS_BACKGROUND_COLOR = "#dbeafe";
export const DEFAULT_SELECTED_COLOR = "#525252";
export const DEFAULT_SELECTED_BACKGROUND_COLOR = "#e5e5e5";
export const DEFAULT_FOLDING_SHADOW = "0 4px 3px -2px rgb(0 0 0 / 0.1), 0 2px 2px -2px rgb(0 0 0 / 0.1)";

export const defaultInlineOffset = {
    left: DEFAULT_LEFT_OFFSET_IN_REM,
    right: DEFAULT_RIGHT_OFFSET_IN_REM
};

export const fileTreeStyle: HTMLAttributes<HTMLDivElement>["style"] = {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    margin: 0,
    zIndex: 1
};

export const treeItemStyle: HTMLAttributes<HTMLButtonElement>["style"] = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    whiteSpace: "nowrap",
    borderWidth: "1px",
    borderStyle: "solid",
    cursor: "pointer"
};

export const folderContainerStyle: HTMLAttributes<HTMLDivElement>["style"] = {
    position: "relative",
    zIndex: 1
};

export const folderItemStyle: HTMLAttributes<HTMLButtonElement>["style"] = {
    position: "sticky",
    zIndex: 10
};