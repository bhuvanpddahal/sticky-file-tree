# Sticky File Tree

A customizable File Tree component built specifically for the React 19 ecosystem. Featuring VS Code-style "Sticky Folding", intelligent sorting, and light/dark theme support.

## Features

-   📂 **VS Code Style Sticky Headers:** Parent folders "stick" to the top while scrolling through their content.
-   🎨 **Dynamic Theming:** Color injection using CSS variables for instant theme switching.
-   🔡 **Auto-Sorting:** Intelligently sorts folders first, then files, both alphabetically.
-   🧩 **Component Slots:** Override any part of the tree (Icons, Labels) with your own React components.

---

## Installation

```bash
npm install sticky-file-tree

```

## Quick Start

```tsx
import { useRef } from "react";
import { FileTree } from "sticky-file-tree";

const files = [
	"src/components/Button.tsx",
	"src/utils/format.ts",
	"package.json",
	"public/favicon.ico"
];

function App() {
    const ref = useRef<HTMLDivElement>(null);

	return (
		<div ref={ref} style={{ width: "320px", height: "640px" overflow: "auto" }}>
			<FileTree
				files={files}
                scrollContainerRef={ref}
				onFileSelect={(props) => console.log(props)}
			/>
		</div>
	);
}
```

> **Note:** If you want to have the sticky behavior, you must pass the Ref of the parent scrollable element.

---

## Compatibility

**React 19+** This package is built exclusively for the React 19 ecosystem to leverage the latest performance optimizations. It does not support React 18 or older.

---

## Customization

### The "Slot" Pattern

You can replace the default text or icons with your own components. This is useful for adding file-type specific icons (e.g., JS, TS, PDF).

```tsx
<FileTree
	fileOptions={{
		icon: ({ name, selected }) => (
			<span>{name.endsWith(".ts") ? "🟦" : "📄"}</span>
		)
	}}
/>
```

### With a File Icon Library

You can also use a file/folder icon library to add file and folder specific icons.

```tsx
import { useRef } from "react";
import { ArrowIcon, FileTree } from "sticky-file-tree";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";

function App() {
    const ref = useRef<HTMLDivElement>(null);

	return (
        <div ref={ref} style={{ width: "320px", height: "640px" overflow: "auto" }}>
            <FileTree
                files={files}
                scrollContainerRef={ref}
                fileOptions={{
                    icon: ({ name }) => (
                        <FileIcon
                            fileName={name}
                            style={{ width: "16px", height: "16px" }}
                        />
                    ),
                    depthOffset: ({ depth, depthDistance, gap }) => {
                        return depthDistance * (depth - 1) + gap + 16;
                    }
                }}
                folderOptions={{
                    icon: ({ name, open }) => (
                        <>
                            <ArrowIcon
                                style={{ rotate: open ? "90deg" : undefined }}
                            />
                            <FolderIcon
                                folderName={name}
                                style={{ width: "16px", height: "16px" }}
                            />
                        </>
                    )
                }}
            />
        </div>
	);
}
```

> **Note:** By default, when using the custom file/folder elements, `Sticky File Tree` likely won't align the nodes as you want. For that, we can use `depthOffset` callback to provide the logic for the indentation.

---

## API Reference

### 1. `FileTreeProps`

These are the primary props passed to the `<FileTree />` component.

| Prop                 | Type                               | Default                           | Description                                                       |
| -------------------- | ---------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| `files`              | `string[]`                         | **Required**                      | Array of relative paths. Automatically parsed into a tree.        |
| `onFileSelect`       | `(props: CustomBaseProps) => void` | `undefined`                       | Callback returning the `path` and `name` of the clicked file.     |
| `folding`            | `boolean`                          | `true`                            | Enables VS Code-style sticky headers for folders.                 |
| `scrollContainerRef` | `RefObject<HTMLElement>`           | `undefined`                       | **Required for folding.** Ref to the parent scrollable container. |
| `theme`              | `"light" \| "dark"`                | `"light"`                         | Sets the default color palette.                                   |
| `depthDistance`      | `number`                           | `16`                              | Horizontal indentation (px) per nesting level.                    |
| `paddingBottom`      | `number`                           | `16`                              | Extra whitespace at the bottom of the tree.                       |
| `backgroundColor`    | `string`                           | Light: `#ffffff`, Dark: `#161616` | Overrides the theme's base container background.                  |
| `nodeOptions`        | `TreeNodeOptions`                  | See below                         | Global configuration for all rows (Files & Folders).              |
| `fileOptions`        | `TreeFileNodeOptions`              | See below                         | Specific overrides for file (leaf) nodes.                         |
| `folderOptions`      | `TreeFolderNodeOptions`            | See below                         | Specific overrides for folder (branch) nodes.                     |

---

### 2. `nodeOptions`

Global settings applied to every node in the tree.

| Option         | Type                | Default                                                     | Description                                            |
| -------------- | ------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| `height`       | `number`            | `28`                                                        | Row height in pixels.                                  |
| `gap`          | `number`            | `8`                                                         | Spacing between the icon and the text label.           |
| `inlineOffset` | `number`            | `{ left: 12, right: 4 }`                                    | Horizontal padding inside the node row.                |
| `depthOffset`  | `(props) => number` | `({ depth, depthDistance }) => depthDistance * (depth - 1)` | Custom function to calculate indentation per level.    |
| `colors`       | `BaseColorsProps`   | `Theme defaults`                                            | Global color states (Default, Hover, Focus, Selected). |

---

### 3. `fileOptions`

Specific to files. Inherits options from `nodeOptions`.

| Option | Type                          | Description                                        |
| ------ | ----------------------------- | -------------------------------------------------- |
| `icon` | `Component \| IconProps`      | Custom file icon or props for the default icon.    |
| `text` | `Component \| HTMLAttributes` | Custom label renderer or standard span attributes. |

---

### 4. `folderOptions`

Specific to folders. Inherits from `nodeOptions` (except `colors` which adds the `stuck` state).

| Option          | Type                          | Description                                                        |
| --------------- | ----------------------------- | ------------------------------------------------------------------ |
| `icon`          | `Component \| IconProps`      | Custom folder icon (can change based on `open` state).             |
| `text`          | `Component \| HTMLAttributes` | Custom label renderer or standard span attributes.                 |
| `foldingShadow` | `string`                      | CSS box-shadow applied when a folder header is "stuck" at the top. |
| `colors.stuck`  | `ColorProps`                  | Colors applied specifically when the folder is sticky/stuck.       |

---

## Styling Hierarchy & Context

To keep your implementation clean, the `FileTree` uses a **cascading override system**. Understanding this is key to efficient styling:

1. **Defaults:** The component looks at the `theme` prop ("light" or "dark").
2. **Global Overrides:** Any value provided in `nodeOptions` replaces the theme default for _both_ files and folders.
3. **Specific Overrides:** Values in `fileOptions` or `folderOptions` have the highest priority and override everything else.
