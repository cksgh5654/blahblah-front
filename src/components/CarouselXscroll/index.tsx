import {
  createContext,
  ReactNode,
  FC,
  useMemo,
  RefObject,
  useState,
} from "react";
import CarouselXscrollItemContainer from "./CarouselXscrollItemContainer";
import CarouselXscrollItems from "./CarouselXscrollItems";
import CarouselXscrollNavigator from "./CarouselXscrollNavigator";
import { carouselXscrollBaseCls } from "./className";

interface CarouselXscrollCompoundProps {
  ItemContainer: typeof CarouselXscrollItemContainer;
  Items: typeof CarouselXscrollItems;
  Navigator: typeof CarouselXscrollNavigator;
}

interface CarouselXscrollContextProps {
  itemListRef: RefObject<HTMLDivElement | null>;
  baseRect: DOMRect;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  pixelMove: number;
  chevronColor?: string;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

interface CarouselXscrollProps {
  children: ReactNode;
  className?: string;
  itemListRef: RefObject<HTMLDivElement | null>;
  baseRect: DOMRect;
  pixelMove: number;
  chevronColor?: string;
}

export const CarouselXscrollContext =
  createContext<CarouselXscrollContextProps>({
    itemListRef: { current: null },
    baseRect: new DOMRect(),
    scrollPosition: 0,
    setScrollPosition: () => {},
    pixelMove: 0,
    chevronColor: "#000000",
    isDragging: false,
    setIsDragging: () => {},
  });

const CarouselXscroll: FC<CarouselXscrollProps> &
  CarouselXscrollCompoundProps = (props) => {
  const {
    children,
    className,
    itemListRef,
    baseRect,
    pixelMove,
    chevronColor,
  } = props;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const contextValue = {
    itemListRef,
    baseRect,
    scrollPosition,
    setScrollPosition,
    pixelMove,
    chevronColor,
    isDragging,
    setIsDragging,
  };

  const cls = useMemo(
    () =>
      className
        ? `${className} ${carouselXscrollBaseCls}`
        : carouselXscrollBaseCls,
    [className]
  );

  return (
    <CarouselXscrollContext.Provider value={contextValue}>
      <div style={{ position: "relative" }} className={cls}>
        {children}
      </div>
    </CarouselXscrollContext.Provider>
  );
};

CarouselXscroll.ItemContainer = CarouselXscrollItemContainer;
CarouselXscroll.Items = CarouselXscrollItems;
CarouselXscroll.Navigator = CarouselXscrollNavigator;

export default CarouselXscroll;
