"use client";

import {
  FileImage,
  FileText,
  Info,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  type ChangeEvent,
  type DragEvent,
  useRef,
  useState,
} from "react";
import type { UploadedFile } from "./types";

const MAX_FILES = 6;
const MAX_SIZE = 12 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);
const ACCEPTED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "pdf"]);

interface UploadFieldProps {
  uploads: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadField({ uploads, onChange }: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const addFiles = (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList);
    const availableSlots = Math.max(0, MAX_FILES - uploads.length);
    const accepted: UploadedFile[] = [];
    let rejectedReason = "";

    for (const file of incoming.slice(0, availableSlots)) {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ACCEPTED_TYPES.has(file.type) && !ACCEPTED_EXTENSIONS.has(extension)) {
        rejectedReason = "Use JPG, PNG, WebP or PDF files only.";
        continue;
      }

      if (file.size > MAX_SIZE) {
        rejectedReason = `${file.name} is larger than 12 MB.`;
        continue;
      }

      const id = `${file.name}-${file.lastModified}-${crypto.randomUUID()}`;
      accepted.push({
        id,
        file,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      });
    }

    if (incoming.length > availableSlots) {
      rejectedReason = `You can add up to ${MAX_FILES} files.`;
    }

    setError(rejectedReason);
    if (accepted.length > 0) {
      onChange([...uploads, ...accepted]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    const target = uploads.find((upload) => upload.id === id);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }
    onChange(uploads.filter((upload) => upload.id !== id));
    setError("");
  };

  return (
    <div>
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (event.currentTarget === event.target) {
            setIsDragging(false);
          }
        }}
        onDrop={handleDrop}
        className={`rounded-xl border border-dashed px-5 py-9 text-center transition-colors sm:px-8 sm:py-12 ${
          isDragging
            ? "border-bronze bg-surface"
            : "border-line bg-canvas hover:border-bronze"
        }`}
      >
        <div className="bg-surface text-bronze mx-auto flex size-11 items-center justify-center rounded-lg">
          <UploadCloud className="size-5" strokeWidth={1.8} />
        </div>
        <p className="text-ink mt-4 text-base font-semibold">
          Drop inspiration files here
        </p>
        <p id="upload-help" className="text-muted mx-auto mt-1 max-w-md text-sm leading-6">
          Upload a photo, screenshot, sketch, mood board, or floor plan. We can
          use it as the starting point for your custom request. JPG, PNG, WebP,
          or PDF; up to {MAX_FILES} files, 12 MB each.
        </p>
        <input
          ref={inputRef}
          id="inspiration-files"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf,.jpg,.jpeg,.png,.webp,.pdf"
          onChange={handleInput}
          className="sr-only"
          aria-describedby="upload-help upload-demo-note"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="focus-ring border-ink text-ink hover:bg-ink mt-5 min-h-11 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:text-white"
        >
          Browse files
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      {uploads.length > 0 && (
        <div className="mt-5" aria-live="polite">
          <p className="text-ink text-sm font-semibold">
            {uploads.length} {uploads.length === 1 ? "file" : "files"} ready
          </p>
          <ul className="mt-3 space-y-2">
            {uploads.map((upload) => (
              <li
                key={upload.id}
                className="border-line bg-surface flex min-w-0 items-center gap-3 rounded-lg border p-2.5"
              >
                {upload.previewUrl ? (
                  <span
                    role="img"
                    aria-label={`Preview of ${upload.file.name}`}
                    className="bg-canvas size-12 shrink-0 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${upload.previewUrl})` }}
                  />
                ) : (
                  <span className="bg-canvas text-bronze flex size-12 shrink-0 items-center justify-center rounded-md">
                    {upload.file.type === "application/pdf" ? (
                      <FileText className="size-5" />
                    ) : (
                      <FileImage className="size-5" />
                    )}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="text-ink block truncate text-sm font-semibold">
                    {upload.file.name}
                  </span>
                  <span className="text-muted block text-xs">
                    {formatFileSize(upload.file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(upload.id)}
                  className="focus-ring text-muted hover:bg-canvas hover:text-ink flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors"
                  aria-label={`Remove ${upload.file.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        id="upload-demo-note"
        className="border-line mt-5 flex gap-3 rounded-lg border bg-white/60 p-4"
      >
        <Info className="text-bronze mt-0.5 size-4 shrink-0" />
        <p className="text-muted text-sm leading-5">
          Demo preview: files stay in this browser tab only. Nothing is uploaded
          or stored permanently.
        </p>
      </div>
    </div>
  );
}
