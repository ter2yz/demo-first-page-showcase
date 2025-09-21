export type { ContactFormData } from "@/lib/validation";

export interface ContactFormModeContextType {
  forceError: boolean;
  setForceError: (value: boolean) => void;
}

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}
