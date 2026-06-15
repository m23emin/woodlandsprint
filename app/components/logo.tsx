import Image from "next/image";
import Link from "next/link";
import { activeLogoVariant, logoVariants } from "@/lib/brand-config";

type LogoProps = {
  variant?: "full" | "icon";
  className?: string;
  href?: string;
  /** White backdrop — for dark hero / footer backgrounds */
  onDark?: boolean;
};

export function Logo({ variant = "full", className = "", href, onDark = false }: LogoProps) {
  const isIcon = variant === "icon";
  const src = isIcon ? logoVariants[activeLogoVariant].icon : "/brand/logo-full.png";

  const image = isIcon ? (
    <Image
      src={src}
      alt="Woodlands Print"
      width={40}
      height={40}
      className={`shrink-0 rounded-lg object-contain ${className}`}
      priority
    />
  ) : (
    <Image
      src={src}
      alt="Woodlands Print — DTF Transfers & Custom Shirts"
      width={260}
      height={52}
      className={`h-9 w-auto shrink-0 object-contain object-left sm:h-10 ${className}`}
      priority
    />
  );

  const wrapped = onDark ? (
    <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-md shadow-black/20">
      {image}
    </span>
  ) : (
    image
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center" aria-label="Woodlands Print — Home">
        {wrapped}
      </Link>
    );
  }

  return wrapped;
}
