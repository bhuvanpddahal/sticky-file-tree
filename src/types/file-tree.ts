import type {
    ComponentType,
    HTMLAttributes,
    MouseEvent,
    ReactNode,
    RefObject
} from "react";

import type { FileTree } from "./utils";
import type { IconProps } from "./icons";

interface ColorProps {
    color?: string;
    backgroundColor?: string;
}

interface BaseColorsProps {
    default?: ColorProps;
    hover?: ColorProps;
    focus?: ColorProps & {
        borderColor?: string;
    };
    selected?: ColorProps;
}

interface TreeItemOptions {
    height?: number;
    colors?: BaseColorsProps;
    inlineOffset?: number | {
        left?: number;
        right?: number;
    };
    gap?: number;
}

interface CustomBaseProps {
    path: string;
    name: string;
}

interface CustomFileProps extends CustomBaseProps {
    selected: boolean;
}

interface CustomFolderProps extends CustomBaseProps {
    open: boolean;
}

interface DepthOffsetProps {
    depth: number;
    depthDistance: number;
    gap: number;
}

interface TreeFileItemOptions extends TreeItemOptions {
    icon?: ComponentType<CustomFileProps> | IconProps;
    text?: ComponentType<CustomFileProps> | HTMLAttributes<HTMLSpanElement>;
    depthOffset?: (props: DepthOffsetProps) => number;
};

interface TreeFolderItemOptions extends Omit<TreeItemOptions, "colors"> {
    colors?: BaseColorsProps & {
        stuck?: ColorProps;
    };
    icon?: ComponentType<CustomFolderProps> | IconProps;
    text?: ComponentType<CustomFolderProps> | HTMLAttributes<HTMLSpanElement>;
    foldingShadow?: string;
    depthOffset?: (props: DepthOffsetProps) => number;
};

export interface FileTreeProps {
    files: string[];
    onFileSelect?: (file: string) => void;
    folding?: boolean;
    depthDistance?: number;
    paddingBottom?: number;
    // unit?: "rem" | "px";
    itemOptions?: TreeItemOptions;
    fileOptions?: TreeFileItemOptions;
    folderOptions?: TreeFolderItemOptions;
    scrollContainerRef?: RefObject<HTMLElement | null>;
    // theme?: "light" | "dark";
}

export type ColorsProviderProps =
    Pick<FileTreeProps, "itemOptions" | "fileOptions" | "folderOptions"> &
    { children: ReactNode };

export type FileTreeConfig = Pick<
    FileTreeProps,
    "itemOptions"
> & Required<Pick<
    FileTreeProps,
    "depthDistance"
>> & {
    selectedPath: string | null;
    setSelectedPath: (path: string | null) => void;
};

export interface FileTreeConfigProviderProps {
    config: Pick<FileTreeConfig, "depthDistance" | "itemOptions">;
    children: ReactNode;
}

export type FolderItemConfig = Pick<
    FileTreeProps,
    "folding" | "folderOptions"
> & {
    scrollContainerRef?: RefObject<HTMLElement | null>;
};

export interface FolderItemConfigProviderProps {
    config: FolderItemConfig;
    children: ReactNode;
}

export type FileItemConfig = Pick<
    FileTreeProps,
    "onFileSelect" | "fileOptions"
>;

export interface FileItemConfigProviderProps {
    config: FileItemConfig;
    children: ReactNode;
}

export interface TreeContentProps {
    item: FileTree;
    depth: number;
    elevation: number;
    parentPath: string;
}

export interface ItemTextProps extends HTMLAttributes<HTMLSpanElement> {
    name: string;
}

export interface FileItemOrFolderProps {
    item: FileTree;
    depth: number;
    elevation: number;
    currentPath: string;
}

export interface FolderItemProps {
    // ref: RefObject<HTMLButtonElement | null>;
    item: FileTree;
    depth: number;
    open: boolean;
    selected: boolean;
    currentPath: string;
    onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export interface BottomSpacerProps {
    height: number;
}