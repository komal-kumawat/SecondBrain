// ./icons/ArticleIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const ArticleIcon = (props: IconProps) => {
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
          d="M4 6h16M4 10h16M4 14h10M4 18h6"
        />
      </svg>
    </div>
  );
};
