import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Sparkles, Plus, Minus, User } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Workshop — PrettyBits" },
      { name: "description", content: "Reserve your spot at a PrettyBits resin art workshop in Cape Town." },
      { property: "og:title", content: "Book a Workshop — PrettyBits" },
      { property: "og:description", content: "Reserve your spot at a PrettyBits resin art workshop." },
    ],
  }),
  component: BookPage,
});

const workshops = [
  { id: "coaster-bookmark", name: "Coaster & Bookmark", price: 290 },
  { id: "trinket-tray", name: "Trinket Tray & Coaster (Cement)", price: 390 },
  { id: "coasters-2", name: "Resin Coasters ×2", price: 490 },
  { id: "canvas", name: "Resin on Canvas", price: 590 },
  { id: "cheeseboard", name: "Cheeseboard", price: 690 },
  { id: "side-table-30", name: "Side Table 30cm", price: 690 },
  { id: "tray", name: "Tray", price: 790 },
  { id: "cake-stand", name: "Cake Stand", price: 790 },
  { id: "side-table-40", name: "Side Table 40cm", price: 790 },
  { id: "river-board-l", name: "River Serving Board 600×400mm", price: 3390 },
  { id: "river-board-s", name: "River Serving Board 400×300mm", price: 1990 },
  { id: "river-table", name: "Round River Side Table 400mm", price: 1890 },
  { id: "3day-course", name: "3 Day Resin Course", price: 0 },
  { id: "private", name: "Private / Team Building (enquire)", price: 0 },
];

type Guest = { name: string; workshop: string };

const guestSchema = z.object({
  name: z.string().trim().min(2, "Each guest needs a name").max(80),
  workshop: z.string().min(1, "Each guest needs a workshop"),
});

const bookingSchema = z.object({
  date: z.date({ required_error: "Please pick a date" }),
  guests: z.array(guestSchema).min(1, "At least 1 guest required"),
  contactName: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().min(7, "Please enter a contact number").max(20),
  notes: z.string().max(500).optional(),
});

function BookPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState<Guest[]>([{ name: "", workshop: "" }]);
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState<null | { date: Date; guests: Guest[]; contactName: string }>(null);

  const updateGuest = (idx: number, patch: Partial<Guest>) => {
    setGuests((g) => g.map((x, i) => (i === idx ? { ...x, ...patch } : x)));
  };

  const addGuest = () => {
    if (guests.length >= 20) return;
    setGuests((g) => [...g, { name: "", workshop: "" }]);
  };

  const removeGuest = (idx: number) => {
    if (guests.length <= 1) return;
    setGuests((g) => g.filter((_, i) => i !== idx));
  };

  const total = guests.reduce((sum, g) => {
    const w = workshops.find((x) => x.id === g.workshop);
    return sum + (w?.price ?? 0);
  }, 0);
  const hasOnRequest = guests.some((g) => {
    const w = workshops.find((x) => x.id === g.workshop);
    return w && w.price === 0;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({
      date,
      guests,
      contactName,
      email,
      phone,
      notes,
    });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitted({ date: result.data.date, guests, contactName });
    toast.success("Booking request received!", {
      description: "We'll be in touch on WhatsApp shortly to confirm.",
    });
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-teal flex items-center justify-center text-primary-foreground">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-6 font-script text-2xl text-primary">All booked!</p>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-balance">
          See you soon, {submitted.contactName.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          We've received your booking for{" "}
          <strong className="text-foreground">{submitted.guests.length}</strong>{" "}
          {submitted.guests.length === 1 ? "person" : "people"} on{" "}
          <strong className="text-foreground">{format(submitted.date, "EEEE, d MMMM yyyy")}</strong>.
        </p>
        <ul className="mt-6 text-sm text-left max-w-sm mx-auto space-y-2 bg-secondary/40 rounded-2xl p-5">
          {submitted.guests.map((g, i) => {
            const w = workshops.find((x) => x.id === g.workshop);
            return (
              <li key={i} className="flex justify-between gap-4">
                <span className="text-foreground font-medium">{g.name}</span>
                <span className="text-muted-foreground text-right">{w?.name}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          A confirmation will follow via WhatsApp within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-8 rounded-full"
          onClick={() => {
            setSubmitted(null);
            setDate(undefined);
            setGuests([{ name: "", workshop: "" }]);
            setContactName("");
            setEmail("");
            setPhone("");
            setNotes("");
          }}
        >
          Make another booking
        </Button>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20 text-center">
          <p className="font-script text-2xl text-primary">Book your spot</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance">
            Reserve your workshop.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Coming as a group? Each guest can pick their own piece — we'll set up everything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {/* Date */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft">
            <h2 className="font-display text-xl font-semibold mb-4">Pick a date</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full h-12 rounded-xl justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display text-xl font-semibold">Guests</h2>
              <span className="text-sm text-muted-foreground">{guests.length} {guests.length === 1 ? "person" : "people"}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">Each guest can choose their own workshop item.</p>

            <div className="space-y-4">
              {guests.map((g, i) => (
                <div key={i} className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <div className="h-7 w-7 rounded-full bg-gradient-teal text-primary-foreground flex items-center justify-center">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      Guest {i + 1}
                    </div>
                    {guests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGuest(i)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`guest-name-${i}`} className="mb-1.5 block text-xs">Name</Label>
                      <Input
                        id={`guest-name-${i}`}
                        value={g.name}
                        onChange={(e) => updateGuest(i, { name: e.target.value })}
                        className="h-10 rounded-xl bg-background"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`guest-workshop-${i}`} className="mb-1.5 block text-xs">Workshop choice</Label>
                      <Select
                        value={g.workshop}
                        onValueChange={(v) => updateGuest(i, { workshop: v })}
                      >
                        <SelectTrigger id={`guest-workshop-${i}`} className="h-10 rounded-xl bg-background">
                          <SelectValue placeholder="Choose item" />
                        </SelectTrigger>
                        <SelectContent>
                          {workshops.map((w) => (
                            <SelectItem key={w.id} value={w.id}>
                              {w.name}{w.price > 0 ? ` — R${w.price}` : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={addGuest}
                disabled={guests.length >= 20}
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-1.5" /> Add another guest
              </Button>
              {guests.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeGuest(guests.length - 1)}
                  className="rounded-full"
                >
                  <Minus className="h-4 w-4 mr-1.5" /> Remove last
                </Button>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-background rounded-3xl border border-border p-8 shadow-soft space-y-5">
            <h2 className="font-display text-xl font-semibold">Your contact details</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="cname" className="mb-2 block">Your name</Label>
                <Input id="cname" value={contactName} onChange={(e) => setContactName(e.target.value)} className="h-11 rounded-xl" placeholder="Jane Doe" />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2 block">WhatsApp number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" placeholder="+27 ..." />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="mb-2 block">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" placeholder="you@example.com" />
            </div>

            <div>
              <Label htmlFor="notes" className="mb-2 block">Anything else? <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="rounded-xl resize-none"
                placeholder="Special occasions, colour preferences, accessibility needs..."
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-teal text-primary-foreground hover:opacity-95 shadow-soft hover:shadow-elevated transition-all text-base"
            >
              Request Booking
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              This is a request — we'll confirm availability before charging anything.
            </p>
          </div>
        </form>

        {/* SUMMARY */}
        <aside className="lg:col-span-2">
          <div className="sticky top-28 rounded-3xl bg-gradient-teal text-primary-foreground p-8 shadow-elevated overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-shine opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="h-4 w-4" />
                <span className="font-script text-xl">Your booking</span>
              </div>

              <div className="mt-6 space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Date</p>
                    <p className="mt-1 font-medium">{date ? format(date, "PP") : "—"}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Guests</p>
                    <p className="mt-1 font-medium">{guests.length}</p>
                  </div>
                </div>

                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider mb-2">Workshops</p>
                  <ul className="space-y-2">
                    {guests.map((g, i) => {
                      const w = workshops.find((x) => x.id === g.workshop);
                      return (
                        <li key={i} className="flex items-start justify-between gap-3 text-sm border-b border-primary-foreground/15 pb-2 last:border-0">
                          <div className="min-w-0">
                            <p className="font-medium truncate">{g.name || `Guest ${i + 1}`}</p>
                            <p className="text-primary-foreground/70 text-xs truncate">{w?.name ?? "Not chosen"}</p>
                          </div>
                          <span className="shrink-0 text-sm">
                            {w && w.price > 0 ? `R${w.price}` : w ? "On request" : "—"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="border-t border-primary-foreground/20 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-primary-foreground/70">Estimated total</span>
                    <span className="font-display text-3xl font-semibold">R{total.toLocaleString()}</span>
                  </div>
                  {hasOnRequest && (
                    <p className="mt-2 text-xs text-primary-foreground/75">
                      Some items are priced on request — final quote follows.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-primary-foreground/10 backdrop-blur p-4 text-xs text-primary-foreground/85 leading-relaxed">
                All materials included. Cured pieces ready for collection the following week.
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
