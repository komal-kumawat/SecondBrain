// ./icons/AudioIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const AudioIcon = (props: IconProps) => {
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
          d="M11 5L6 9H3v6h3l5 4V5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a9 9 0 010 14.14"
        />
      </svg>
    </div>
  );
};
