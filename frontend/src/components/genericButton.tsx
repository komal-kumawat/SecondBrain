import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
  fullwidth,
  loading,
}: ButtonProps) => {
  const baseClass = "inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors";
  const variantClass =
    variant === "primary"
      ? "bg-blue-700 text-white hover:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
      : "bg-blue-200 text-purple-800 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed";
  const sizeClass =
    size === "sm"
      ? "text-sm"
      : size === "md"
      ? "text-base"
      : "text-lg";

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} m-2 ${fullwidth ? "w-full" : ""}`}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
          Loading...
        </div>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          <span>{text}</span>
          {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
      )}
    </button>
  );
};
