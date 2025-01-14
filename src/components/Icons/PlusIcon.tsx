import { SVGAttributes } from "react";

interface PlusIconProps extends SVGAttributes<SVGSVGElement> {
  height: string;
  className?: string;
}

const PlusIcon = (props: PlusIconProps) => {
  const { height, className, ...rest } = props;
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M16 8L16 24"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 16L8 16"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
