import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
}

export default function PrimaryButton({
  children,
  onClick,
  type = 'submit',
  disabled = false,
  isLoading = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full flex items-center justify-center
        bg-accent text-white text-lg font-medium py-3 rounded-xl
        transition 
        ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
      `}
    >
      {isLoading ? (
        <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
}
