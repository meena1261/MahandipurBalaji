import Breadcrumb from "@/components/Common/Breadcrumb";
import PortfolioDetail from "@/components/Portfolio/detail";
import { getPostBySlug, getPostBySlugPortfolio } from "@/utils/markdown";
import axios from "axios";
import { log } from "console";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title:
//     "Portfolio Detail Page | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is portfolio page description",
// };


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio?slug=${params.slug}`);
  const portfolio = response.data.portfolios[0];


  // Handle the case where the post is not found
  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
      description: "The Portfolio post you are looking for does not exist.",
      keywords: "error, Portfolio, not found",
      openGraph: {
        title: "Portfolio Not Found",
        description: "The Portfolio post you are looking for does not exist.",
        url: `${process.env.NEXT_PUBLIC_API_URL}/Portfolio/not-found`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`,
            width: 800,
            height: 600,
            alt: "Portfolio Not Found",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Portfolio Not Found",
        description: "The blog post you are looking for does not exist.",
        images: ["https://example.com/default-image.jpg"],
      },
    };
  }

  const { metaTitle, title, metaDescription, tags, coverImage } = portfolio;

  // Fallback to a default cover image if none is provided
  const imageUrl = coverImage || "https://example.com/default-cover-image.jpg";

  return {
    title: metaTitle || title,
    description: metaDescription || "Read this amazing portfolio.",
    keywords: tags?.join(", ") || "",
    openGraph: {
      title: metaTitle || title,
      description: metaDescription || "Read this amazing portfolio.",
      url: `/portfolio/${params.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || "Blog Cover Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle || title,
      description: metaDescription || "Read this amazing portfolio.",
      images: [imageUrl],
    },
  };
}

type Props = {
  params: { slug: string };
};
export default async function PortfolioPage({ params }: Props) {
  return (
    <>
      <Breadcrumb pageName="Portfolio Detail Page" />

      <PortfolioDetail slug={params.slug} />
    </>
  );
};

// export default PortfolioPage;
