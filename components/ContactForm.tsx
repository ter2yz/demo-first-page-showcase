"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import {
  formatAustralianMobile,
  smartRedirect,
  stripNonDigits,
} from "@/lib/utils";

import { ContactFormData, contactSchema } from "../lib/validation";
import { FieldError } from "./FieldError";

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

  // Keep form and UI in sync when reset is called
  useEffect(() => {
    reset();
    setFormattedContactNumber("");
  }, [reset]);

  useEffect(() => {
    if (status === "error") {
      const timer = setTimeout(() => {
        smartRedirect(router, thankYouUrl);
      }, 2000);
      return () => clearTimeout(timer);
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
        setMessage("Message sent successfully!");
        reset();
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
          <label
            htmlFor="firstName"
            className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]"
          >
            First name*
          </label>
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
          <label
            htmlFor="email"
            className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]"
          >
            Email*
          </label>
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
          <label
            htmlFor="contactNumber"
            className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]"
          >
            Best contact number*
          </label>
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
          <label
            htmlFor="companyWebsite"
            className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]"
          >
            Company website
          </label>
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
          <label
            htmlFor="message"
            className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]"
          >
            How can we help you?
          </label>
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
          className="w-full rounded-lg bg-[#ff5254] px-6 py-[0.6875rem] text-sm font-extrabold text-white uppercase xl:text-base"
          disabled={isSubmitting}
          aria-label="Submit contact form to grow my business"
        >
          <span className="sr-only">
            Submit contact form to grow my business
          </span>
          <span aria-hidden="true">
            {status === "loading"
              ? "Sending..."
              : "yes, I WANT TO grow my business"}
          </span>
        </button>

        {status !== "idle" && (
          <p
            className={`mt-2 ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
            {status === "error" && " Redirecting..."}
          </p>
        )}
      </form>
    </div>
  );
}
