import React from "react";

type FieldErrorProps = {
  error?: { message?: string };
  id?: string;
};

export function FieldError({ error, id }: FieldErrorProps) {
  if (!error?.message) return null;
  return (
    <p className="text-xs text-red-600" id={id ? `${id}-error` : undefined}>
      {error.message}
    </p>
  );
}
