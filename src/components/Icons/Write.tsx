interface MagnifyingGlassProps {
  height?: string;
  className?: string;
}

const Write = (props: MagnifyingGlassProps) => {
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
        d="M22.5813 7.98492L26.7022 12.1057C26.8758 12.2793 26.8758 12.5626 26.7022 12.7362L16.7245 22.7138L12.4849 23.1844C11.9184 23.2484 11.4387 22.7687 11.5027 22.2022L11.9732 17.9626L21.9509 7.98492C22.1245 7.81132 22.4077 7.81132 22.5813 7.98492ZM29.9824 6.93873L27.7529 4.70929C27.0585 4.01487 25.9301 4.01487 25.2311 4.70929L23.6138 6.32655C23.4402 6.50015 23.4402 6.7834 23.6138 6.957L27.7346 11.0778C27.9082 11.2514 28.1915 11.2514 28.3651 11.0778L29.9824 9.46055C30.6768 8.76157 30.6768 7.63314 29.9824 6.93873ZM21.7316 20.0001V24.6509H7.11233V10.0316H17.6108C17.757 10.0316 17.894 9.97223 17.9991 9.87172L19.8265 8.04431C20.1737 7.6971 19.927 7.10776 19.4382 7.10776H6.38137C5.17071 7.10776 4.18848 8.09 4.18848 9.30065V25.3819C4.18848 26.5925 5.17071 27.5747 6.38137 27.5747H22.4626C23.6732 27.5747 24.6555 26.5925 24.6555 25.3819V18.1727C24.6555 17.6839 24.0661 17.4418 23.7189 17.7844L21.8915 19.6118C21.791 19.7169 21.7316 19.8539 21.7316 20.0001Z"
        fill="white"
      />
    </svg>
  );
};

export default Write;
