// ./icons/DocumentIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const DocumentIcon = (props: IconProps) => {
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
          d="M6 2.25v19.5a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V6l-4-4h-7.5a.75.75 0 00-.75.75z"
        />
      </svg>
    </div>
  );
};
