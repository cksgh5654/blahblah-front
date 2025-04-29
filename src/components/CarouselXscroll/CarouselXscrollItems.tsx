import { FC, ReactNode, useContext, useMemo } from "react";
import { CarouselXscrollContext } from ".";
import { carouselXscrollItemsCls } from "./className";

interface CarouselXscrollItemsProps {
  children: ReactNode;
  className?: string;
}

const CarouselXscrollItems: FC<CarouselXscrollItemsProps> = (props) => {
  const { className, children } = props;
  const { baseRect, isDragging } = useContext(CarouselXscrollContext);

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselXscrollItemsCls}`
        : carouselXscrollItemsCls,
    [className]
  );
  return (
    <div
      style={{
        transform: `translateX(${baseRect.left}px)`,
        display: "flex",
        overflowX: "visible",
        pointerEvents: isDragging ? "none" : "auto",
      }}
      className={cls}
    >
      {children}
    </div>
  );
};

export default CarouselXscrollItems;
