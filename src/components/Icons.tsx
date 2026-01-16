import type { IconProps } from "../types/icons";

export const FileIcon = ({ style, ...props }: IconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
                ...style
            }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.71 4.29L10.71 1.29L10 1H4L3 2V14L4 15H13L14 14V5L13.71 4.29ZM13 14H4V2H9V6H13V14ZM10 5V2L13 5H10Z"
                fill="currentColor"
            />
        </svg>
    );
};

export const ArrowIcon = ({ style, ...props }: IconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "16px",
                height: "16px",
                flexShrink: 0,
                ...style
            }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0719 8.02397L5.7146 3.66666L6.33332 3.04794L11 7.71461V8.33333L6.33332 13L5.7146 12.3813L10.0719 8.02397Z"
                fill="currentColor"
            />
        </svg>
    );
};