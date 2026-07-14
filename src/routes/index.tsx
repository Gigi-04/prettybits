import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Heart, Palette } from "lucide-react";
import heroImg from "@/assets/hero-resin.jpg";
import workshopImg from "@/assets/Pouring Resin 2.jpeg";
import weddingFavoursImg from "@/assets/Wedding Favours 3.jpeg";
import weddingRingTrayImg from "@/assets/Rectangle Ring Tray 3.jpeg";
import flowersImg from "@/assets/Flower Hexagon 3.jpeg";
import customImg from "@/assets/Custom Geode (birthday).jpeg";
import starterKitImg from "@/assets/starter-kit.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PrettyBits — Handcrafted Resin Art & Workshops in Cape Town" },
      { name: "description", content: "Discover handcrafted resin coasters, cheeseboards, river tables and beginner-friendly resin workshops at PrettyBits." },
      { property: "og:title", content: "PrettyBits — Handcrafted Resin Art & Workshops" },
      { property: "og:description", content: "Discover handcrafted resin art and beginner-friendly workshops in Cape Town." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const products = [
  { img: weddingFavoursImg, name: "Wedding Favours", blurb: "Miniature hand-poured resin art, customized for your special day." },
  { img: weddingRingTrayImg, name: "Wedding Ring Tray", blurb: "Elegant display trays for your finest pieces." },
  { img: flowersImg, name: "Flower Preservation", blurb: "Forever keepsakes from your most precious blooms." },
  { img: customImg, name: "Custom Pieces", blurb: "Unique creations, made just for you." },
];


function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal/20 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Handcrafted in Cape Town since 2021
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-foreground text-balance">
              Where resin meets{" "}
              <span className="font-script font-normal text-9xl text-primary">artistry</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Beautifully unique, handcrafted resin pieces and beginner-friendly
              workshops — because creativity should be an experience, not just a product.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-teal text-primary-foreground px-8 py-4 text-base font-medium shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur text-foreground px-8 py-4 text-base font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Explore the Gallery
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm">
              <div>
                <p className="font-display text-3xl font-semibold text-primary">500+</p>
                <p className="text-muted-foreground">Happy creators</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-semibold text-primary">4+</p>
                <p className="text-muted-foreground">Years of craft</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-display text-3xl font-semibold text-primary">100%</p>
                <p className="text-muted-foreground">Handmade</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-shine rounded-3xl blur-2xl" />
            <img
              src={heroImg}
              alt="Handcrafted teal and gold resin coasters by PrettyBits"
              width={1920}
              height={1280}
              className="relative rounded-3xl shadow-elevated w-full h-auto object-cover aspect-4/5 lg:aspect-5/6"
            />
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-card p-5 max-w-200px hidden sm:block">
              <p className="font-script text-xl text-primary">Just poured</p>
              <p className="text-xs text-muted-foreground mt-1">Each piece, one of a kind. No two are ever the same.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="font-script text-5xl text-primary">About us</p>
          <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-balance">
            A creative South African studio.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-5 text-base text-muted-foreground leading-relaxed">
          <p>
            We are a South African, home-based creative business specialising in
            handcrafted resin art and functional decor. Our journey began in 2021
            with a passion for creating unique, high-quality resin pieces that
            combine artistic expression with everyday practicality.
          </p>
          <p>
            Each product is carefully designed and handmade, ensuring no two
            pieces are ever the same. Beyond our products, we host hands-on resin
            workshops for beginners and creatives — practical, engaging, and
            wonderfully therapeutic.
          </p>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-8">
          {[
            { Icon: Palette, title: "One-of-a-kind", text: "Every piece is hand-poured. The colours, the swirl, the moment — never repeated." },
            { Icon: Heart, title: "Made with love", text: "Quality materials, careful craftsmanship and a generous splash of South African heart." },
            { Icon: Sparkles, title: "Workshop-ready", text: "All materials provided. No experience needed. Just bring your creative energy." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="bg-background rounded-2xl p-8 shadow-soft">
              <div className="h-12 w-12 rounded-xl bg-gradient-teal flex items-center justify-center text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-script text-5xl text-primary">Our craft</p>
            <h2 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-balance max-w-xl">
              Pieces that turn moments into keepsakes.
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            See the full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-secondary shadow-soft aspect-square">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP CTA */}
      {/* <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-teal text-primary-foreground p-8 sm:p-12 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="absolute inset-0 bg-gradient-shine opacity-50" />
          <div className="relative">
            <p className="font-script text-5xl text-accent">Hands-on. Beginner friendly.</p>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-semibold text-balance">
              Spend an afternoon making something beautiful.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-primary-foreground/85 leading-relaxed max-w-md">
              Pick a project — coasters, a cheeseboard, a side table or even a
              river table. We provide everything you need. You bring the
              creative energy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-primary px-8 py-4 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Book Your Spot <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/workshops"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-8 py-4 text-base font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                See all workshops
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={workshopImg}
              alt="Pouring teal resin into a wooden mould"
              loading="lazy"
              width={1280}
              height={1280}
              className="rounded-2xl shadow-elevated w-full aspect-square object-cover"
            />
          </div>
        </div>
      </section> */}

       {/* Starter Kit CTA
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-teal text-primary-foreground p-8 sm:p-12 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="absolute inset-0 bg-gradient-shine opacity-50" />
          <div className="relative">
            <p className="font-script text-5xl text-accent">Craft from home. No experience needed.</p>
            <h2 className="mt-3 font-display text-4xl lg:text-5xl font-semibold text-balance">
              Bring the workshop experience home with our starter kits.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-primary-foreground/85 leading-relaxed max-w-md">
              Choose your starter kit project — from simple coasters to a stunning cheeseboard.
               Your kit comes fully loaded with all the essentials, making it effortless to create from the comfort of your kitchen table.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/starter-kit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-primary px-8 py-4 text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Order Your Kit <ArrowRight className="h-4 w-4" />
              </Link>
              
            </div>
          </div>
          <div className="relative">
            <img
              src={starterKitImg}
              alt="Starter kit with various resin crafting supplies"
              loading="lazy"
              width={1280}
              height={1280}
              className="rounded-2xl shadow-elevated w-full aspect-square object-cover"
            />
          </div>
        </div>
      </section> */}
    </>
  );
}
