import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-resin.jpg";
import workshopImg from "@/assets/workshop-pour.jpg";
import coastersImg from "@/assets/product-coasters.jpg";
import cheeseboardImg from "@/assets/product-cheeseboard.jpg";
import flowersImg from "@/assets/product-flowers.jpg";
import riverTableImg from "@/assets/product-rivertable.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — PrettyBits Resin Art" },
      { name: "description", content: "A look at the handcrafted resin art, coasters, cheeseboards, river tables and flower preservations made at PrettyBits." },
      { property: "og:title", content: "Gallery — PrettyBits" },
      { property: "og:description", content: "Browse our handcrafted resin art collection." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: GalleryPage,
});

const items = [
  { img: coastersImg, label: "Geode Coasters", category: "Coasters" },
  { img: cheeseboardImg, label: "Wave Cheeseboard", category: "Serveware" },
  { img: heroImg, label: "Teal & Gold Set", category: "Coasters" },
  { img: flowersImg, label: "Bridal Bouquet Cube", category: "Keepsakes" },
  { img: riverTableImg, label: "Ocean River Table", category: "Furniture" },
  { img: workshopImg, label: "Pour in Progress", category: "Studio" },
];

function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-24 text-center">
          <p className="font-script text-2xl text-primary">Gallery</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance max-w-3xl mx-auto">
            A little look inside the studio.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Each piece is hand-poured, one of a kind, and made with care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                i === 0 || i === 4 ? "lg:row-span-2 aspect-[3/4] lg:aspect-[3/5]" : "aspect-square"
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs uppercase tracking-wider opacity-80">{item.category}</p>
                <p className="font-display text-xl font-semibold">{item.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
