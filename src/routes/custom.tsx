import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Upload, X, Sparkles, Heart, Gift, Cake, Flower2, Image as ImageIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { createCustomInquiry } from "@/lib/firestore-writes";



export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Resin Pieces — PrettyBits" },
      { name: "description", content: "Commission a custom resin piece — bouquet preservation, memorial keepsakes, wedding gifts, and more." },
      { property: "og:title", content: "Custom Resin Pieces — PrettyBits" },
      { property: "og:description", content: "Commission a one-of-a-kind resin piece, made just for you." },
    ],
  }),
  component: CustomPage,
});

const occasions = [
  { id: "wedding", label: "Wedding bouquet", icon: Heart, blurb: "Preserve your bouquet forever" },
  { id: "memorial", label: "Memorial keepsake", icon: Flower2, blurb: "Honour someone special" },
  { id: "anniversary", label: "Anniversary", icon: Gift, blurb: "A meaningful milestone gift" },
  { id: "birthday", label: "Birthday", icon: Cake, blurb: "Celebrate in a special way" },
  { id: "baby", label: "New baby", icon: Sparkles, blurb: "Capture the early days" },
  { id: "other", label: "Something else", icon: ImageIcon, blurb: "Tell us your idea" },
];

const itemTypes = [
  { id: "block", label: "Display block", desc: "Free-standing keepsake, ideal for bouquets" },
  { id: "coaster-set", label: "Coaster set", desc: "Set of 4 coasters with petals & flecks" },
  { id: "tray", label: "Serving tray", desc: "Functional piece with embedded florals" },
  { id: "frame", label: "Wall frame", desc: "Hangable framed resin artwork" },
  { id: "ornament", label: "Ornament / heart", desc: "Hanging keepsake or paperweight" },
  { id: "jewellery", label: "Jewellery", desc: "Necklace, earrings or ring" },
];

const sizes = [
  { id: "small", label: "Small", price: "from R650" },
  { id: "medium", label: "Medium", price: "from R1 200" },
  { id: "large", label: "Large", price: "from R2 400" },
  { id: "unsure", label: "Not sure yet", price: "We'll advise" },
];

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  phone: z.string().trim().min(7, "Please enter a contact number").max(20),
  deadline: z.string().max(60).optional(),
  vision: z.string().trim().min(10, "Tell us a little about your vision").max(800),
});

type Photo = { id: string; name: string; url: string; size: number };

