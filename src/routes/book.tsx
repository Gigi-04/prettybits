import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2, Sparkles } from "lucide-react";
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

const bookingSchema = z.object({
  workshop: z.string().min(1, "Please choose a workshop"),
  date: z.date({ required_error: "Please pick a date" }),
  guests: z.coerce.number().min(1).max(20),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().min(7, "Please enter a contact number").max(20),
  notes: z.string().max(500).optional(),
});

function BookPage() {
  const [workshop, setWorkshop] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState<null | { workshop: string; date: Date; guests: number; name: string }>(null);

  const selected = workshops.find((w) => w.id === workshop);
  const total = selected && selected.price > 0 ? selected.price * Number(guests || 1) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({
      workshop,
      date,
      guests,
      name,
      email,
      phone,
      notes,
    });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitted({
      workshop: selected?.name ?? "",
      date: result.data.date,
      guests: result.data.guests,
      name: result.data.name,
    });
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
          See you soon, {submitted.name.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          We've received your booking request for{" "}
          <strong className="text-foreground">{submitted.workshop}</strong> on{" "}
          <strong className="text-foreground">{format(submitted.date, "EEEE, d MMMM yyyy")}</strong>{" "}
          for {submitted.guests} {submitted.guests === 1 ? "person" : "people"}.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          A confirmation will follow via WhatsApp within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-8 rounded-full"
          onClick={() => {
            setSubmitted(null);
            setWorkshop("");
            setDate(undefined);
            setGuests("1");
            setName("");
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
            Tell us a bit about you and your group. We'll confirm your spot via WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 lg:px-10 py-16 grid lg:grid-cols-5 gap-10">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6 bg-background rounded-3xl border border-border p-8 lg:p-10 shadow-soft">
          <div>
            <Label htmlFor="workshop" className="mb-2 block">Workshop</Label>
            <Select value={workshop} onValueChange={setWorkshop}>
              <SelectTrigger id="workshop" className="h-12 rounded-xl">
                <SelectValue placeholder="Choose a workshop" />
              </SelectTrigger>
              <SelectContent>
                {workshops.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.name}
                    {w.price > 0 ? ` — R${w.price}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block">Preferred date</Label>
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

            <div>
              <Label htmlFor="guests" className="mb-2 block">Number of guests</Label>
              <Input
                id="guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="mb-2 block">Your name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl" placeholder="Jane Doe" />
            </div>
            <div>
              <Label htmlFor="phone" className="mb-2 block">WhatsApp number</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl" placeholder="+27 ..." />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl" placeholder="you@example.com" />
          </div>

          <div>
            <Label htmlFor="notes" className="mb-2 block">Anything else? <span className="text-muted-foreground font-normal">(Optional)</span></Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
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
                <div>
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Workshop</p>
                  <p className="mt-1 font-display text-xl font-semibold">{selected?.name ?? "Not selected"}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Date</p>
                    <p className="mt-1 font-medium">{date ? format(date, "PP") : "—"}</p>
                  </div>
                  <div>
                    <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">Guests</p>
                    <p className="mt-1 font-medium">{guests || 1}</p>
                  </div>
                </div>

                {selected && (
                  <div className="border-t border-primary-foreground/20 pt-5">
                    {total !== null ? (
                      <div className="flex items-end justify-between">
                        <span className="text-primary-foreground/70">Estimated total</span>
                        <span className="font-display text-3xl font-semibold">R{total.toLocaleString()}</span>
                      </div>
                    ) : (
                      <p className="text-primary-foreground/85">
                        Pricing on request — we'll confirm details based on your group size and preferences.
                      </p>
                    )}
                  </div>
                )}
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
