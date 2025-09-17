import ContactForm from "@/components/ContactForm";

export default function ContactShowcasePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Showcase (Error Demo)</h1>
      <ContactForm endpoint="/.netlify/functions/contact?forceError=true" />
    </main>
  );
}
