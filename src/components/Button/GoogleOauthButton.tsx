import { ButtonHTMLAttributes } from "react";
import GoogleIcon from "../Icons/GoogleIcon";

interface GoogleOauthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const GoogleOauthButton = ({ onClick, children }: GoogleOauthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full border border-[#DFDFDF] px-6 py-2 font-bold flex items-center justify-center gap-x-2 rounded-lg"
    >
      <GoogleIcon />
      {children}
    </button>
  );
};

export default GoogleOauthButton;
