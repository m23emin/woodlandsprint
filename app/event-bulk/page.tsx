import { ServicePageView, serviceMetadata } from "@/app/components/service-page";
import { getServicePage } from "@/lib/service-data";

const page = getServicePage("event-bulk")!;

export const metadata = serviceMetadata(page);

export default function EventBulkPage() {
  return <ServicePageView page={page} />;
}
