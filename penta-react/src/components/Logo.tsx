type LogoProps = {
  className?: string;
  size?: number;
  variant?: "dark" | "light";
};

export default function Logo({
  className,
  size = 40,
  variant = "dark",
}: LogoProps) {
  return (
    <img
      src={variant === "light" ? "/logo-mark-light.png" : "/logo-mark-dark.png"}
      width={size}
      height={size}
      className={className}
      alt="Penta Cipher"
      draggable={false}
    />
  );
}
