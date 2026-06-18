"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/*,.pdf,.ai,.eps,.svg";

const artworkChecklist = [
  "Transparent background?",
  "Correct print size?",
  "High resolution (300 DPI)?",
  "Not mirrored?",
  "No unwanted white box?",
];

type DesignUploadProps = {
  name?: string;
  required?: boolean;
  /** Preload a file (e.g. a generated mockup) by data URL */
  initialDataUrl?: string | null;
  initialName?: string | null;
};

export function DesignUpload({
  name = "design",
  required = false,
  initialDataUrl = null,
  initialName = null,
}: DesignUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearPreview = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }, [preview]);

  const assignFile = useCallback(
    (next: File | null) => {
      clearPreview();
      setError(null);

      if (!next) {
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      if (next.size > MAX_BYTES) {
        setError("File is too large — max 10 MB.");
        return;
      }

      setFile(next);

      if (inputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(next);
        inputRef.current.files = dt.files;
      }

      if (next.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(next));
      }
    },
    [clearPreview],
  );

  useEffect(() => {
    if (!initialDataUrl) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(initialDataUrl);
        const blob = await res.blob();
        if (cancelled) return;
        const fileName = initialName || "mockup.png";
        assignFile(new File([blob], fileName, { type: blob.type || "image/png" }));
      } catch {
        /* ignore — user can still upload manually */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialDataUrl, initialName, assignFile]);

  function onDrop(event: React.DragEvent) {
    event.preventDefault();
    setDragOver(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped) assignFile(dropped);
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    assignFile(event.target.files?.[0] ?? null);
  }

  function removeFile() {
    assignFile(null);
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        id="design"
        name={name}
        type="file"
        accept={ACCEPT}
        required={required}
        className="sr-only"
        onChange={onFileChange}
      />

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
            dragOver
              ? "border-brand bg-brand/5"
              : "border-border bg-background hover:border-brand/40 hover:bg-brand/5"
          }`}
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-foreground">Drag & drop your design here</p>
          <p className="mt-1 text-xs text-muted">or click to browse</p>
          <p className="mt-3 text-xs text-muted">PNG, JPG, PDF, AI, EPS, SVG — max 10 MB</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          {preview ? (
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Design preview" className="h-full w-full object-contain p-4" />
            </div>
          ) : (
            <div className="flex items-center gap-4 px-5 py-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
                <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="truncate text-xs text-muted">{file.name}</p>
            <button
              type="button"
              onClick={removeFile}
              className="shrink-0 text-xs font-semibold text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-border bg-background px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Before uploading</p>
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {artworkChecklist.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
        <Link href="/artwork-requirements" className="mt-2 inline-block text-xs font-medium text-brand hover:underline">
          Full artwork guide →
        </Link>
      </div>
    </div>
  );
}
