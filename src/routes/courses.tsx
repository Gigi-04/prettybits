import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, MapPin, Sparkles, AlertTriangle, MessageCircle, ChevronLeft, ChevronRight, Layers, ArrowRight } from "lucide-react";

import flowersImg from "@/assets/Flower Hexagon 3.jpeg";
import customImg from "@/assets/Custom Geode (birthday).jpeg";
import workshopImg from "@/assets/Pouring Resin 2.jpeg";
import CourseImg from "@/assets/3dayResin.jpg";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "3-Day Resin Art Course — PrettyBits" },
      { name: "description", content: "Learn resin art in 3 days! Make 3 unique items with guided instruction in Goodwood, Cape Town." },
    ],
  }),
  component: CoursesPage,
});

const showcaseItem = {
  title: "3 Masterpiece Creations & Official Certificate",
  img: CourseImg,
  description:
    "You'll create a customized photo piece, a personalized vinyl/text keepsake, and a floral preservation piece. Plus, take home your official PrettyBits Certificate of Attendance and all 3 silicone moulds used!",
};

const breakdown = [
  {
    day: "Day 1 (3 hrs 30 min)",
    summary: "FOUNDATIONS & INITIAL POURS",
    items: [
      "Introduction to resin safety & equipment",
      "Understanding pigments & color effects",
      "Calculating, measuring, mixing & coloring resin",
      "Preparing photos for clear resin embedding",
      "Personalizing resin using vinyl and custom prints",
      "Drying flowers using 3 distinct techniques",
      "Pouring the 1st layer for all 3 of your items",
    ],
  },
  {
    day: "Day 2 (1 hr 30 min)",
    summary: "LAYERING & EMBEDDING",
    items: [
      "Applying custom wording/text & pouring layer 2",
      "Embedding your prepared photo & pouring layer 2",
      "Placing your dried flower head & pouring layer 2",
    ],
  },
  {
    day: "Day 3 (1 hr)",
    summary: "DEMOULDING & GRADUATION",
    items: [
      "Demoulding all 3 finished creations",
      "Light sanding and deburring techniques",
      "Presentation of your Certificate of Attendance",
      "Take home your 3 completed masterpieces & silicone moulds",
    ],
  },
];

function CourseShowcase() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-4/3 w-full bg-secondary overflow-hidden">
        <img
          src={showcaseItem.img}
          alt={showcaseItem.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {showcaseItem.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {showcaseItem.description}
        </p>
      </div>
    </div>
  );
}

function CoursesPage() {
  const whatsappUrl = `https://wa.me/27834411311?text=${encodeURIComponent(
    "Hi PrettyBits! 👋 I would like to enquire about scheduling dates for the 3-Day Resin Course."
  )}`;

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-hero border-b border-border/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="font-script text-7xl text-primary">Masterclass Experience</p>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-semibold text-balance max-w-3xl mx-auto">
            3-Day Resin Art Course
          </h1>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Make 3 unique items in 3 days! Beginner friendly with all materials & silicone moulds included.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-display font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              Enquire Dates via WhatsApp
            </a>
            <Link
              to="/contact"
              search={{ enquiry: "3 Day Resin Course" }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3.5 font-display font-semibold text-foreground hover:bg-secondary transition-colors text-sm"
            >
              Send Form Enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Quick Specs Banner */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-background rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3.5 p-2">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Price</p>
              <p className="font-display text-xl font-bold text-foreground">R3,990 <span className="text-xs font-normal text-muted-foreground">pp</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Duration</p>
              <p className="font-display text-base font-semibold text-foreground">3 Days (6 Hours Total)</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Items Made</p>
              <p className="font-display text-base font-semibold text-foreground">3 Handcrafted Pieces</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Venue Location</p>
              <p className="font-display text-base font-semibold text-foreground">Goodwood, Cape Town</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details: Carousel + Timeline Curriculum */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: What You'll Make Carousel */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">What You Will Create</h2>
            <CourseShowcase />
            
            <div className="mt-6 rounded-2xl bg-secondary/40 border border-border p-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-semibold text-foreground mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Bonus Included:</span>
              </div>
              You keep all silicone moulds used during the course and receive a beginner guide with supplier lists!
            </div>
          </div>

          {/* Right: Course Curriculum  timeline  */}
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Course Curriculum</h2>
            <div className="space-y-8">
                {breakdown.map((step, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-primary/30">
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug">{step.day}</h3>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider mt-0.5">{step.summary}</p>
                    
                    <ul className="mt-3 space-y-2">
                    {step.items.map((subItem, sIdx) => (
                        <li key={sIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0 mt-2" />
                        <span>{subItem}</span>
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Caution Banner */}
        <div className="mt-12 flex items-center justify-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 p-4 rounded-xl text-xs text-center">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
          <span>
            <strong>CAUTION:</strong> Resin can be harmful to pregnant women. Not suitable for kids under 13 years without adult supervision.
          </span>
        </div>
      </section>
    </>
  );
}