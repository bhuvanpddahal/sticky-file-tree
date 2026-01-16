import type {
    ComponentType,
    HTMLAttributes,
    MouseEvent,
    ReactNode,
    RefObject
} from "react";

import type { FileTree } from "./utils";
import type { IconProps } from "./icons";

/**
 * Defines the standard color pairing for a specific state (e.g., text and background).
 */
interface ColorProps {
    /** The foreground text color. */
    color?: string;

    /** The background color of the node row. */
    backgroundColor?: string;
}

/**
 * A collection of color states applied to tree nodes.
 * These values follow a priority hierarchy: Folder/File options override Node options.
 */
interface BaseColorsProps {
    /** The initial color state of the node. */
    default?: ColorProps;

    /** Colors applied when the user's pointer is over the node. */
    hover?: ColorProps;

    /** * Colors applied when the node receives keyboard or click focus. 
     * Includes an optional border color for accessibility rings.
     */
    focus?: ColorProps & {
        borderColor?: string;
    };

    /** Colors applied when the node is marked as selected (active). */
    selected?: ColorProps;
}

/**
 * Global configuration for all tree nodes (Files and Folders).
 */
export interface TreeNodeOptions {
    /**
     * The fixed height (in pixels) of each row in the tree.
     * @default ```28```
     */
    height?: number;

    /** * The global color palette for nodes. 
     * Individual folder or file overrides will take precedence over these values.
     */
    colors?: BaseColorsProps;

    /**
     * Horizontal spacing added to the start and end of the node row.
     * Can be a single number for uniform offset or an object for granular control.
     */
    inlineOffset?: number | {
        left?: number;
        right?: number;
    };

    /**
     * The spacing (in pixels) between the icon and the text label.
     * @default ```8```
     */
    gap?: number;

    /**
     * A dynamic calculation for the left indentation of a node.
     * Use this to customize how deep nesting affects left alignment.
     * @default ```depthDistance * (depth - 1)```
     */
    depthOffset?: (props: DepthOffsetProps) => number;
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

/**
 * Configuration specific to file (leaf) nodes.
 */
export interface TreeFileNodeOptions extends TreeNodeOptions {
    /**
     * Custom icon for file nodes. Accepts a React component for dynamic rendering 
     * based on file path/name, or standard `Icon` props.
     */
    icon?: ComponentType<CustomFileProps> | IconProps;

    /**
     * Custom text renderer or standard HTML span attributes for the file label.
     */
    text?: ComponentType<CustomFileProps> | HTMLAttributes<HTMLSpanElement>;
};

/**
 * Configuration specific to folder (branch) nodes.
 */
export interface TreeFolderNodeOptions extends Omit<TreeNodeOptions, "colors"> {
    /**
     * Color palette for folder nodes. Includes the 'stuck' state for sticky headers.
     */
    colors?: BaseColorsProps & {
        /** Colors applied when a folder header is 'stuck' at the top of the viewport. */
        stuck?: ColorProps;
    };

    /**
     * Custom icon for folder nodes or props to the default icon. Can change appearance based on the `open` state.
     */
    icon?: ComponentType<CustomFolderProps> | IconProps;

    /**
     * Custom text renderer or standard HTML span attributes for the folder label.
     */
    text?: ComponentType<CustomFolderProps> | HTMLAttributes<HTMLSpanElement>;

    /**
     * The CSS box-shadow string applied to the folder header when it is in the 'folded' (sticky) state.
     * @example ```"0 4px 6px -1px rgb(0 0 0 / 0.1)"```
     */
    foldingShadow?: string;
};

/**
 * Represents the color scheme mode for the file tree.
 */
export type Theme = "light" | "dark";

/**
 * Configuration props for the `FileTree` component.
 */
export interface FileTreeProps {
    /**
     * An array of relative file paths to be rendered in the tree.
     * The component will automatically parse these into a nested directory structure.
     * @example ```["src/App.tsx", "index.html", "src/components/Button.tsx", "public/logo.svg"]```
     */
    files: string[];

    /**
     * Callback function triggered when a file node is clicked.
     * @param props An object containing full path and name of the selected file.
     */
    onFileSelect?: (props: CustomBaseProps) => void;

    /**
     * When enabled, the file tree will feature a "folding" UI effect (sticky headers) 
     * where parent folders remain visible at the top while scrolling through their content.
     * @default ```true```
     */
    folding?: boolean;

    /**
     * The horizontal indentation (in pixels) for each nested level of the tree.
     * Increase this value to create a more pronounced visual hierarchy.
     * @default ```16```
     */
    depthDistance?: number;

    /**
     * The amount of padding (in pixels) rendered at the bottom of the file tree.
     * Useful to ensure the last node isn't obscured by floating UI elements.
     * @default ```16```
     */
    paddingBottom?: number;

    /**
     * The base background color of the entire file tree container.
     * Overrides the theme-specific default background.
     */
    backgroundColor?: string;

    /**
     * Global configuration for tree nodes (both file and folder nodes).
     * Use this for shared styles like default height, offset, or colors.
     */
    nodeOptions?: TreeNodeOptions;

    /**
     * Specific configuration and styling overrides for file nodes (leaf nodes).
     */
    fileOptions?: TreeFileNodeOptions;

    /**
     * Specific configuration for folder nodes, including sticky behavior and 
     * folder-specific icons or colors.
     */
    folderOptions?: TreeFolderNodeOptions;

    /**
     * A React Ref pointing to the scrollable element. 
     * Required for features like "sticky folding" to calculate scroll positions accurately.
     */
    scrollContainerRef?: RefObject<HTMLElement | null>;

    /**
     * Sets the visual theme of the component. 
     * This affects default colors for backgrounds, text, and hover states.
     * @default ```"light"```
     */
    theme?: Theme;
}

export type VariablesProviderProps =
    Pick<FileTreeProps, "nodeOptions" | "fileOptions" | "folderOptions"> &
    { theme: Theme; children: ReactNode };

export type FileTreeConfig = Pick<
    FileTreeProps,
    "nodeOptions"
> & Required<Pick<
    FileTreeProps,
    "depthDistance"
>> & {
    selectedPath: string | null;
    setSelectedPath: (path: string | null) => void;
};

export interface FileTreeConfigProviderProps {
    config: Pick<FileTreeConfig, "depthDistance" | "nodeOptions">;
    children: ReactNode;
}

export type FolderNodeConfig = Pick<
    FileTreeProps,
    "folding" | "folderOptions"
> & {
    scrollContainerRef?: RefObject<HTMLElement | null>;
};

export interface FolderNodeConfigProviderProps {
    config: FolderNodeConfig;
    children: ReactNode;
}

export type FileNodeConfig = Pick<
    FileTreeProps,
    "onFileSelect" | "fileOptions"
>;

export interface FileNodeConfigProviderProps {
    config: FileNodeConfig;
    children: ReactNode;
}

export interface TreeContentProps {
    node: FileTree;
    depth: number;
    elevation: number;
    parentPath: string;
}

export interface NodeTextProps extends HTMLAttributes<HTMLSpanElement> {
    name: string;
}

export interface FileNodeOrFolderProps {
    node: FileTree;
    depth: number;
    elevation: number;
    currentPath: string;
}

export interface FolderNodeProps {
    node: FileTree;
    depth: number;
    open: boolean;
    selected: boolean;
    currentPath: string;
    onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export interface BottomSpacerProps {
    height: number;
}