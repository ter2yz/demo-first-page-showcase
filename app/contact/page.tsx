import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <ContactForm endpoint="/.netlify/functions/contact" />
    </main>
  );
}
