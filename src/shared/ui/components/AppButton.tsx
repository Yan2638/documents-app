import { Button } from "antd";
import type { ButtonProps } from "antd";

interface AppButtonProps extends ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function AppButton({ text, onClick, className = "", ...props }: AppButtonProps) {
  return (
    <Button
      {...props}
      type="text"
      onClick={onClick}
      className={`
        !bg-[var(--primary-color)]
        !text-white
        font-semibold
        rounded-lg
        px-6
        py-3
        transition
        hover:!bg-[var(--primary-color--heavy)]
        focus:!outline-none
        focus-visible:!outline-none
        focus:!ring-0
        focus-visible:!ring-0
        focus:!shadow-none
        focus-visible:!shadow-none
        ${className}
      `}
      style={{
        border: 'none',
        boxShadow: 'none',
      }}
    >
      {text}
    </Button>
  );
}
