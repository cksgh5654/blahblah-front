import { SVGAttributes } from "react";

interface MenIconProps extends SVGAttributes<SVGSVGElement> {
  height: string;
  className?: string;
}

const MenIcon = (props: MenIconProps) => {
  const { height, className } = props;
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0001 16.0422C18.7021 16.0422 20.892 13.8523 20.892 11.1502C20.892 8.44821 18.7021 6.2583 16.0001 6.2583C13.2981 6.2583 11.1082 8.44821 11.1082 11.1502C11.1082 13.8523 13.2981 16.0422 16.0001 16.0422ZM19.4244 17.2652H18.7862C17.9378 17.655 16.9938 17.8766 16.0001 17.8766C15.0064 17.8766 14.0663 17.655 13.214 17.2652H12.5757C9.73995 17.2652 7.43921 19.5659 7.43921 22.4017V23.9916C7.43921 25.0043 8.2609 25.826 9.27368 25.826H22.7265C23.7393 25.826 24.561 25.0043 24.561 23.9916V22.4017C24.561 19.5659 22.2602 17.2652 19.4244 17.2652Z"
        fill="#5B21B6"
      />
    </svg>
  );
};

export default MenIcon;
