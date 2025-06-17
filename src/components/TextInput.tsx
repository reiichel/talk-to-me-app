import { useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  type?: string;
  name?: string;
  dir?: "rtl" | "ltr";
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  error = false,
  errorMessage,
  icon,
  type = "text",
  name,
  dir = "rtl",
}: Props) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full rounded-xl px-4 pt-5 pb-2 pr-10 text-white bg-[#0F2C3F] placeholder-transparent
          focus:outline-none transition-all
          ${
            error
              ? "border border-red-400"
              : "border border-transparent focus:border-[#FFFFFF]"
          }
        `}
        placeholder={placeholder}
      />

      <label
        className={`
    absolute right-4 transition-all text-gray-400 text-xs pointer-events-none 
    ${
      focused || hasValue
        ? "top-[2px] px-1 bg-[#0F2C3F] z-[1]"
        : "top-3.5 text-sm"
    }
    ${error ? "" : ""}
  `}
      >
        {placeholder}
      </label>

      {icon && (
        <div className="absolute left-4 top-4 text-white opacity-70">
          {icon}
        </div>
      )}

      <div className="min-h-[1.25rem] mt-1 px-1 text-center">
        {error && errorMessage && (
          <p className="text-xs text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
