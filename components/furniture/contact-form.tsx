"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ContactDetails, ContactMethod } from "./types";

interface ContactFormProps {
  value: ContactDetails;
  onChange: (next: Partial<ContactDetails>) => void;
  showErrors: boolean;
}

const inputClass =
  "focus-ring border-line bg-canvas text-ink placeholder:text-muted mt-2 min-h-13 w-full rounded-xl border px-4 py-3.5 text-base transition-colors hover:border-bronze/70";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ErrorMessage({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}

export function ContactForm({ value, onChange, showErrors }: ContactFormProps) {
  const nameInvalid = showErrors && value.fullName.trim().length < 2;
  const emailInvalid = showErrors && !emailPattern.test(value.email.trim());
  const phoneDigits = value.phone.replace(/\D/g, "");
  const phoneInvalid = showErrors && phoneDigits.length < 7;
  const locationInvalid = showErrors && !value.location.trim();
  const methodInvalid = showErrors && !value.preferredMethod;

  const methods: Array<{
    value: ContactMethod;
    icon: typeof MessageCircle;
  }> = [
    { value: "WhatsApp", icon: MessageCircle },
    { value: "Phone", icon: Phone },
    { value: "Email", icon: Mail },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="full-name" className="text-ink text-sm font-semibold">
            Full name <span className="text-bronze">*</span>
          </label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            value={value.fullName}
            onChange={(event) => onChange({ fullName: event.target.value })}
            placeholder="Your name"
            className={inputClass}
            aria-invalid={nameInvalid}
            aria-describedby={nameInvalid ? "full-name-error" : undefined}
          />
          {nameInvalid && (
            <ErrorMessage id="full-name-error">Enter your full name.</ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-ink text-sm font-semibold">
            Email <span className="text-bronze">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={value.email}
            onChange={(event) => onChange({ email: event.target.value })}
            placeholder="name@example.com"
            className={inputClass}
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? "email-error" : undefined}
          />
          {emailInvalid && (
            <ErrorMessage id="email-error">
              Enter a valid email address.
            </ErrorMessage>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-ink text-sm font-semibold">
            Phone or WhatsApp <span className="text-bronze">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={value.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            placeholder="+971 50 000 0000"
            className={inputClass}
            aria-invalid={phoneInvalid}
            aria-describedby={phoneInvalid ? "phone-error" : undefined}
          />
          {phoneInvalid && (
            <ErrorMessage id="phone-error">
              Enter a phone or WhatsApp number.
            </ErrorMessage>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="location" className="text-ink text-sm font-semibold">
            Emirate or location <span className="text-bronze">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level1"
            value={value.location}
            onChange={(event) => onChange({ location: event.target.value })}
            placeholder="e.g. Dubai, Emirates Hills"
            className={inputClass}
            aria-invalid={locationInvalid}
            aria-describedby={locationInvalid ? "location-error" : undefined}
          />
          {locationInvalid && (
            <ErrorMessage id="location-error">
              Add the project location.
            </ErrorMessage>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="text-ink text-sm font-semibold">
          Preferred contact method <span className="text-bronze">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const selected = value.preferredMethod === method.value;

            return (
              <button
                key={method.value}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ preferredMethod: method.value })}
                className={`focus-ring flex min-h-13 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-canvas text-ink hover:border-bronze"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {method.value}
              </button>
            );
          })}
        </div>
        {methodInvalid && (
          <ErrorMessage id="contact-method-error">
            Choose how you would like to be contacted.
          </ErrorMessage>
        )}
      </fieldset>

      <label htmlFor="contact-message" className="mt-6 block">
        <span className="text-ink text-sm font-semibold">
          Additional message <span className="text-muted font-normal">(optional)</span>
        </span>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={value.message}
          onChange={(event) => onChange({ message: event.target.value })}
          placeholder="Add access notes, decision-makers, questions, or anything else the team should know."
          className={`${inputClass} min-h-28 resize-y`}
        />
      </label>

      <p className="text-muted mt-6 text-xs leading-5">
        This demo does not transmit your contact details. In a live version,
        Floor Nation would use them only to discuss this request.
      </p>
    </div>
  );
}
