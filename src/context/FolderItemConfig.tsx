import { createContext, useContext } from "react";

import type {
    FolderItemConfig,
    FolderItemConfigProviderProps
} from "../types/file-tree";

const FolderItemConfigContext = createContext<FolderItemConfig | null>(null);

export const FolderItemConfigProvider = ({
    config,
    children
}: FolderItemConfigProviderProps) => {
    return (
        <FolderItemConfigContext.Provider value={config}>
            {children}
        </FolderItemConfigContext.Provider>
    );
};

export const useFolderItemConfig = () => {
    const value = useContext(FolderItemConfigContext);
    if (!value) {
        throw new Error("'useFolderItemConfig' must be used within a FolderItemConfigProvider");
    }

    return value;
};