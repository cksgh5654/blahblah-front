import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const baseStyle = "bg-violet-800 text-white font-bold px-6 py-2 rounded-lg";

const BaseButton = ({
  onClick,
  children,
  className,
  ...rest
}: BaseButtonProps) => {
  const btnStyle = className ? `${baseStyle} ${className}` : baseStyle;
  return (
    <>
      <button onClick={onClick} className={btnStyle} {...rest}>
        {children}
      </button>
    </>
  );
};

export default BaseButton;
