import { ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { CarouselXscrollContext } from ".";
import { carouselXscrollItemContainerCls } from "./className";

interface CarouselXscrollItemContainerProps {
  children: ReactNode;
  className?: string;
}

const CarouselXscrollItemContainer = (
  props: CarouselXscrollItemContainerProps
) => {
  const { children, className } = props;
  const { itemListRef, setScrollPosition, isDragging, setIsDragging } =
    useContext(CarouselXscrollContext);

  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const THRESHOLD = 5;

  const handleScroll = () => {
    if (itemListRef.current) {
      setScrollPosition(itemListRef.current.scrollLeft);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (itemListRef.current) {
      setIsMouseDown(true);
      setStartX(e.pageX - itemListRef.current.offsetLeft);
      setDragStartX(e.pageX - itemListRef.current.offsetLeft);
      setScrollLeft(itemListRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !itemListRef.current) return;
    e.preventDefault();
    const x = e.pageX - itemListRef.current.offsetLeft;
    const walk = x - startX;

    if (!isDragging && Math.abs(x - dragStartX) > THRESHOLD) {
      setIsDragging(true);
    }

    if (isDragging) {
      itemListRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (itemListRef.current) {
      setIsMouseDown(true);
      setStartX(e.touches[0].pageX - itemListRef.current.offsetLeft);
      setDragStartX(e.touches[0].pageX - itemListRef.current.offsetLeft);
      setScrollLeft(itemListRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isMouseDown || !itemListRef.current) return;
    const x = e.touches[0].pageX - itemListRef.current.offsetLeft;
    const walk = x - startX;

    if (!isDragging && Math.abs(x - dragStartX) > THRESHOLD) {
      setIsDragging(true);
    }

    if (isDragging) {
      itemListRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselXscrollItemContainerCls}`
        : carouselXscrollItemContainerCls,
    [className]
  );

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      style={{
        overflow: "scroll",
        position: "relative",
        display: "flex",
        alignItems: "center",
        scrollbarWidth: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      ref={itemListRef as React.RefObject<HTMLDivElement>}
      className={cls}
    >
      {children}
    </div>
  );
};

export default CarouselXscrollItemContainer;
