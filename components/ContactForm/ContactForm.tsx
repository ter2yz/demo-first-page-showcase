"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  formatAustralianMobile,
  smartRedirect,
  stripNonDigits,
} from "@/lib/utils";

import { ContactFormData, contactSchema } from "../../lib/validation";
import { FieldError } from "../FieldError";
import { FormLabel } from "./FormLabel";

export default function ContactForm({
  endpoint,
  thankYouUrl,
}: {
  endpoint: string;
  thankYouUrl: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const [formattedContactNumber, setFormattedContactNumber] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let cancelled = false;

    if (status === "success") {
      toast.success(message);
    }

    if (status === "error") {
      const undo = () => {
        cancelled = true;
        if (timer) clearTimeout(timer);
      };
      toast.error(
        () => (
          <div className="relative w-full">
            <p className="mb-2">{message} Redirecting in 5s...</p>
            <div className="animate-shrink h-2 w-full rounded-3xl bg-white"></div>
          </div>
        ),
        {
          classNames: {
            toast: "relative",
            content: "w-full",
            title: "w-full",
          },
          action: {
            label: "Undo",
            onClick: undo,
          },
        }
      );
      timer = setTimeout(() => {
        if (!cancelled) {
          smartRedirect(router, thankYouUrl);
        }
      }, 5000);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [status]);

  async function onSubmit(data: ContactFormData) {
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setMessage("Form submit successfully!");
        reset();
        setFormattedContactNumber("");
      } else {
        setStatus("error");
        setMessage(result.error || "Something went wrong.");
      }
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Unexpected error occurred.");
      }
    }
  }

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white px-6 pt-8 pb-6 shadow-[#454545/0.3] drop-shadow-lg xl:px-8 xl:pt-10 xl:pb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
        <div className="mb-6">
          <FormLabel htmlFor="firstName">First name*</FormLabel>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="Your first name"
            disabled={isSubmitting}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            onChange={(e) => {
              clearErrors("firstName");
              register("firstName").onChange(e);
            }}
          />
          <FieldError error={errors.firstName} id="firstName" />
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="email">Email*</FormLabel>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="name@example.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(e) => {
              clearErrors("email");
              register("email").onChange(e);
            }}
          />
          <FieldError error={errors.email} id="email" />
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="contactNumber">Best contact number*</FormLabel>
          <input
            id="contactNumber"
            type="text"
            value={formattedContactNumber}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="0400 000 000"
            disabled={isSubmitting}
            aria-invalid={!!errors.contactNumber}
            aria-describedby={
              errors.contactNumber ? "contactNumber-error" : undefined
            }
            onChange={(e) => {
              let raw = stripNonDigits(e.target.value);
              if (raw.length > 10) raw = raw.slice(0, 10);
              setFormattedContactNumber(formatAustralianMobile(raw));
              clearErrors("contactNumber");
              setValue("contactNumber", raw, { shouldValidate: false });
            }}
            onBlur={(e) => {
              register("contactNumber").onBlur(e);
            }}
          />
          <FieldError error={errors.contactNumber} id="contactNumber" />
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="companyWebsite">Company website</FormLabel>
          <input
            id="companyWebsite"
            type="url"
            {...register("companyWebsite")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="https://www.example.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.companyWebsite}
            aria-describedby={
              errors.companyWebsite ? "companyWebsite-error" : undefined
            }
            onChange={(e) => {
              clearErrors("companyWebsite");
              register("companyWebsite").onChange(e);
            }}
          />
          <FieldError error={errors.companyWebsite} id="companyWebsite" />
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="message">How can we help you?</FormLabel>
          <textarea
            id="message"
            {...register("message")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            rows={4}
            placeholder="Add message..."
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={(e) => {
              clearErrors("message");
              register("message").onChange(e);
            }}
          />
          <FieldError error={errors.message} id="message" />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-[#ff5254] px-6 py-[0.6875rem] text-sm font-extrabold text-white uppercase xl:text-base"
          disabled={isSubmitting}
          aria-label="Submit contact form to grow my business"
        >
          <span className="sr-only">
            Submit contact form to grow my business
          </span>
          <span aria-hidden="true">
            {status === "loading"
              ? "Sending..."
              : "yes, I want to grow my business"}
          </span>
        </button>
      </form>
    </div>
  );
}
