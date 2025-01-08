import DefaultUserIcon from "./Icons/DefaultUserIcon";
type AvatarSize = "small" | "medium" | "large" | "xlarge";

interface AvatarProps {
  url?: string;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ url, size = "medium", className, onClick }: AvatarProps) => {
  const baseStyle = getBaseStyle(size, className);
  return (
    <>
      <div className={baseStyle} onClick={onClick}>
        {url ? (
          <img
            src={url}
            alt="user-image"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <DefaultUserIcon />
        )}
      </div>
    </>
  );
};

export default Avatar;

const getBaseStyle = (size: AvatarSize, className?: string) => {
  let baseStyle = "cursor-pointer rounded-full ";
  switch (size) {
    case "small": {
      baseStyle += "w-8 h-8";
      break;
    }
    case "medium": {
      baseStyle += "w-16 h-16";
      break;
    }
    case "large": {
      baseStyle += "w-32 h-32";
      break;
    }
    case "xlarge": {
      baseStyle += "w-48 h-48";
      break;
    }
  }
  return (baseStyle = className ? `${baseStyle} ${className}` : `${baseStyle}`);
};
