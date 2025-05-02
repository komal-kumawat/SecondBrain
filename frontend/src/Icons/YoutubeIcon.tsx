// ./icons/YouTubeIcon.tsx
import { IconProps, IconSizeVariants } from ".";

export const YouTubeIcon = (props: IconProps) => {
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
          d="M23 7.002a2.9 2.9 0 00-2.08-2.755c-1.528-.54-3.996-.75-6.92-.75-2.924 0-5.392.21-6.92.75a2.9 2.9 0 00-2.08 2.755v9.996a2.9 2.9 0 002.08 2.755c1.528.54 3.996.75 6.92.75 2.924 0 5.392-.21 6.92-.75a2.9 2.9 0 002.08-2.755V7.002zM9.563 11.26v3.48l3.812-1.74-3.812-1.74z"
        />
      </svg>
    </div>
  );
};
