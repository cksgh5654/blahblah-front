import {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import { PopoverContext } from ".";

interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { setTriggerRect, setIsOpen, isOpen } = useContext(PopoverContext);
  const { children } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculateTriggerRect = () => {
    if (!buttonRef.current) return;
    setTriggerRect(buttonRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    calculateTriggerRect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", calculateTriggerRect);
    }

    return () => {
      window.removeEventListener("resize", calculateTriggerRect);
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button {...props} onClick={handleClick} ref={buttonRef}>
      {children}
    </button>
  );
};
export default PopoverTrigger;
