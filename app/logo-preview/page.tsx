import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { activeLogoVariant, logoVariants } from "@/lib/brand-config";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Logo Karşılaştırma | Woodlands Print",
  robots: { index: false, follow: false },
};

const variants = [
  {
    id: "v1",
    file: "/brand/variants/v1-product.png",
    title: "1 — Ürün Odaklı",
    subtitle: "Tişört + DTF transfer film",
    pros: ["Müşteri hemen ne sattığını anlar", "Local + B2C için güçlü", "Instagram'da açıklayıcı"],
    cons: ["Biraz generic olabilir", "Çok detaylıysa küçükte zorlanır"],
    bestFor: "İlk müşteri, Marketplace, genel local müşteri",
  },
  {
    id: "v2",
    file: "/brand/variants/v2-gangsheet.png",
    title: "2 — Gang Sheet / DTF Odaklı",
    subtitle: "Film grid + transfer sheet",
    pros: ["DTF / Etsy / reseller'a net mesaj", "Nişinde fark yaratır", "B2B transfer müşterisi"],
    cons: ["Tişört arayan müşteriye daha az net", "Yeni marka için daha teknik"],
    bestFor: "Gang sheet satışı, print shop müşterileri, DTF odaklı büyüme",
  },
  {
    id: "v3",
    file: "/brand/variants/v3-monogram.png",
    title: "3 — WP Monogram",
    subtitle: "Modern minimal harf markası",
    pros: ["Premium ve modern", "Favicon / küçük boyut mükemmel", "Uzun vadeli marka"],
    cons: ["İlk bakışta baskı işi belli olmayabilir", "Marka tanınınca güçlenir"],
    bestFor: "Premium marka, kartvizit, favicon, uzun vadeli büyüme",
  },
];

const variantKey: Record<string, keyof typeof logoVariants> = {
  v1: "v1-product",
  v2: "v2-gangsheet",
  v3: "v3-monogram",
};

export default function LogoPreviewPage() {
  return (
    <>
      <SiteHeader variant="light" />
      <main className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-medium text-brand hover:underline">
            ← Ana sayfaya dön
          </Link>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Logo Karşılaştırma
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            3 tema yan yana — hangisini beğendiğini söyle, siteye o logo yüklenir. Şu an header&apos;da
            aktif olan:{" "}
            <strong className="text-foreground">
              {logoVariants[activeLogoVariant].label} ({activeLogoVariant})
            </strong>
            .
          </p>

          <div className="mt-10 space-y-8">
            {variants.map((v) => {
              const isActive = variantKey[v.id] === activeLogoVariant;
              return (
              <article
                key={v.id}
                className={`overflow-hidden rounded-2xl border shadow-sm ${
                  isActive
                    ? "border-brand ring-2 ring-brand/20 bg-brand/5"
                    : "border-border bg-surface"
                }`}
              >
                {isActive && (
                  <div className="bg-brand px-4 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Aktif logo
                  </div>
                )}
                <div className="border-b border-border bg-background px-6 py-8 sm:px-10">
                  <Image
                    src={v.file}
                    alt={v.title}
                    width={600}
                    height={150}
                    className="mx-auto h-auto w-full max-w-lg object-contain"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{v.id}</p>
                  <h2 className="mt-1 text-xl font-bold text-foreground">{v.title}</h2>
                  <p className="text-sm text-muted">{v.subtitle}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                        Artıları
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted">
                        {v.pros.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="text-brand">+</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                        Eksileri
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted">
                        {v.cons.map((c) => (
                          <li key={c} className="flex gap-2">
                            <span className="text-red-500">−</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 rounded-xl bg-brand/5 px-4 py-3 text-sm text-foreground">
                    <span className="font-semibold">En iyi: </span>
                    {v.bestFor}
                  </p>
                </div>
              </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center sm:p-8">
            <p className="font-semibold text-foreground">Hangisini seçiyorsun?</p>
            <p className="mt-2 text-sm text-muted">
              Bana &quot;1&quot;, &quot;2&quot; veya &quot;3&quot; yaz — seçtiğini header, footer ve favicon&apos;a
              yüklerim.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
