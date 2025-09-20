import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-800 p-8 pb-20 font-sans sm:p-20">
      <div className="container mx-auto max-w-xl">
        <h1 className="mb-4 text-4xl font-bold text-zinc-100">
          FirstPage Interview Assessment
        </h1>
        <p className="mb-8 max-w-xl text-lg text-zinc-50">
          This app is a technical assessment for FirstPage. It demonstrates a
          contact form with validation, Google Maps integration, and error
          handling. Use the buttons below to explore the two demo pages:
        </p>
        <div className="mb-8 flex gap-4">
          <Link href="/contact">
            <button className="cursor-pointer rounded bg-zinc-900 px-6 py-3 font-bold text-white transition hover:bg-zinc-900/80">
              Contact Page
            </button>
          </Link>
          <Link href="/contact-error-sc">
            <button className="cursor-pointer rounded bg-[#ff5254] px-6 py-3 font-bold text-white transition hover:bg-[#ff5254]/80">
              Contact Error Showcase
            </button>
          </Link>
        </div>
        <ul className="list-disc pl-6 text-base text-zinc-50">
          <li className="mb-4">
            <b>Contact Page</b>
            <br />
            Standard contact form with validation and success flow.
          </li>
          <li>
            <b>Contact Error Showcase</b>
            <br /> Demonstrates error handling by forcing the API to return an
            error, so you can see how the UI responds to server-side failures.
          </li>
        </ul>
      </div>
    </div>
  );
}
