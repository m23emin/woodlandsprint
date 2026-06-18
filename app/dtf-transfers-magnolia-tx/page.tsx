import { getLocalPageBySlug } from "@/lib/local-seo-data";
import { LocalSeoPageView, localSeoMetadata } from "../components/local-seo-page";

const page = getLocalPageBySlug("dtf-transfers-magnolia-tx")!;

export const metadata = localSeoMetadata(page);

export default function Page() {
  return <LocalSeoPageView page={page} />;
}
