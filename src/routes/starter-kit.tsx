import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Package, Plus, Minus } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import starterKitImg from "@/assets/starter-kit.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/starter-kit")({
  head: () => ({
    meta: [
      { title: "Resin Starter Kit — PrettyBits" },
      { name: "description", content: "Build your own PrettyBits resin starter kit — pick your item, your colours and a glitter." },
      { property: "og:title", content: "Resin Starter Kit — PrettyBits" },
      { property: "og:description", content: "Pick your item, two colours and a glitter to start your resin journey at home." },
    ],
  }),
  component: StarterKitPage,
});

const items = [
  { id: "coaster", label: "Coaster set (×2)", price: 450, desc: "Two round silicone moulds + base resin" },
  { id: "tray", label: "Trinket tray", price: 550, desc: "One rectangular mould + base resin" },
  { id: "keychain", label: "Keychain set", price: 350, desc: "Three small moulds + hardware" },
  { id: "ornament", label: "Hanging ornament", price: 420, desc: "Festive shapes + hanging cord" },
];

const colours = [
  { id: "blush", label: "Blush", hex: "oklch(0.85 0.06 20)" },
  { id: "rose", label: "Dusty Rose", hex: "oklch(0.72 0.1 15)" },
  { id: "terracotta", label: "Terracotta", hex: "oklch(0.6 0.12 40)" },
  { id: "sand", label: "Sand", hex: "oklch(0.88 0.04 80)" },
  { id: "mustard", label: "Mustard", hex: "oklch(0.78 0.13 85)" },
  { id: "sage", label: "Sage", hex: "oklch(0.78 0.06 145)" },
  { id: "forest", label: "Forest", hex: "oklch(0.42 0.08 155)" },
  { id: "teal", label: "Teal", hex: "oklch(0.62 0.11 195)" },
  { id: "ocean", label: "Ocean", hex: "oklch(0.5 0.12 235)" },
  { id: "midnight", label: "Midnight", hex: "oklch(0.32 0.08 260)" },
  { id: "lavender", label: "Lavender", hex: "oklch(0.78 0.07 295)" },
  { id: "pearl", label: "Pearl White", hex: "oklch(0.96 0.005 95)" },
  { id: "charcoal", label: "Charcoal", hex: "oklch(0.32 0.01 240)" },
  { id: "gold", label: "Gold Pigment", hex: "oklch(0.78 0.12 80)" },
];

const glitters = [
  { id: "none", label: "No glitter" },
  { id: "gold", label: "Gold flake" },
  { id: "silver", label: "Silver shimmer" },
  { id: "rose", label: "Rose gold" },
  { id: "iridescent", label: "Iridescent" },
  { id: "holographic", label: "Holographic" },
];

const EXTRA_COLOUR_PRICE = 45;

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().min(7, "Please enter a contact number").max(20),
  address: z.string().trim().min(10, "Please enter a delivery address").max(300),
  notes: z.string().max(500).optional(),
});

