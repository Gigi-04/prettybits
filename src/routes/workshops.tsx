import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Users, AlertCircle } from "lucide-react";
import workshopImg from "@/assets/workshop-pour.jpg";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Resin Workshops — PrettyBits Cape Town" },
      { name: "description", content: "Beginner-friendly resin art workshops in Cape Town. Coasters, cheeseboards, river tables, 3-day intensives and private sessions." },
      { property: "og:title", content: "Resin Workshops — PrettyBits" },
      { property: "og:description", content: "Hands-on, beginner-friendly resin workshops. All materials provided." },
      { property: "og:image", content: workshopImg },
    ],
  }),
  component: WorkshopsPage,
});

const standardWorkshops = [
  { name: "Coaster & Bookmark", price: 290 },
  { name: "Trinket Tray & Coaster (Cement)", price: 390 },
  { name: "Resin Coasters ×2", price: 490 },
  { name: "Resin on Canvas", price: 590 },
  { name: "Cheeseboard", price: 690 },
  { name: "Side Table 30cm", price: 690 },
  { name: "Tray", price: 790 },
  { name: "Cake Stand", price: 790 },
  { name: "Side Table 40cm", price: 790 },
];

const riverTableWorkshops = [
  { name: "Serving Board 600 × 400mm", price: 3390 },
  { name: "Serving Board 400 × 300mm", price: 1990 },
  { name: "Round Side Table 400mm Ø", price: 1890 },
];

function WorkshopsPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 text-center">
          <p className="font-script text-2xl text-primary">Workshops</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance max-w-3xl mx-auto">
            Learn the art of resin in a fun, supportive space.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Beginner friendly, no prior experience needed. All materials are
            provided — just bring yourself and your creative energy. Workshops
            run on weekends at our studio in Goodwood, Cape Town.
          </p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { Icon: Clock, title: "About 2 hours", text: "Most weekend workshops run for around two hours from start to finish." },
            { Icon: Check, title: "All materials included", text: "Resin, pigments, moulds and protective equipment — all provided." },
            { Icon: Users, title: "Small groups", text: "Intimate, supportive setting where everyone gets one-on-one guidance." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border p-8 bg-background">
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm">
          <AlertCircle className="h-5 w-5 text-accent-foreground/80 shrink-0 mt-0.5" />
          <p className="text-foreground/80">
            <strong className="font-semibold">Please note:</strong> Cured items
            can be collected the following week. Resin can be harmful during
            pregnancy — please reach out if you'd like more info.
          </p>
        </div>
      </section>

      {/* WORKSHOP OPTIONS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Standard */}
          <div className="rounded-3xl bg-secondary/50 p-8 lg:p-10">
            <p className="font-script text-xl text-primary">Workshop options</p>
            <h2 className="mt-1 font-display text-3xl font-semibold">Pick your project</h2>
            <p className="mt-3 text-sm text-muted-foreground">Per person, all materials included.</p>

            <ul className="mt-8 divide-y divide-border">
              {standardWorkshops.map((w) => (
                <li key={w.name} className="flex items-center justify-between py-4">
                  <span className="font-medium">{w.name}</span>
                  <span className="font-display text-lg font-semibold text-primary">
                    R{w.price}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/book"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-teal text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-soft hover:shadow-elevated transition-all"
            >
              Book a workshop
            </Link>
          </div>

          {/* River Tables */}
          <div className="rounded-3xl bg-gradient-teal text-primary-foreground p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-shine opacity-40" />
            <div className="relative">
              <p className="font-script text-xl text-accent">Premium</p>
              <h2 className="mt-1 font-display text-3xl font-semibold">River table workshops</h2>
              <p className="mt-3 text-sm text-primary-foreground/80">
                Take home a true statement piece. Live-edge wood with a flowing resin river.
              </p>

              <ul className="mt-8 divide-y divide-primary-foreground/15">
                {riverTableWorkshops.map((w) => (
                  <li key={w.name} className="flex items-center justify-between py-4">
                    <span className="font-medium">{w.name}</span>
                    <span className="font-display text-lg font-semibold">R{w.price}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-primary-foreground/10 backdrop-blur p-5">
                <p className="font-script text-xl text-accent">3 Day Resin Course</p>
                <p className="mt-2 text-sm text-primary-foreground/85 leading-relaxed">
                  Three days, three resin pieces, hands-on guidance and our hard-earned
                  insights. Includes a beginner's guide, supplier list and the silicone
                  moulds you use are yours to keep.
                </p>
              </div>

              <Link
                to="/book"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-background text-primary px-6 py-3.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Enquire & book
              </Link>
            </div>
          </div>
        </div>

        {/* Private */}
        <div className="mt-12 rounded-3xl border border-border p-8 lg:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <p className="font-script text-xl text-primary">Private & corporate</p>
            <h3 className="mt-1 font-display text-3xl font-semibold">Team buildings & private workshops</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Birthdays, hen parties, team-building events or just a fun day with
              friends. Hosted at our studio or yours, on a date that suits you.
              Choose from trinket trays, coasters, cheeseboards, side tables and more.
            </p>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center justify-center rounded-full border border-primary text-primary px-6 py-3.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Plan a private session
          </Link>
        </div>
      </section>
    </>
  );
}
