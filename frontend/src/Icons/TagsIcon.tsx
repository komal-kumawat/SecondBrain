// ./icons/HashTagIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const HashTagIcon = (props: IconProps) => {
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
          d="M7 10h10M7 14h10M10 3L8 21M16 3l-2 18"
        />
      </svg>
    </div>
  );
};
