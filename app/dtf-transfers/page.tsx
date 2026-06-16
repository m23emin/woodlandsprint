import { ServicePageView, serviceMetadata } from "@/app/components/service-page";
import { getServicePage } from "@/lib/service-data";

const page = getServicePage("dtf-transfers")!;

export const metadata = serviceMetadata(page);

export default function DtfTransfersPage() {
  return <ServicePageView page={page} />;
}
