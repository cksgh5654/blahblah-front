import { SVGAttributes } from "react";

interface LoudSpeakerIconProps extends SVGAttributes<SVGSVGElement> {
  height: string;
  className?: string;
}

const LoudSpeakerIcon = (props: LoudSpeakerIconProps) => {
  const { height, className } = props;
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1992 5.40391L12.5655 10.5071H7.24997C6.55936 10.5071 6 11.1231 6 11.8838V20.1443C6 20.9044 6.55936 21.521 7.24997 21.521H12.5655L17.1992 26.6236C17.982 27.4858 19.333 26.88 19.333 25.6501V6.37796C19.333 5.14634 17.981 4.54344 17.1992 5.40391ZM23.6158 11.6039C23.0127 11.2407 22.2517 11.48 21.9174 12.146C21.5846 12.812 21.8049 13.6489 22.4095 14.0166C23.0819 14.4239 23.4996 15.1891 23.4996 16.014C23.4996 16.8389 23.0819 17.6042 22.4101 18.0109C21.8054 18.3786 21.5851 19.2156 21.9179 19.8816C22.2528 20.5504 23.0142 20.7879 23.6163 20.4237C25.0866 19.5316 26.0001 17.8423 26.0001 16.0135C26.0001 14.1847 25.0866 12.4959 23.6158 11.6039Z"
        fill="#5B21B6"
      />
    </svg>
  );
};

export default LoudSpeakerIcon;
