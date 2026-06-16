import { ServicePageView, serviceMetadata } from "@/app/components/service-page";
import { getServicePage } from "@/lib/service-data";

const page = getServicePage("custom-shirts")!;

export const metadata = serviceMetadata(page);

export default function CustomShirtsPage() {
  return <ServicePageView page={page} />;
}
