"use client";

import ContactForm from "@/components/ContactForm";
import { useContactFormMode } from "@/components/ContactForm";
import { Switch } from "@/components/ui/switch";

import {
  CONTACT_FORM_ENDPOINT,
  CONTACT_FORM_THANK_YOU_URL,
} from "../constants";

export function ContactFormSection() {
  const { forceError, setForceError } = useContactFormMode();

  return (
    <>
      <div className="fixed top-10 right-10 z-20 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex flex-col">
          <label
            htmlFor="forceErrorToggle"
            className="font-sans text-sm font-bold text-zinc-900 uppercase"
          >
            Force API Error
          </label>
          <p className="max-w-[200px] text-xs text-zinc-600">
            Toggle to simulate an API error for demo and error handling
            showcase.
          </p>
        </div>
        <Switch
          id="forceErrorToggle"
          checked={forceError}
          onCheckedChange={setForceError}
          className="data-[state=checked]:bg-red-600"
        />
      </div>
      <div className="w-full flex-none xl:w-md">
        <ContactForm
          endpoint={
            forceError
              ? `${CONTACT_FORM_ENDPOINT}?forceError=true`
              : CONTACT_FORM_ENDPOINT
          }
          thankYouUrl={CONTACT_FORM_THANK_YOU_URL}
        />
      </div>
    </>
  );
}
