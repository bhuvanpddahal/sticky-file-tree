import { createContext, useContext } from "react";

import type {
    FileItemConfig,
    FileItemConfigProviderProps
} from "../types/file-tree";

const FileItemConfigContext = createContext<FileItemConfig | null>(null);

export const FileItemConfigProvider = ({
    config,
    children
}: FileItemConfigProviderProps) => {
    return (
        <FileItemConfigContext.Provider value={config}>
            {children}
        </FileItemConfigContext.Provider>
    );
};

export const useFileItemConfig = () => {
    const value = useContext(FileItemConfigContext);
    if (!value) {
        throw new Error("'useFileItemConfig' must be used within a FileItemConfigProvider");
    }

    return value;
};