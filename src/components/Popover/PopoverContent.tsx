import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { PopoverContext } from ".";
import { createPortal } from "react-dom";

interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const PopoverContent = (props: PopoverContentProps) => {
  const { isOpen, setIsOpen, triggerRect } = useContext(PopoverContext);
  const { children } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const contentPosition = (): CSSProperties => {
    return {
      position: "absolute",
      top: `${triggerRect.bottom}px`,
      left: `0px`,
    };
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div {...props} id="my-popover" style={contentPosition()}>
            <div style={{ width: "100%", height: "100%" }} ref={contentRef}>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
export default PopoverContent;
