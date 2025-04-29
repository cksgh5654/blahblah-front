import { SVGAttributes, forwardRef, Ref } from "react";

interface ChevronIconProps extends SVGAttributes<SVGSVGElement> {
  thickness?: string;
  color?: string;
}

// forwardRef를 사용하여 ref를 처리
const ChevronIcon = forwardRef<SVGSVGElement, ChevronIconProps>(
  (props, ref: Ref<SVGSVGElement>) => {
    const { color, thickness, ...svgProps } = props;
    return (
      <svg
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref} // ref를 SVG 요소에 연결
        {...svgProps}
      >
        <path
          d="M32 38L23.6695 30.4492C21.4435 28.4317 21.4435 27.5682 23.6695 25.5507L32 18"
          stroke={color ? color : "#000"}
          strokeWidth={thickness ? thickness : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

// displayName 설정 (디버깅 및 React DevTools에서 유용)
ChevronIcon.displayName = "ChevronIcon";

export default ChevronIcon;
