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
            const folderItems = fileTree.querySelectorAll("[data-stuck]");
            if (!folderItems.length) return;

            console.log({ folderItems });

            let hasFoundLastVisibleStuckItem = false;
            const reversedFolderItems = [...folderItems].reverse();

            reversedFolderItems.forEach((item) => {
                const isVisible = item.checkVisibility();
                const isStuck = item.getAttribute("data-stuck") === "true";
                const isVisibleStuckItem = isVisible && isStuck;

                if (!hasFoundLastVisibleStuckItem && isVisibleStuckItem) {
                    hasFoundLastVisibleStuckItem = true;
                    item.setAttribute("data-fold", "true");
                } else if (isVisible) {
                    item.setAttribute("data-fold", "false");
                }
            });
        };

        const observer = new MutationObserver((mutationsList) => {
            const hasFolderStuckAttributeChange = mutationsList.some(
                (mutation) =>
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-stuck" &&
                    mutation.target instanceof HTMLElement &&
                    mutation.target.hasAttribute("data-folder-item")
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