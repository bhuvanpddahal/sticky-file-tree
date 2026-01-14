import type { ItemTextProps } from "../types/file-tree";

const ItemText = ({ name, style, ...props }: ItemTextProps) => {
    return (
        <span
            {...props}
            data-item-text
            style={{
                fontSize: "0.875rem",
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

export default ItemText;