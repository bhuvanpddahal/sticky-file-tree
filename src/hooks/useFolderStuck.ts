import { type RefObject, useEffect, useState } from "react";

import { convertRemToPx } from "../lib/utils";

export const useFolderStuck = (
    scrollContainerRef: RefObject<HTMLElement | null> | undefined,
    folderItemRef: RefObject<HTMLButtonElement | null>,
    topOffsetInRem: number,
    isFolderOpen: boolean
) => {
    const topOffsetInPx = convertRemToPx(topOffsetInRem);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollContainerRef?.current;
        const folderItem = folderItemRef.current;
        if (!scrollContainer || !folderItem) return;

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const folderItemRect = folderItem.getBoundingClientRect();

                    const containerStyle = window.getComputedStyle(scrollContainer);
                    const containerBorderTop = parseFloat(containerStyle.borderTopWidth) || 0;
                    const containerPaddingTop = parseFloat(containerStyle.paddingTop) || 0;
                    const offset = folderItemRect.top - containerRect.top - containerBorderTop - containerPaddingTop;

                    const isStuck =
                        offset <= topOffsetInPx &&
                        offset + folderItemRect.height > topOffsetInPx &&
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
        folderItemRef.current,
        topOffsetInPx,
        isFolderOpen,
        setIsStuck
    ]);

    return isStuck;
};