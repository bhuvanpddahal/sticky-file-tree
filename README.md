# Sticky File Tree

A customizable File Tree component built specifically for the React 19 ecosystem. Featuring VS Code-style "Sticky Folding", intelligent sorting, and light/dark theme support.

## Features

- 📂 **VS Code Style Sticky Headers:** Parent folders "stick" to the top while scrolling through their content.
- 🎨 **Dynamic Theming:** Color injection using CSS variables for instant theme switching.
- 🔡 **Auto-Sorting:** Intelligently sorts folders first, then files, both alphabetically.
- 🧩 **Component Slots:** Override any part of the tree (Icons, Labels) with your own React components.

---

## Installation

```bash
npm install sticky-file-tree
```

## Quick Start

```tsx
import { useRef } from "react";
import { FileTree } from "sticky-file-tree";

// File paths must be relative and should not start with a leading slash /.
// The component uses these strings to construct the internal tree hierarchy.
const files = [
	"src/components/Button.tsx",
	"src/utils/format.ts",
	"src/main.tsx",
	"package.json",
	"public/favicon.ico"
];

function App() {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={ref}
			// Ensure your container has a defined height and overflow: auto.
			style={{ width: "280px", height: "640px", overflow: "auto" }}
		>
			<FileTree
				files={files}
				scrollContainerRef={ref}
				onFileSelect={console.log}
			/>
		</div>
	);
}
```

> **Note:** If you want to enable sticky behavior, you must pass the Ref of the parent scrollable element.

---

## Compatibility

**React 19.2.0+** This package is built exclusively for the React 19 ecosystem to leverage the latest performance optimizations. It does not support React 18 or older.

---

## Customization

### The "Slot" Pattern

The component utilizes a flexible slot pattern, allowing you to intercept and replace default elements with custom logic. This is particularly useful for conditional styling or state-aware icons.

```tsx
<FileTree
	fileOptions={{
		// Use a blue square for TypeScript files, default icon for others
		icon: ({ name }) => <span>{name.endsWith(".ts") ? "🟦" : "📄"}</span>
	}}
	folderOptions={{
		// Toggle emoji based on the folder's open/closed state
		icon: ({ open }) => <span>{open ? "📂" : "📁"}</span>
	}}
/>
```

### Third-Party Icon Integration

While the component provides sensible defaults, it is designed to be agnostic regarding asset providers. You can easily integrate specialized icon sets to create a high-fidelity interface.

In the following example, we demonstrate integration with the [`@react-symbols/icons`](https://www.npmjs.com/package/@react-symbols/icons) library, though the same pattern applies to any custom SVG set.

```tsx
import { useRef } from "react";
import { ArrowIcon, FileTree } from "sticky-file-tree";
import { FileIcon, FolderIcon } from "@react-symbols/icons/utils";
```

```tsx
<FileTree
	fileOptions={{
		icon: ({ name }) => (
			<FileIcon
				fileName={name}
				style={{ width: "16px", height: "16px" }}
			/>
		),
		// Fine-tune alignment when using custom icons
		depthOffset: ({ depth, depthDistance, gap }) => {
			return depthDistance * (depth - 1) + gap + 16;
		}
	}}
	folderOptions={{
		icon: ({ name, open }) => (
			<>
				<ArrowIcon style={{ rotate: open ? "90deg" : "0deg" }} />
				<FolderIcon
					folderName={name}
					style={{ width: "16px", height: "16px" }}
				/>
			</>
		)
	}}
/>
```

> **Note:** When implementing custom file or folder elements, **Sticky File Tree** may not automatically apply the expected node alignment. To ensure correct visual hierarchy, utilize the `depthOffset` callback to define your custom indentation logic.

---

## API Reference

### 1. `props`

These are all the props accepted by the `<FileTree />` component.

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

### 2. `nodeOptions`

Global settings applied to every node in the tree.

| Option         | Type                                           | Default                                                     | Description                                            |
| -------------- | ---------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| `height`       | `number`                                       | `28`                                                        | Row height in pixels.                                  |
| `gap`          | `number`                                       | `8`                                                         | Spacing between the icon and the text label.           |
| `inlineOffset` | `number \| { left?: number; right?: number; }` | `{ left: 12, right: 4 }`                                    | Horizontal padding inside the node row.                |
| `depthOffset`  | `(props: DepthOffsetProps) => number`          | `({ depth, depthDistance }) => depthDistance * (depth - 1)` | Custom function to calculate indentation per level.    |
| `colors`       | `BaseColorsProps`                              | Theme defaults                                              | Global color states (Default, Hover, Focus, Selected). |

### 3. `fileOptions`

Specific to files. Inherits options from `nodeOptions`.

| Option | Type                                                                | Description                                        |
| ------ | ------------------------------------------------------------------- | -------------------------------------------------- |
| `icon` | `ComponentType<CustomFileProps> \| IconProps`                       | Custom file icon or props for the default icon.    |
| `text` | `ComponentType<CustomFileProps> \| HTMLAttributes<HTMLSpanElement>` | Custom label renderer or standard span attributes. |

### 4. `folderOptions`

Specific to folders. Inherits from `nodeOptions` (except `colors` which adds the `stuck` state).

| Option          | Type                                                                  | Description                                                        |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `icon`          | `ComponentType<CustomFolderProps> \| IconProps`                       | Custom folder icon or props for the default icon.                  |
| `text`          | `ComponentType<CustomFolderProps> \| HTMLAttributes<HTMLSpanElement>` | Custom label renderer or standard span attributes.                 |
| `foldingShadow` | `string`                                                              | CSS box-shadow applied when a folder header is "stuck" at the top. |
| `colors.stuck`  | `ColorProps`                                                          | Colors applied specifically when the folder is sticky/stuck.       |

---

## Styling Hierarchy & Context

To keep your implementation clean, the `FileTree` uses a **cascading override system**. Understanding this is key to efficient styling:

1. **Defaults:** The component looks at the `theme` prop ("light" or "dark").
2. **Global Overrides:** Any value provided in `nodeOptions` replaces the theme default for _both_ files and folders.
3. **Specific Overrides:** Values in `fileOptions` or `folderOptions` have the highest priority and override everything else.
