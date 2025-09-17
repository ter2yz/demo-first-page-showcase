"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  contactNumber: z.string().min(1, "Best contact number is required"),
  companyWebsite: z.url("Must be a valid URL").optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

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
        window.location.href = "https://firstpage.com.au/thank-you/";
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md"
      noValidate
    >
      <div>
        <label className="block font-medium">First name*</label>
        <input
          type="text"
          {...register("firstName")}
          className="w-full border p-2"
        />
        {errors.firstName && (
          <p className="text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Email*</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Best contact number*</label>
        <input
          type="text"
          {...register("contactNumber")}
          className="w-full border p-2"
        />
        {errors.contactNumber && (
          <p className="text-red-600">{errors.contactNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Company website</label>
        <input
          type="url"
          {...register("companyWebsite")}
          className="w-full border p-2"
        />
        {errors.companyWebsite && (
          <p className="text-red-600">{errors.companyWebsite.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">How can we help you?</label>
        <textarea
          {...register("message")}
          className="w-full border p-2"
          rows={4}
        />
        {errors.message && (
          <p className="text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send"}
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
  );
}
