"use client";

import { Pencil } from "lucide-react";
import type { FurnitureBrief, UploadedFile } from "./types";

interface ReviewPanelProps {
  brief: FurnitureBrief;
  uploads: UploadedFile[];
  onEdit: (step: number) => void;
}

interface ReviewSectionProps {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}

function ReviewSection({ title, step, onEdit, children }: ReviewSectionProps) {
  return (
    <section className="border-line border-b py-4 first:pt-0 last:border-0 last:pb-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-ink text-sm font-semibold">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="focus-ring text-muted hover:text-ink flex min-h-11 items-center gap-1.5 rounded-md px-2 text-xs font-semibold transition-colors"
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          <Pencil className="size-3" />
          Edit
        </button>
      </div>
      <div className="text-muted mt-2 text-sm leading-6">{children}</div>
    </section>
  );
}

export function ReviewPanel({ brief, uploads, onEdit }: ReviewPanelProps) {
  const detailRows = [
    ["Dimensions", brief.details.dimensions || "To be confirmed"],
    ["Quantity", String(brief.details.quantity)],
    ["Use", brief.details.projectKind || "To be discussed"],
    ["Budget", brief.details.budget || "To be discussed"],
    ["Materials", brief.details.materials || "Open to recommendations"],
    ["Colors", brief.details.colors || "Open to recommendations"],
    ["Target date", brief.details.completionDate || "To be discussed"],
  ];

  return (
    <div className="border-line bg-surface rounded-xl border p-5 sm:p-6">
      <div className="border-line mb-4 border-b pb-4">
        <h2 className="text-ink text-base font-semibold">Your project brief</h2>
        <p className="text-muted mt-1 text-sm">
          Review the starting point for a custom-sourced or custom-created
          proposal—not a fixed-product order.
        </p>
      </div>

      <ReviewSection title="Space" step={0} onEdit={onEdit}>
        <p className="text-ink font-medium">
          {brief.space === "Other" && brief.spaceOther
            ? `Other — ${brief.spaceOther}`
            : brief.space}
        </p>
      </ReviewSection>

      <ReviewSection title="Furniture" step={1} onEdit={onEdit}>
        <p className="text-ink font-medium">
          {brief.furnitureTypes
            .map((type) =>
              type === "Other" && brief.furnitureOther
                ? `Other — ${brief.furnitureOther}`
                : type,
            )
            .join(", ")}
        </p>
      </ReviewSection>

      <ReviewSection title="Design direction" step={2} onEdit={onEdit}>
        <p className="text-ink font-medium">{brief.direction}</p>
      </ReviewSection>

      <ReviewSection title="Project details" step={3} onEdit={onEdit}>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {detailRows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted text-xs">{label}</dt>
              <dd className="text-ink mt-0.5 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {brief.details.requirements && (
          <div className="mt-3">
            <p className="text-muted text-xs">Additional requirements</p>
            <p className="text-ink mt-0.5 whitespace-pre-wrap font-medium">
              {brief.details.requirements}
            </p>
          </div>
        )}
      </ReviewSection>

      <ReviewSection title="Inspiration" step={4} onEdit={onEdit}>
        {uploads.length > 0 ? (
          <ul className="space-y-1">
            {uploads.map((upload) => (
              <li key={upload.id} className="text-ink truncate font-medium">
                {upload.file.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No files added</p>
        )}
      </ReviewSection>

      <ReviewSection title="Contact" step={5} onEdit={onEdit}>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {[
            ["Name", brief.contact.fullName],
            ["Phone / WhatsApp", brief.contact.phone],
            ["Email", brief.contact.email],
            ["Location", brief.contact.location],
            ["Preferred contact", brief.contact.preferredMethod],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted text-xs">{label}</dt>
              <dd className="text-ink mt-0.5 break-words font-medium">
                {value || "Not provided yet"}
              </dd>
            </div>
          ))}
        </dl>
        {brief.contact.message && (
          <div className="mt-3">
            <p className="text-muted text-xs">Additional message</p>
            <p className="text-ink mt-0.5 whitespace-pre-wrap font-medium">
              {brief.contact.message}
            </p>
          </div>
        )}
      </ReviewSection>

      <p className="border-line text-muted mt-5 border-t pt-4 text-xs leading-5">
        In production, Floor Nation would review this request, clarify any open
        details, and prepare a custom proposal before anything is ordered or made.
      </p>
    </div>
  );
}
