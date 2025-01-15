import {
  createContext,
  Dispatch,
  FC,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import PopoverTrigger from "./PopoverTrigger";
import PopoverContent from "./PopoverContent";

interface PopoverCompoundProps {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
}

interface PopoverContextProps extends HTMLAttributes<HTMLDivElement> {
  triggerRect: DOMRect;
  setTriggerRect: Dispatch<SetStateAction<DOMRect>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const PopoverContext = createContext<PopoverContextProps>({
  setTriggerRect: () => {},
  triggerRect: new DOMRect(),
  isOpen: false,
  setIsOpen: () => {},
});

interface PopoverProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}
const Popover: FC<PopoverProps> & PopoverCompoundProps = (props) => {
  const { children, isOpen: externalIsOpen, onToggle, className } = props;
  const [triggerRect, setTriggerRect] = useState(new DOMRect());
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setInternalIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const setIsOpen = (value: SetStateAction<boolean>) => {
    setInternalIsOpen((prevState) => {
      const newValue = typeof value === "function" ? value(prevState) : value;
      if (onToggle) {
        onToggle(newValue);
      }
      return newValue;
    });
  };

  const contextValue = {
    triggerRect,
    setTriggerRect,
    isOpen: internalIsOpen,
    setIsOpen,
  };

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </PopoverContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
