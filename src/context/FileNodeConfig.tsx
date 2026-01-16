import { createContext, useContext } from "react";

import type {
    FileNodeConfig,
    FileNodeConfigProviderProps
} from "../types/file-tree";

const FileItemConfigContext = createContext<FileNodeConfig | null>(null);

export const FileNodeConfigProvider = ({
    config,
    children
}: FileNodeConfigProviderProps) => {
    return (
        <FileItemConfigContext.Provider value={config}>
            {children}
        </FileItemConfigContext.Provider>
    );
};

export const useFileNodeConfig = () => {
    const value = useContext(FileItemConfigContext);
    if (!value) {
        throw new Error("'useFileNodeConfig' must be used within a FileNodeConfigProvider");
    }

    return value;
};