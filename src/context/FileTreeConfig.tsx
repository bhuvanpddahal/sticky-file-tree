import { createContext, useContext, useState } from "react";

import type {
    FileTreeConfig,
    FileTreeConfigProviderProps
} from "../types/file-tree";

const FileTreeConfigContext = createContext<FileTreeConfig | null>(null);

export const FileTreeConfigProvider = ({
    config,
    children
}: FileTreeConfigProviderProps) => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    const value = { ...config, selectedPath, setSelectedPath };

    return (
        <FileTreeConfigContext.Provider value={value}>
            {children}
        </FileTreeConfigContext.Provider>
    );
};

export const useFileTreeConfig = () => {
    const value = useContext(FileTreeConfigContext);
    if (!value) {
        throw new Error("'useFileTreeConfig' must be used within a FileTreeConfigProvider");
    }

    return value;
};