function CustomPage() {
  const [step, setStep] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [itemType, setItemType] = useState("");
  const [size, setSize] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deadline, setDeadline] = useState("");
  const [vision, setVision] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = [];
    Array.from(files).slice(0, 8 - photos.length).forEach((f) => {
      if (!f.type.startsWith("image/")) return;
      if (f.size > 8 * 1024 * 1024) {
        toast.error(`${f.name} is larger than 8MB`);
        return;
      }
      next.push({
        id: `${f.name}-${f.size}-${Date.now()}`,
        name: f.name,
        size: f.size,
        url: URL.createObjectURL(f),
      });
    });
    setPhotos((p) => [...p, ...next]);
  };

  const removePhoto = (id: string) => {
    setPhotos((p) => {
      const target = p.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return p.filter((x) => x.id !== id);
    });
  };

  const canNext = () => {
    if (step === 1) return !!occasion;
    if (step === 2) return !!itemType && !!size;
    if (step === 3) return true; // photos optional
    return true;
  };

  const handleSubmit = async () => {
    const result = detailsSchema.safeParse({ name, email, phone, deadline, vision });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    try {
      await createCustomInquiry({
        occasion,
        itemType,
        size,
        photoCount: photos.length,
        name,
        email,
        phone,
        deadline: deadline || undefined,
        vision,
      });
      setSubmitted(true);
      toast.success("Custom request received!", {
        description: "We'll review and reply within 1–2 working days.",
      });
    } catch (err) {
      console.error("Failed to save custom inquiry", err);
      toast.error("Could not submit request — please try again.");
    }
  };

  if (submitted) {
    const occ = occasions.find((o) => o.id === occasion);
    const it = itemTypes.find((i) => i.id === itemType);
    return (
      <section className="mx-auto max-w-2xl px-6 lg:px-10 py-24 text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-teal flex items-center justify-center text-primary-foreground">
          <Check className="h-10 w-10" />
        </div>
        <p className="mt-6 font-script text-2xl text-primary">Request received</p>
        <h1 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-balance">
          Thank you, {name.split(" ")[0]}.
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          We've got your request for a custom <strong className="text-foreground">{it?.label.toLowerCase()}</strong>
          {occ ? <> for a <strong className="text-foreground">{occ.label.toLowerCase()}</strong></> : null}
          {photos.length > 0 ? <> with {photos.length} reference photo{photos.length === 1 ? "" : "s"}</> : null}.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          A personalised quote will land in your inbox within 1–2 working days.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20 text-center">
          <p className="font-script text-5xl text-primary">Made just for you</p>
          <h1 className="mt-3 font-display text-5xl lg:text-6xl font-semibold text-balance">
            Commission a custom piece.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            From preserved wedding bouquets to memorial keepsakes — share your idea and we'll bring it to life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-10 py-12 lg:py-16">
        <div className="mb-10">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className="font-medium">Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span className={cn(step >= 1 && "text-primary font-medium")}>Occasion</span>
            <span className={cn(step >= 2 && "text-primary font-medium")}>Item</span>
            <span className={cn(step >= 3 && "text-primary font-medium")}>Photos</span>
            <span className={cn(step >= 4 && "text-primary font-medium")}>Details</span>
          </div>
        </div>

        <div className="bg-background rounded-3xl border border-border p-8 lg:p-10 shadow-soft">
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-semibold">What's the occasion?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Pick the one that fits best — we'll tailor materials and finishing accordingly.</p>
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {occasions.map((o) => {
                  const Icon = o.icon;
                  const active = occasion === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setOccasion(o.id)}
                      className={cn(
                        "text-left rounded-2xl border-2 p-5 transition-all",
                        active
                          ? "border-primary bg-secondary/40 shadow-soft"
                          : "border-border hover:border-primary/40 hover:bg-muted/40",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                          active ? "bg-gradient-teal text-primary-foreground" : "bg-muted text-primary",
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{o.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{o.blurb}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-semibold">What would you like made?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Choose the format and rough size — final dimensions confirmed in your quote.</p>

              <p className="mt-8 text-xs uppercase tracking-wider text-muted-foreground font-medium">Item type</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {itemTypes.map((i) => {
                  const active = itemType === i.id;
                  return (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => setItemType(i.id)}
                      className={cn(
                        "text-left rounded-2xl border-2 p-4 transition-all",
                        active
                          ? "border-primary bg-secondary/40 shadow-soft"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <p className="font-medium text-sm">{i.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{i.desc}</p>
                    </button>
                  );
                })}
              </div>

              <p className="mt-8 text-xs uppercase tracking-wider text-muted-foreground font-medium">Size</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizes.map((s) => {
                  const active = size === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id)}
                      className={cn(
                        "rounded-2xl border-2 p-4 text-center transition-all",
                        active
                          ? "border-primary bg-secondary/40 shadow-soft"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <p className="font-medium text-sm">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.price}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-semibold">Reference photos</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload up to 8 photos — flowers to preserve, inspiration shots, colour palettes, anything that helps. (Optional but encouraged.)
              </p>

              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                className="mt-6 cursor-pointer rounded-2xl border-2 border-dashed border-border hover:border-primary/60 hover:bg-secondary/30 transition-all p-10 text-center"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="mt-4 font-medium">Drop photos here or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">JPG / PNG up to 8MB · max 8 photos</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {photos.length > 0 && (
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {photos.map((p) => (
                    <div key={p.id} className="relative group aspect-square rounded-xl overflow-hidden border border-border">
                      <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(p.id)}
                        className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove photo"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold">Your details</h2>
                <p className="mt-2 text-sm text-muted-foreground">Last step — and we'll be back to you with a quote.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="cname" className="mb-2 block">Your name</Label>
                  <Input id="cname" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="cphone" className="mb-2 block">WhatsApp number</Label>
                  <Input id="cphone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" placeholder="+27 ..." />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="cemail" className="mb-2 block">Email</Label>
                  <Input id="cemail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="cdeadline" className="mb-2 block">
                    Needed by? <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Input id="cdeadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="h-11 rounded-xl" placeholder="e.g. before 14 Feb" />
                </div>
              </div>

              <div>
                <Label htmlFor="cvision" className="mb-2 block">Tell us about your vision</Label>
                <Textarea
                  id="cvision"
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={5}
                  className="rounded-xl resize-none"
                  placeholder="Colours, style, words to include, special meaning, dimensions, anything we should know..."
                />
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>

            {step < totalSteps ? (
              <Button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="rounded-full bg-gradient-teal text-primary-foreground hover:opacity-95 shadow-soft px-6"
              >
                Continue <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-gradient-teal text-primary-foreground hover:opacity-95 shadow-soft px-6"
              >
                Submit request
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
