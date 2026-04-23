import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PrettyBits Cape Town" },
      { name: "description", content: "Get in touch with PrettyBits for custom resin art commissions, workshop bookings and enquiries." },
      { property: "og:title", content: "Contact PrettyBits" },
      { property: "og:description", content: "Get in touch for custom commissions and workshop bookings." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 text-center">
          <p className="font-script text-2xl text-primary">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance">
            We'd love to hear from you.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Custom commissions, workshop questions, or just want to say hi —
            our DMs are always open.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20 grid md:grid-cols-2 gap-6">
        {[
          { Icon: MessageCircle, label: "WhatsApp", value: "+27 83 441 1311", href: "https://wa.me/27834411311" },
          { Icon: Phone, label: "Phone", value: "+27 83 441 1311", href: "tel:+27834411311" },
          { Icon: Mail, label: "Email", value: "hello@prettybits.co.za", href: "mailto:hello@prettybits.co.za" },
          { Icon: Instagram, label: "Instagram", value: "@prettybits", href: "https://instagram.com" },
          { Icon: MapPin, label: "Studio", value: "Goodwood, Cape Town", href: "#" },
        ].map(({ Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex items-center gap-5 rounded-2xl border border-border bg-background p-6 hover:border-primary hover:shadow-soft transition-all"
          >
            <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-gradient-teal group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-lg font-semibold">{value}</p>
            </div>
          </a>
        ))}
      </section>
    </>
  );
}
