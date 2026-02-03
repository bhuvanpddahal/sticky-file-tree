import type { HTMLAttributes } from "react";

export const DEFAULT_DEPTH_DISTANCE = 16;
export const DEFAULT_PADDING_BOTTOM = 16;
export const DEFAULT_NODE_HEIGHT = 28;
export const DEFAULT_LEFT_OFFSET = 12;
export const DEFAULT_RIGHT_OFFSET = 4;
export const DEFAULT_NODE_GAP = 8;

export const DEFAULT_VARIABLES = {
    light: {
        color: "#525252",
        backgroundColor: "#ffffff",
        hoverColor: "#000000",
        hoverBackgroundColor: "#f1f1f1",
        focusColor: "#0a0a0a",
        focusBorderColor: "#1e40af",
        focusBackgroundColor: "#dbeafe",
        selectedColor: "#525252",
        selectedBackgroundColor: "#e5e5e5",
        foldingShadow: "0 4px 3px -2px rgb(0 0 0 / 0.12), 0 2px 2px -2px rgb(0 0 0 / 0.12)"
    },
    dark: {
        color: "#adadad",
        backgroundColor: "#161616",
        hoverColor: "#fafafa",
        hoverBackgroundColor: "#212121",
        focusColor: "#f0f0f0",
        focusBorderColor: "#3b82f6",
        focusBackgroundColor: "#172554",
        selectedColor: "#adadad",
        selectedBackgroundColor: "#2c2c2c",
        foldingShadow: "0 4px 3px -2px rgb(0 0 0 / 0.9), 0 2px 2px -2px rgb(0 0 0 / 0.9)"
    }
};

export const defaultInlineOffset = {
    left: DEFAULT_LEFT_OFFSET,
    right: DEFAULT_RIGHT_OFFSET
};

export const fileTreeStyles: HTMLAttributes<HTMLDivElement>["style"] = {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    boxSizing: "border-box",
    margin: 0,
    zIndex: 1
};

export const treeNodeStyles: HTMLAttributes<HTMLButtonElement>["style"] = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    fontWeight: 400,
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    borderRadius: 0,
    cursor: "pointer"
};

export const folderContainerStyles: HTMLAttributes<HTMLDivElement>["style"] = {
    position: "relative",
    zIndex: 1
};

export const folderNodeStyles: HTMLAttributes<HTMLButtonElement>["style"] = {
    position: "sticky",
    zIndex: 10
};