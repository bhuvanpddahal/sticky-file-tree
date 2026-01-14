import type { FileTree } from "../types/utils";

function sortFilePaths(paths: string[]) {
    const sortedPaths = [...paths];

    sortedPaths.sort((a, b) => {
        let i = 0;
        const minLength = Math.min(a.length, b.length);

        while (i < minLength && a[i] === b[i]) {
            i++;
        }

        const aRemainder = a.slice(i);
        const bRemainder = b.slice(i);

        const aIsInsideFolder = aRemainder.includes("/");
        const bIsInsideFolder = bRemainder.includes("/");

        if (aIsInsideFolder && !bIsInsideFolder) {
            return -1;
        }

        if (!aIsInsideFolder && bIsInsideFolder) {
            return 1;
        }

        return a.localeCompare(b);
    });

    return sortedPaths;
}

export function createFileTree(filePaths: string[]) {
    const root: FileTree[] = [];
    const uniqueFilePaths = new Set(filePaths);
    const sortedFilePaths = sortFilePaths([...uniqueFilePaths]);

    for (const filePath of sortedFilePaths) {
        const pathParts = filePath.split("/");
        let currentLevel = root;

        pathParts.forEach((pathPart, index) => {
            const isFile = index === pathParts.length - 1;
            const existingNode = currentLevel.find((node) => node.name === pathPart);

            if (existingNode) {
                if (!isFile) {
                    currentLevel = existingNode.children!;
                }
            } else {
                const newNode: FileTree = isFile
                    ? { name: pathPart, children: null }
                    : { name: pathPart, children: [] };

                currentLevel.push(newNode);

                if (!isFile) {
                    currentLevel = newNode.children!;
                }
            }
        });
    }

    return root;
}

export function convertRemToPx(remValue: number) {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return remValue * 16;
    }

    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    const rootFontSizeString = computedStyle.fontSize;
    const rootFontSizePx = parseFloat(rootFontSizeString);

    return remValue * rootFontSizePx;
}

export function convertPxToRem(pxValue: number) {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return pxValue / 16;
    }

    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    const rootFontSizeString = computedStyle.fontSize;
    const rootFontSizePx = parseFloat(rootFontSizeString);

    return pxValue / rootFontSizePx;
}