function StarterKitPage() {
  const [item, setItem] = useState("coaster");
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [glitter, setGlitter] = useState("none");
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedItem = items.find((i) => i.id === item);
  const extraCount = Math.max(0, selectedColours.length - 2);
  const subtotal = selectedItem ? selectedItem.price : 0;
  const extras = extraCount * EXTRA_COLOUR_PRICE;
  const total = (subtotal + extras) * qty;

  const toggleColour = (id: string) => {
    setSelectedColours((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedColours.length < 2) {
      toast.error("Please pick at least 2 colours");
      return;
    }
    const result = detailsSchema.safeParse({ name, email, phone, address, notes });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitted(true);
    toast.success("Order received!", {
      description: "We'll confirm via WhatsApp and arrange delivery.",
    });
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-teal flex items-center justify-center text-primary-foreground">
          <Check className="h-10 w-10" />
        </div>
        <p className="mt-6 font-script text-2xl text-primary">Order placed</p>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-balance">
          Your kit is on its way, {name.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          We've received your order for {qty} × <strong className="text-foreground">{selectedItem?.label}</strong> kit
          {qty > 1 ? "s" : ""} — total <strong className="text-foreground">R{total.toLocaleString()}</strong>.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Payment & delivery details follow on WhatsApp within a few hours.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="font-script text-2xl text-primary">Make at home</p>
            <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance">
              Build your starter kit.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Pick the project, choose your colours and a glitter — we pack everything you need and ship it to your door.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-teal opacity-20 blur-3xl rounded-full" />
            <img
              src={starterKitImg}
              alt="PrettyBits resin starter kit with bottles, pigments, glitter, gloves and moulds"
              width={1920}
              height={1080}
              className="relative rounded-3xl shadow-elevated w-full h-auto object-cover aspect-16/10"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-10">
          {/* ITEM */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-7 w-7 rounded-full bg-gradient-teal text-primary-foreground text-xs font-semibold flex items-center justify-center">1</span>
              <h2 className="font-display text-xl font-semibold">Choose your project</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">All kits include resin, hardener, gloves, mixing cups and instructions.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((i) => {
                const active = item === i.id;
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => setItem(i.id)}
                    className={cn(
                      "text-left rounded-2xl border-2 p-4 transition-all",
                      active
                        ? "border-primary bg-secondary/40 shadow-soft"
                        : "border-border hover:border-primary/40",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{i.label}</p>
                      <span className="text-sm font-semibold text-primary">R{i.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{i.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLOURS */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-7 w-7 rounded-full bg-gradient-teal text-primary-foreground text-xs font-semibold flex items-center justify-center">2</span>
              <h2 className="font-display text-xl font-semibold">Pick your colours</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">
              Two colours included free. Extra colours add <strong className="text-foreground">R{EXTRA_COLOUR_PRICE}</strong> each.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {colours.map((c) => {
                const active = selectedColours.includes(c.id);
                const idx = selectedColours.indexOf(c.id);
                const isExtra = idx >= 2;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleColour(c.id)}
                    className={cn(
                      "group relative rounded-2xl border-2 p-3 transition-all text-left",
                      active
                        ? "border-primary bg-secondary/40 shadow-soft"
                        : "border-border hover:border-primary/40",
                    )}
                  >
                    <div
                      className="h-12 w-full rounded-xl border border-border/40"
                      style={{ background: c.hex }}
                    />
                    <p className="mt-2 text-xs font-medium truncate">{c.label}</p>
                    {active && (
                      <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                    )}
                    {isExtra && (
                      <p className="text-[10px] text-accent-foreground/70 font-medium mt-0.5">+R{EXTRA_COLOUR_PRICE}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GLITTER */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-7 w-7 rounded-full bg-gradient-teal text-primary-foreground text-xs font-semibold flex items-center justify-center">3</span>
              <h2 className="font-display text-xl font-semibold">Add a glitter</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5 ml-9">One glitter included with every kit.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {glitters.map((g) => {
                const active = glitter === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGlitter(g.id)}
                    className={cn(
                      "rounded-2xl border-2 p-3 text-sm transition-all",
                      active
                        ? "border-primary bg-secondary/40 shadow-soft"
                        : "border-border hover:border-primary/40",
                    )}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DELIVERY */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft space-y-5">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-full bg-gradient-teal text-primary-foreground text-xs font-semibold flex items-center justify-center">4</span>
              <h2 className="font-display text-xl font-semibold">Delivery details</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="kname" className="mb-2 block">Your name</Label>
                <Input id="kname" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="kphone" className="mb-2 block">WhatsApp number</Label>
                <Input id="kphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" placeholder="+27 ..." />
              </div>
            </div>
            <div>
              <Label htmlFor="kemail" className="mb-2 block">Email</Label>
              <Input id="kemail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="kaddress" className="mb-2 block">Delivery address</Label>
              <Textarea id="kaddress" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="rounded-xl resize-none" />
            </div>
            <div>
              <Label htmlFor="knotes" className="mb-2 block">Notes <span className="text-muted-foreground font-normal">(optional)</span></Label>
              <Textarea id="knotes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="rounded-xl resize-none" />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-teal text-primary-foreground hover:opacity-95 shadow-soft text-base"
            >
              Place order — R{total.toLocaleString()}
            </Button>
          </div>
        </form>

        {/* SUMMARY */}
        <aside className="lg:col-span-2">
          <div className="sticky top-28 rounded-3xl bg-gradient-teal text-primary-foreground p-8 shadow-elevated overflow-hidden ">
            <div className="absolute inset-0 bg-gradient-shine opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="h-4 w-4" />
                <span className="font-script text-xl">Your kit</span>
              </div>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Project</p>
                  <p className="mt-1 font-display text-xl font-semibold">{selectedItem?.label}</p>
                </div>

                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-2">Colours ({selectedColours.length})</p>
                  {selectedColours.length === 0 ? (
                    <p className="text-primary-foreground/80 text-xs italic">None selected yet</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedColours.map((id, i) => {
                        const c = colours.find((x) => x.id === id);
                        if (!c) return null;
                        return (
                          <div key={id} className="flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur rounded-full pl-1 pr-2.5 py-1">
                            <span className="h-4 w-4 rounded-full border border-primary-foreground/30" style={{ background: c.hex }} />
                            <span className="text-xs">{c.label}{i >= 2 ? " +" : ""}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Glitter</p>
                  <p className="mt-1 font-medium">{glitters.find((g) => g.id === glitter)?.label}</p>
                </div>

                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-2">Quantity</p>
                  <div className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur rounded-full p-1">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-8 w-8 rounded-full hover:bg-primary-foreground/10 flex items-center justify-center" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-medium w-6 text-center">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} className="h-8 w-8 rounded-full hover:bg-primary-foreground/10 flex items-center justify-center" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-primary-foreground/20 pt-5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-primary-foreground/85">
                    <span>Kit ({selectedItem?.label})</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  {extras > 0 && (
                    <div className="flex justify-between text-primary-foreground/85">
                      <span>Extra colours ({extraCount} × R{EXTRA_COLOUR_PRICE})</span>
                      <span>R{extras.toLocaleString()}</span>
                    </div>
                  )}
                  {qty > 1 && (
                    <div className="flex justify-between text-primary-foreground/85">
                      <span>× {qty} kits</span>
                      <span></span>
                    </div>
                  )}
                  <div className="flex items-end justify-between pt-2">
                    <span className="text-primary-foreground/70">Total</span>
                    <span className="font-display text-3xl font-semibold">R{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-primary-foreground/10 backdrop-blur p-4 text-xs text-primary-foreground/85 leading-relaxed flex gap-2">
                <Package className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Ships within 3–5 working days. Courier countrywide.</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
