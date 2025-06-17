import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextInput from "./TextInput";

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function PasswordInput({
  value,
  onChange,
  error = false,
  errorMessage,
}: Props) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <TextInput
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={t("login.password") + '*'}
        error={error}
        icon={
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {show ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24m1.43-1.43A6 6 0 005.7 5.7m2.17 2.17A9.96 9.96 0 012 12c2 3.5 5.33 6 10 6 1.77 0 3.44-.42 4.93-1.17"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              )}
            </svg>
          </button>
        }
      />
      {error && errorMessage && (
        <div className="text-red-400 text-xs text-center mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
