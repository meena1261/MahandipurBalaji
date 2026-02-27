import Breadcrumb from "@/components/Common/Breadcrumb";
import Portfolio from "@/components/Portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Portfolio Page | Technoboat",
  description: "Portfolio Page",
};

const PortfolioPage = () => {
  return (
    <>
      <Breadcrumb pageName="Portfolio Page" />

      <Portfolio />
    </>
  );
};

export default PortfolioPage;
