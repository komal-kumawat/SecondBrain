// ./icons/ImageIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const ImageIcon = (props: IconProps) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={IconSizeVariants[props.size]}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17l5-5a2 2 0 012.828 0L17 19"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 13l4-4a2 2 0 012.828 0L21 11"
        />
        <circle cx="8" cy="8" r="1.5" />
      </svg>
    </div>
  );
};
