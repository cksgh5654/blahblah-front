import GoogleIcon from "../Icons/GoogleIcon";

interface GoogleOauthButtonProps {
  onClick: () => void;
  title: string;
}
const GoogleOauthButton = ({ onClick, title }: GoogleOauthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[344px] h-12 border border-[#DFDFDF] font-bold flex items-center justify-center gap-x-2 rounded-lg"
    >
      <GoogleIcon />
      <p>{title}</p>
    </button>
  );
};

export default GoogleOauthButton;
