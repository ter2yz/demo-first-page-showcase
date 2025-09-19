"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  contactNumber: z.string().min(1, "Best contact number is required"),
  companyWebsite: z.url("Must be a valid URL").optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({
  endpoint,
  thankYouUrl = "/thank-you",
}: {
  endpoint: string;
  thankYouUrl?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  function smartRedirect(url: string) {
    try {
      const isExternal =
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("//");
      if (isExternal) {
        window.location.href = url; // 🔗 full reload for external site
      } else {
        router.push(url); // 🚀 client-side nav for internal route
      }
    } catch {
      window.location.href = url; // fallback
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (status === "error") {
      const timer = setTimeout(() => {
        smartRedirect(thankYouUrl);
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
          <label className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]">
            First name*
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]">
            Email*
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]">
            Best contact number*
          </label>
          <input
            type="text"
            {...register("contactNumber")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="0400 000 000"
          />
          {errors.contactNumber && (
            <p className="text-xs text-red-600">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]">
            Company website
          </label>
          <input
            type="url"
            {...register("companyWebsite")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            placeholder="https://www.example.com"
          />
          {errors.companyWebsite && (
            <p className="text-xs text-red-600">
              {errors.companyWebsite.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-1 block leading-[1.25rem] font-bold text-[#00225d]">
            How can we help you?
          </label>
          <textarea
            {...register("message")}
            className="w-full border border-[#d1d5dc] px-4 py-3 shadow-lg shadow-[#bbbbbb/0.6]"
            rows={4}
            placeholder="Add message..."
          />
          {errors.message && (
            <p className="text-xs text-red-600">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#ff5254] px-6 py-[0.6875rem] text-sm font-extrabold text-white uppercase xl:text-base"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Sending..."
            : "yes, I WANT TO grow my business"}
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
