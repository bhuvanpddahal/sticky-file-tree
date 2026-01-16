import type { NodeTextProps } from "../types/file-tree";

const NodeText = ({ name, style, ...props }: NodeTextProps) => {
    return (
        <span
            {...props}
            data-node-text
            style={{
                fontSize: "14px",
                ...(style ?? {}),
                flex: 1,
                minWidth: 0,
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
            }}
        >
            {name}
        </span>
    );
};

export default NodeText;