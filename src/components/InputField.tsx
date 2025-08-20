import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

// Utility function for conditional classNames
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "small" | "medium" | "large";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
  theme?: "light" | "dark";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const variants = {
  filled: "bg-gray-100 dark:bg-gray-800 border-transparent focus:border-blue-500",
  outlined: "border border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-transparent",
  ghost: "border-b border-gray-300 dark:border-gray-600 focus:border-blue-500 bg-transparent rounded-none",
};

const sizes = {
  small: "px-2 py-1 text-sm rounded-lg",
  medium: "px-3 py-2 text-base rounded-xl",
  large: "px-4 py-3 text-lg rounded-2xl",
};

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  helperText,
  error,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "medium",
  type = "text",
  clearable,
  passwordToggle,
  theme = "light",
  value: propValue,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const inputValue = propValue ?? value;
  const inputType = passwordToggle && type === "password" && showPassword ? "text" : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={cn("w-full flex flex-col gap-1", theme === "dark" && "text-white")}>
      {label && <label className="text-sm font-medium mb-1">{label}</label>}
      <div className="relative w-full">
        <input
          type={inputType}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full transition-all duration-200 focus:outline-none",
            "placeholder-gray-400 dark:placeholder-gray-500",
            variants[variant],
            sizes[size],
            disabled && "opacity-50 cursor-not-allowed",
            invalid && "border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900",
            loading && "animate-pulse bg-gray-200 dark:bg-gray-700"
          )}
        />
        {clearable && inputValue && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        {passwordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {helperText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
