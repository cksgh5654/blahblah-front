import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const baseStyle =
  "w-full bg-violet-800 text-white font-bold px-6 py-2 rounded-lg";

const BaseButton = ({ onClick, children, className }: BaseButtonProps) => {
  const btnStyle = className ? `${baseStyle} ${className}` : baseStyle;
  return (
    <>
      <button onClick={onClick} className={btnStyle}>
        {children}
      </button>
    </>
  );
};

export default BaseButton;
