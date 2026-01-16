import { createContext, useContext } from "react";

import type {
    FolderNodeConfig,
    FolderNodeConfigProviderProps
} from "../types/file-tree";

const FolderItemConfigContext = createContext<FolderNodeConfig | null>(null);

export const FolderNodeConfigProvider = ({
    config,
    children
}: FolderNodeConfigProviderProps) => {
    return (
        <FolderItemConfigContext.Provider value={config}>
            {children}
        </FolderItemConfigContext.Provider>
    );
};

export const useFolderNodeConfig = () => {
    const value = useContext(FolderItemConfigContext);
    if (!value) {
        throw new Error("'useFolderNodeConfig' must be used within a FolderNodeConfigProvider");
    }

    return value;
};