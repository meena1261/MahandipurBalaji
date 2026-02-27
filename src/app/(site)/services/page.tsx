import ServiceClientPage from "@/components/Admin/Tables/ServiceClientWebsite";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title:
    "Service Page",
  description: "Service Blog",
};

const ServicePage = () => {




  return (
    <>

      <ServiceClientPage />

    </>
  );
};

export default ServicePage;
