import Image from "next/image";

import TeamMemberImage from "@/assets/img_elise-n-dan.png";
import FrankBodyImage from "@/assets/img_frank-body.jpg";
import ContactForm from "@/components/ContactForm";
import GoogleMap from "@/components/Map";

import { CONTACT_FORM_ENDPOINT, CONTACT_FORM_THANK_YOU_URL } from "./constants";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-linear-to-bl from-[#417EDF] to-[#3B70BD] pt-32 xl:pt-56">
      <div className="relative container mx-auto max-w-[70rem] xl:pb-20">
        <header className="relative z-10 mb-10 flex w-full flex-col items-center px-4 xl:mb-16 xl:px-0">
          <h1 className="mb-4 text-left text-[2.125rem] leading-[2.125rem] font-bold text-white xl:text-center xl:text-[3.25rem] xl:leading-[3.25rem]">
            Find out how we can grow your revenue!
          </h1>
          <p className="text-left text-[1.125rem] leading-[1.625rem] text-white xl:text-center xl:text-[1.25rem]">
            Please enter your details below &amp; we&apos;ll get back to you
            within <b>1 business day</b>.
          </p>
        </header>
        <section className="relative z-10 flex w-full flex-col gap-10 px-4 xl:flex-row xl:gap-20 xl:px-0">
          <div className="w-full flex-none xl:w-md">
            <ContactForm
              endpoint={CONTACT_FORM_ENDPOINT}
              thankYouUrl={CONTACT_FORM_THANK_YOU_URL}
            />
          </div>
          <figure className="w-full flex-auto pt-4">
            <blockquote className="text-[1.625rem] xl:text-3xl">
              <p className="mb-5 leading-10 font-semibold text-white italic">
                <span className="text-[2.875rem]">&#34;</span>First Page nailed
                our brief and executed a strategy that was aligned with our
                goals.&#34;
              </p>
              <p className="mb-5">⭐️ ⭐ ⭐ ⭐ ⭐</p>
            </blockquote>
            <figcaption className="mb-5">
              <p className="text-2xl leading-6 font-extrabold text-white">
                Jess Hatzis
              </p>
              <p className="text-lg leading-6 font-normal text-white">
                Co-founder
              </p>
            </figcaption>
            <Image
              src={FrankBodyImage}
              alt="placeholder alt message"
              className="w-32 xl:w-48"
            />
          </figure>
        </section>
        <aside
          className="z-0 pt-16 xl:absolute xl:-right-36 xl:bottom-0 xl:pt-0"
          aria-hidden="true"
        >
          <Image
            src={TeamMemberImage}
            alt="First Page team members Elise and Dan"
            className="w-full origin-top scale-120 xl:w-[740px] xl:scale-100"
          />
        </aside>
      </div>
      <div className="w-full bg-white">
        <GoogleMap
          key="firstPage"
          center={{ lat: -37.8327787, lng: 144.996298 }}
          zoom={15}
        />
      </div>
    </main>
  );
}
