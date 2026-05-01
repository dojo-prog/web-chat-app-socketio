import { Loader2Icon } from "lucide-react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyles?: string;
}

const CustomButton = ({
  type = "button",
  title,
  onClick,
  disabled = false,
  loading = false,
  buttonStyles,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-10 w-full px-4 bg-blue-500 text-white text-sm font-semibold capitalize rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center cursor-pointer ${buttonStyles}`}
    >
      {!loading ? title : <Loader2Icon className="h-full animate-spin" />}
    </button>
  );
};

export default CustomButton;
