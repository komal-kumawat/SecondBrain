import { IconProps, IconSizeVariants } from ".";

export const LinkIcon = (props: IconProps) => {
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
          d="M10.34 5.34a5.45 5.45 0 017.72 7.72l-3.44 3.43a5.45 5.45 0 01-7.72-7.72l3.44-3.43zM9.66 18.66a5.45 5.45 0 01-7.72-7.72l3.44-3.43a5.45 5.45 0 017.72 7.72l-3.44 3.43z"
        />
      </svg>
    </div>
  );
};
