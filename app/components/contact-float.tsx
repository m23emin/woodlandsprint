import { siteContact } from "@/lib/site-config";
import { WhatsAppIcon } from "@/app/components/icons/whatsapp-icon";

/**
 * Floating WhatsApp + call buttons (bottom-right).
 * Buttons render only when the matching number is set in `siteContact`.
 */
export function ContactFloat() {
  const { phone, whatsapp, whatsappMessage } = siteContact;
  if (!phone && !whatsapp) return null;

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`
    : null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          aria-label="Call us"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/20 transition hover:scale-105"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      )}
    </div>
  );
}
