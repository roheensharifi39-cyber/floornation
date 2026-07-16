"use client";

import { ChevronDown } from "lucide-react";
import { furnitureBudgets } from "@/data/furniture";
import type { ProjectDetails, ProjectKind } from "./types";

interface ProjectDetailsFormProps {
  value: ProjectDetails;
  onChange: (next: Partial<ProjectDetails>) => void;
  showErrors: boolean;
}

const inputClass =
  "focus-ring border-line bg-canvas text-ink placeholder:text-muted mt-2 min-h-13 w-full rounded-xl border px-4 py-3.5 text-base transition-colors hover:border-bronze/70 disabled:cursor-not-allowed disabled:opacity-60";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-ink text-sm font-semibold">
      {children}
      {required && <span className="text-bronze"> *</span>}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}

export function ProjectDetailsForm({
  value,
  onChange,
  showErrors,
}: ProjectDetailsFormProps) {
  const quantityInvalid = showErrors && (!value.quantity || value.quantity < 1);

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
      <p className="text-muted border-line bg-surface rounded-lg border p-4 text-sm leading-6 sm:col-span-2">
        Have only a picture or rough idea? That is enough to get started. Every
        field below is optional apart from quantity, which defaults to one.
      </p>
      <div>
        <FieldLabel htmlFor="dimensions">
          Approximate dimensions
        </FieldLabel>
        <input
          id="dimensions"
          name="dimensions"
          type="text"
          value={value.dimensions}
          onChange={(event) => onChange({ dimensions: event.target.value })}
          placeholder="e.g. 240 × 95 × 75 cm"
          className={inputClass}
        />
        <p className="text-muted mt-1.5 text-xs leading-5">
          Exact measurements can be confirmed during consultation.
        </p>
      </div>

      <div>
        <FieldLabel htmlFor="quantity" required>
          Quantity
        </FieldLabel>
        <input
          id="quantity"
          name="quantity"
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          value={value.quantity}
          onChange={(event) =>
            onChange({ quantity: Number.parseInt(event.target.value, 10) || 0 })
          }
          className={inputClass}
          aria-invalid={quantityInvalid}
          aria-describedby={quantityInvalid ? "quantity-error" : undefined}
        />
        {quantityInvalid && (
          <FieldError id="quantity-error">Enter a quantity of at least 1.</FieldError>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="materials">Preferred materials</FieldLabel>
        <input
          id="materials"
          name="materials"
          type="text"
          value={value.materials}
          onChange={(event) => onChange({ materials: event.target.value })}
          placeholder="e.g. walnut, linen, brass"
          className={inputClass}
        />
      </div>

      <div>
        <FieldLabel htmlFor="colors">Preferred colors</FieldLabel>
        <input
          id="colors"
          name="colors"
          type="text"
          value={value.colors}
          onChange={(event) => onChange({ colors: event.target.value })}
          placeholder="e.g. warm neutrals, deep green"
          className={inputClass}
        />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="text-ink text-sm font-semibold">
          Residential or commercial use <span className="text-muted font-normal">(optional)</span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2" role="group">
          {(["Residential", "Commercial"] as ProjectKind[]).map((kind) => (
            <button
              key={kind}
              type="button"
              aria-pressed={value.projectKind === kind}
              onClick={() => onChange({ projectKind: kind })}
              className={`focus-ring min-h-13 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                value.projectKind === kind
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-canvas text-ink hover:border-bronze"
              }`}
            >
              {kind}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <FieldLabel htmlFor="budget">
          Estimated budget
        </FieldLabel>
        <div className="relative">
          <select
            id="budget"
            name="budget"
            value={value.budget}
            onChange={(event) => onChange({ budget: event.target.value })}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="">Prefer not to say yet</option>
            {furnitureBudgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          <ChevronDown
            className="text-muted pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="completion-date">
          Desired completion date
        </FieldLabel>
        <input
          id="completion-date"
          name="completionDate"
          type="date"
          value={value.completionDate}
          onChange={(event) => onChange({ completionDate: event.target.value })}
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <FieldLabel htmlFor="requirements">Additional requirements</FieldLabel>
        <textarea
          id="requirements"
          name="requirements"
          rows={5}
          value={value.requirements}
          onChange={(event) => onChange({ requirements: event.target.value })}
          placeholder="Tell us about how the piece will be used, access constraints, finish references, or anything else that matters."
          className={`${inputClass} min-h-32 resize-y`}
        />
      </div>
    </div>
  );
}
