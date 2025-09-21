import React from "react";

import { cn } from "@/lib/utils";

import { FormLabelProps } from "./types";

export function FormLabel({ children, className, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        "mb-1 block leading-[1.25rem] font-bold text-[#00225d]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
