/** Active logo variant — change when user picks 1, 2, or 3 */
export const activeLogoVariant = "v1-product" as const;

export type LogoVariant = "v1-product" | "v2-gangsheet" | "v3-monogram";

export const logoVariants: Record<
  LogoVariant,
  { label: string; full: string; icon: string; description: string }
> = {
  "v1-product": {
    label: "Ürün odaklı",
    full: "/brand/variants/v1-product.png",
    icon: "/brand/logo-icon.png",
    description: "Tişört + DTF transfer — genel müşteri ve launch için",
  },
  "v2-gangsheet": {
    label: "Gang sheet / DTF",
    full: "/brand/variants/v2-gangsheet.png",
    icon: "/brand/logo-icon.png",
    description: "DTF grid — reseller ve gang sheet odaklı büyüme",
  },
  "v3-monogram": {
    label: "WP Monogram",
    full: "/brand/variants/v3-monogram.png",
    icon: "/brand/logo-icon.png",
    description: "Premium harf markası — marka tanınınca",
  },
};
