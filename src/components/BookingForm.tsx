import { useState, type FormEvent } from "react";
import { MessageCircle, Loader2, Plus, Trash2 } from "lucide-react";
import {
  createBooking,
  buildBookingWhatsAppMessage,
  type BookingItem,
} from "../lib/bookings";

const WHATSAPP_NUMBER = "27834411311"; // keep in sync with workshops.tsx

function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface WorkshopOption {
  name: string;
  price: number;
  image: string | null;
}

export interface WorkshopDate {
  date: string;
  time?: string;
  note?: string;
  full?: boolean;
}

interface BookingFormProps {
  workshopOptions: WorkshopOption[];
  availableDates: WorkshopDate[];
  onClose?: () => void;
}

interface ItemRow {
  id: string;
  workshopName: string;
  quantity: number;
}

let rowIdCounter = 0;
function makeRow(defaultWorkshop: string): ItemRow {
  rowIdCounter += 1;
  return { id: `row-${rowIdCounter}`, workshopName: defaultWorkshop, quantity: 1 };
}

export function BookingForm({
  workshopOptions,
  availableDates,
  onClose,
}: BookingFormProps) {
  const defaultWorkshop = workshopOptions[0]?.name ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const firstAvailable = availableDates.find((d) => !d.full);
  const [date, setDate] = useState(
    firstAvailable
      ? `${firstAvailable.date}${firstAvailable.time ? `, ${firstAvailable.time}` : ""}`
      : ""
  );
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ItemRow[]>([makeRow(defaultWorkshop)]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    setItems((rows) => [...rows, makeRow(defaultWorkshop)]);
  };

  const removeItem = (id: string) => {
    setItems((rows) => (rows.length > 1 ? rows.filter((r) => r.id !== id) : rows));
  };

  const updateItem = (id: string, patch: Partial<ItemRow>) => {
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const priceFor = (workshopName: string) =>
    workshopOptions.find((w) => w.name === workshopName)?.price ?? null;

  const totalPartySize = items.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
  const estimatedTotal = items.reduce(
    (sum, r) => sum + (priceFor(r.workshopName) ?? 0) * (Number(r.quantity) || 0),
    0
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name || !phone || !date) {
      setError("Please fill in your name, phone number, and pick a date.");
      return;
    }
    if (items.some((r) => !r.workshopName || Number(r.quantity) < 1)) {
      setError("Please make sure every item has a workshop and a quantity of at least 1.");
      return;
    }

    setSubmitting(true);
    try {
      const bookingItems: BookingItem[] = items.map((r) => ({
        workshopName: r.workshopName,
        workshopPrice: priceFor(r.workshopName),
        quantity: Number(r.quantity),
      }));

      const bookingInput = {
        name,
        phone,
        email,
        items: bookingItems,
        date,
        notes,
      };

      await createBooking(bookingInput);

      const message = buildBookingWhatsAppMessage(bookingInput);

      window.open(waLink(message), "_blank", "noopener,noreferrer");
      onClose?.();
    } catch (err) {
      console.error("Booking submission failed:", err);
      setError(
        "Something went wrong submitting your booking. Please try again or message us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email (optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Date</label>
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
        >
          {availableDates
            .filter((d) => !d.full)
            .map((d) => {
              const label = `${d.date}${d.time ? `, ${d.time}` : ""}`;
              return (
                <option key={d.date} value={label}>
                  {label}
                  {d.note ? ` — ${d.note}` : ""}
                </option>
              );
            })}
        </select>
        {availableDates.every((d) => d.full) && (
          <p className="mt-1 text-xs text-muted-foreground">
            All listed dates are fully booked — message us on WhatsApp to ask about future dates.
          </p>
        )}
      </div>

      {/* Items — each person can pick a different workshop/quantity */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Who's making what?</label>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add item
          </button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          If people in your group want to make different things, add a row for each.
        </p>

        <div className="mt-3 space-y-2">
          {items.map((row) => (
            <div key={row.id} className="flex items-center gap-1.5">
            <select
              value={row.workshopName}
              onChange={(e) => updateItem(row.id, { workshopName: e.target.value })}
              className="flex-1 min-w-0 rounded-lg border border-border px-2 py-2 text-xs"
            >
              {workshopOptions.map((w) => (
                <option key={w.name} value={w.name}>
                  {w.name} (R{w.price})
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={row.quantity}
              onChange={(e) =>
                updateItem(row.id, { quantity: Number(e.target.value) })
              }
              className="w-12 rounded-lg border border-border px-1 py-2 text-sm text-center"
              aria-label="Quantity"
            />
            <button
              type="button"
              onClick={() => removeItem(row.id)}
              disabled={items.length === 1}
              aria-label="Remove item"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm rounded-lg bg-secondary/50 px-3 py-2">
          <span className="text-muted-foreground">
            {totalPartySize} {totalPartySize === 1 ? "person" : "people"}
          </span>
          <span className="font-medium">Est. total: R{estimatedTotal}</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-teal text-primary-foreground px-6 py-3 text-sm font-medium shadow-soft disabled:opacity-60"
      >
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
        {submitting ? "Submitting..." : "Submit & continue on WhatsApp"}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Your spot is only confirmed once payment is received. We will follow up with payment instructions on WhatsApp after you submit this form.
      </p>
    </form>
  );
}