"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import type { ContactFormModeContextType } from "./types";

const LOCAL_STORAGE_KEY = "contactFormForceError";

const ContactFormModeContext = createContext<
  ContactFormModeContextType | undefined
>(undefined);

export function useContactFormMode() {
  const ctx = useContext(ContactFormModeContext);
  if (!ctx)
    throw new Error(
      "useContactFormMode must be used within ContactFormModeProvider"
    );
  return ctx;
}

export function ContactFormModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [forceError, setForceErrorState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored !== null) setForceErrorState(stored === "true");
  }, []);

  const setForceError = (value: boolean) => {
    setForceErrorState(value);
    localStorage.setItem(LOCAL_STORAGE_KEY, value ? "true" : "false");
  };

  return (
    <ContactFormModeContext.Provider value={{ forceError, setForceError }}>
      {children}
    </ContactFormModeContext.Provider>
  );
}
