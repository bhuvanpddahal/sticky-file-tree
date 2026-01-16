import { type RefObject, useLayoutEffect } from "react";

export const useUpdateFolderShadows = (
    fileTreeRef: RefObject<HTMLDivElement | null>,
    folding?: boolean
) => {
    useLayoutEffect(() => {
        const fileTree = fileTreeRef?.current;
        if (!fileTree || !folding) return;

        let timeoutId: number;

        const updateFolderShadows = () => {
            const folderNodes = fileTree.querySelectorAll("[data-stuck]");
            if (!folderNodes.length) return;

            let hasFoundLastVisibleStuckNode = false;
            const reversedFolderNodes = [...folderNodes].reverse();

            reversedFolderNodes.forEach((node) => {
                const isVisible = node.checkVisibility();
                const isStuck = node.getAttribute("data-stuck") === "true";
                const isVisibleStuckNode = isVisible && isStuck;

                if (!hasFoundLastVisibleStuckNode && isVisibleStuckNode) {
                    hasFoundLastVisibleStuckNode = true;
                    node.setAttribute("data-fold", "true");
                } else if (isVisible) {
                    node.setAttribute("data-fold", "false");
                }
            });
        };

        const observer = new MutationObserver((mutationsList) => {
            const hasFolderStuckAttributeChange = mutationsList.some(
                (mutation) =>
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-stuck" &&
                    mutation.target instanceof HTMLElement &&
                    mutation.target.hasAttribute("data-folder-node")
            );
            if (hasFolderStuckAttributeChange) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(updateFolderShadows, 50);
            }
        });

        observer.observe(fileTree, {
            attributes: true,
            attributeOldValue: false,
            subtree: true,
            childList: false,
            characterData: false
        });

        return () => {
            observer.disconnect();
        }
    }, [fileTreeRef.current, folding]);
};