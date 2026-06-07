import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, Users, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import workshopImg from "@/assets/workshop-pour.jpg";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";

import carouselImg1 from "@/assets/Custom 1.jpeg";
import carouselImg2 from "@/assets/Custom 2.jpeg";
import carouselImg3 from "@/assets/Custom 3.jpeg";

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

// Carousel images array
const carouselImages = [
  { 
    src: carouselImg1, 
    alt: "Resin Coasters Workshop", 
    title: "Resin Coasters", 
    description: "Create a set of beautiful, high-gloss customized coasters." 
  },
  { 
    src: carouselImg2, 
    alt: "Resin Cheeseboard Workshop", 
    title: "Cheeseboard Workshop", 
    description: "Learn to pour flawless ocean waves onto live-edge wood." 
  },
  { 
    src: carouselImg3, 
    alt: "Resin Tray and Decor", 
    title: "Trinket Trays & Homeware", 
    description: "Craft functional decor pieces perfect for any table or vanity." 
  },
];

function WorkshopsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28 text-center">
          <p className="font-script text-5xl text-primary">Workshops</p>
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

      {/* WORKSHOP OPTIONS SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 space-y-12">
        
        {/* UPPER GRID: Standard Workshops + Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Standard Options */}
          <div className="rounded-3xl bg-secondary/50 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="font-script text-4xl text-primary">Workshop options</p>
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
            </div>

            <Link
              to="/book"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-teal text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-soft hover:shadow-elevated transition-all"
            >
              Book a workshop
            </Link>
          </div>

          {/* Image Carousel Card with Text Overlay */}
          <div className="rounded-3xl bg-background border border-border overflow-hidden relative h-96 lg:h-auto flex items-center justify-center group shadow-soft">
            {/* Carousel Images */}
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Visual Gradient Overlay (Darkened lower third for text contrast) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-16 p-6 md:p-8 flex flex-col justify-end text-white pointer-events-none select-none z-20">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 drop-shadow-md">
                    {img.title}
                  </h3>
                  <p className="text-sm text-white/90 max-w-md drop-shadow-xs">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigation Controls */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-4 z-20 p-2 rounded-full bg-background/80 backdrop-blur text-foreground shadow-sm hover:bg-background transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-4 z-20 p-2 rounded-full bg-background/80 backdrop-blur text-foreground shadow-sm hover:bg-background transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 transition-all rounded-full ${
                    index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* LOWER SECTION: River Tables (Premium) */}
        <div className="rounded-3xl bg-gradient-teal text-primary-foreground p-8 lg:p-12 relative overflow-hidden shadow-soft">
          <div className="absolute inset-0 bg-gradient-shine opacity-40" />
          <div className="relative">
            <p className="font-script text-4xl text-accent">Premium</p>
            <h2 className="mt-1 font-display text-3xl font-semibold">River table workshops</h2>
            <p className="mt-3 text-sm text-primary-foreground/80 max-w-2xl">
              Take home a true statement piece. Live-edge wood pieces treated with a flowing, beautifully customized resin river.
            </p>

            <ul className="mt-8 divide-y divide-primary-foreground/15 max-w-4xl">
              {riverTableWorkshops.map((w) => (
                <li key={w.name} className="flex items-center justify-between py-4">
                  <span className="font-medium">{w.name}</span>
                  <span className="font-display text-lg font-semibold">R{w.price}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-primary-foreground/10 backdrop-blur p-6 lg:p-8 max-w-4xl">
              <p className="font-script text-4xl text-accent">3 Day Resin Course</p>
              <p className="mt-2 text-sm text-primary-foreground/85 leading-relaxed">
                Three days, three resin pieces, hands-on guidance and our hard-earned
                insights. Includes a beginner's guide, supplier list and the silicone
                moulds you use are yours to keep.
              </p>
            </div>

            <Link
              to="/book"
              className="mt-8 inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-background text-primary px-8 py-3.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Enquire & book
            </Link>
          </div>
        </div>

        {/* Private & Corporate Sessions */}
        <div className="rounded-3xl border border-border p-8 lg:p-12 grid md:grid-cols-3 gap-8 items-center bg-background shadow-soft">
          <div className="md:col-span-2">
            <p className="font-script text-4xl text-primary">Private & corporate</p>
            <h3 className="mt-1 font-display text-3xl font-semibold">Team buildings & private workshops</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Birthdays, hen parties, team-building events or just a fun day with
              friends. Hosted at our studio or yours, on a date that suits you.
              Choose from trinket trays, coasters, cheeseboards, side tables and more.
            </p>
          </div>
          <div className="flex md:justify-end w-full">
            <Link
              to="/book"
              className="inline-flex w-full md:w-auto items-center justify-center rounded-full border border-primary text-primary px-8 py-3.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Plan a private session
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}
