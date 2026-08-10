import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/" as const, label: "Home" },
  // { to: "/workshops" as const, label: "Workshops" },
  { to: "/gallery" as const, label: "Gallery" },
  // { to: "/custom" as const, label: "Custom" },
  // { to: "/starter-kit" as const, label: "Starter Kit" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-1 group">
          <span className="font-script text-5xl text-primary leading-none">PrettyBits</span>
          <span className="hidden lg:inline-block ml-3 pl-3 border-l border-teal/40 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground self-center">
            Resin&nbsp;Art&nbsp;·&nbsp;Workshops
          </span>
          {/* <span className="font-script text-3xl text-foreground leading-none">Bits</span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* <div className="hidden md:block">
          <Link
            to="/book"
            className="inline-flex items-center justify-center rounded-full bg-gradient-teal text-primary-foreground px-6 py-2.5 text-sm font-medium shadow-soft hover:shadow-elevated transition-all hover:-translate-y-0.5"
          >
            Book a Workshop
          </Link>
        </div> */}

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {link.label}
              </Link>
            ))}
            {/* <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-teal text-primary-foreground px-6 py-3 text-sm font-medium"
            >
              Book a Workshop
            </Link> */}
          </div>
        </div>
      )}
    </header>
  );
}
