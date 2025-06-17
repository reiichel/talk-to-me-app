import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/slices/authSlice";
import { saveToken } from "@/lib/token";
import { login } from "@/services/authService";

import type { LoginResponse, LoginRequest } from "@/models/auth";

import TextInput from "@/components/TextInput";
import PasswordInput from "@/components/PasswordInput";
import PrimaryButton from "@/components/PrimaryButton";

export default function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  const mutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setToken(data.token));
      saveToken(data.token);
      navigate("/customers");
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, general: t("login.error") }));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!username) newErrors.username = t("requiredFields");
    if (!password) newErrors.password = t("requiredFields");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-[#031627] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        <img src="/logo.png" alt="logo" className="h-24" />
        <h2 className="text-white text-lg font-medium">{t("login.title")}</h2>

        <TextInput
          value={username}
          onChange={(val) => {
            setUsername(val);
            if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
          }}
          placeholder={t("login.username")}
          errorMessage={errors.username}
          error={!!errors.username}
        />

        <PasswordInput
          value={password}
          onChange={(val) => {
            setPassword(val);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          errorMessage={errors.password}
          error={!!errors.password}
        />

        {errors.general && (
          <div className="text-red-500 text-sm text-center">{errors.general}</div>
        )}

        <PrimaryButton disabled={mutation.isPending} isLoading={mutation.isPending}>
          {mutation.isPending ? t("loading") : t("submit")}
        </PrimaryButton>
      </form>
    </div>
  );
}
