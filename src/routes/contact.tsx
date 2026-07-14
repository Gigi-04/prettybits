import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fields, setFields] = useState({ name: "", email: "", enquiry_type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "Please enter your name.";
    if (!fields.email.trim()) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Please enter a valid email address.";
    if (!fields.enquiry_type) e.enquiry_type = "Please select an enquiry type.";
    if (!fields.message.trim()) e.message = "Please enter a message.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        setFields({ name: "", email: "", enquiry_type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 text-center">
          <p className="font-script text-5xl text-primary">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance">
            We'd love to hear from you.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Custom commissions, workshop questions, or just want to say hi —
            our DMs are always open.
          </p>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-20">
        <div className="rounded-2xl border border-border bg-background p-8 lg:p-10">

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="h-7 w-7 text-green-600" />
              </div>
              <h2 className="font-display text-3xl font-semibold">Thank you!</h2>
              <p className="text-muted-foreground max-w-sm">
                Your message has been sent. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 rounded-xl border border-border px-6 py-3 text-sm font-medium hover:border-primary transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-3xl font-semibold">Send us a message</h2>
              <p className="mt-2 text-muted-foreground">
                Fill in the form and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
                <input type="hidden" name="access_key" value="332344e9-3efb-48b7-93c5-bf1396959947" />
                <input type="hidden" name="subject" value="New enquiry from PrettyBits website" />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className={`rounded-xl border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.name ? "border-red-400" : "border-border"}`}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={e => setFields(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className={`rounded-xl border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.email ? "border-red-400" : "border-border"}`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Enquiry Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">
                    What are you enquiring about? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="enquiry_type"
                    value={fields.enquiry_type}
                    onChange={e => setFields(f => ({ ...f, enquiry_type: e.target.value }))}
                    className={`rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.enquiry_type ? "border-red-400" : "border-border"}`}
                  >
                    <option value="">Select an option</option>
                    <option value="Custom Commission">Custom Commission</option>
                    <option value="Workshop Booking">Workshop Booking</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.enquiry_type && <p className="text-xs text-red-500">{errors.enquiry_type}</p>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
                    rows={5}
                    placeholder="Tell us what you have in mind..."
                    className={`rounded-xl border px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none ${errors.message ? "border-red-400" : "border-border"}`}
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 rounded-xl bg-primary px-6 py-3 font-display font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>

                {status === "error" && (
                  <p className="text-center text-sm text-red-500 font-medium">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* Contact Cards
      <section className="mx-auto max-w-5xl px-6 lg:px-10 pb-24 grid md:grid-cols-2 gap-6">
        {[
          { Icon: MessageCircle, label: "WhatsApp", value: "+27 83 441 1311", href: "https://wa.me/27834411311" },
          { Icon: Phone, label: "Phone", value: "+27 83 441 1311", href: "tel:+27834411311" },
          { Icon: Mail, label: "Email", value: "faatimah@prettybits.co.za", href: "mailto:faatimah@prettybits.co.za" },
          { Icon: Instagram, label: "Instagram", value: "@prettybitsct", href: "https://instagram.com/prettybitsct" },
          { Icon: MapPin, label: "Location", value: "Goodwood, Cape Town", href: "#" },
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
      </section> */}
    </>
  );
}