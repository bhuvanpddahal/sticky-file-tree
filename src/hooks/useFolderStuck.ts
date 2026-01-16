import { type RefObject, useEffect, useState } from "react";

export const useFolderStuck = (
    scrollContainerRef: RefObject<HTMLElement | null> | undefined,
    folderNodeRef: RefObject<HTMLButtonElement | null>,
    topOffset: number,
    isFolderOpen: boolean
) => {
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;
        const folderNode = folderNodeRef.current;
        if (!scrollContainer || !folderNode) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const folderNodeRect = folderNode.getBoundingClientRect();

                    const containerStyle = window.getComputedStyle(scrollContainer);
                    const containerBorderTop = parseFloat(containerStyle.borderTopWidth) || 0;
                    const containerPaddingTop = parseFloat(containerStyle.paddingTop) || 0;
                    const offset = folderNodeRect.top - containerRect.top - containerBorderTop - containerPaddingTop;

                    const isStuck =
                        offset <= topOffset &&
                        offset + folderNodeRect.height > topOffset &&
                        scrollContainer.scrollTop > 0 &&
                        isFolderOpen;
                    setIsStuck(isStuck);

                    ticking = false;
                });

                ticking = true;
            }
        };

        handleScroll();
        scrollContainer.addEventListener("scroll", handleScroll);

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, [
        scrollContainerRef?.current,
        folderNodeRef.current,
        topOffset,
        isFolderOpen,
        setIsStuck
    ]);

    return isStuck;
};