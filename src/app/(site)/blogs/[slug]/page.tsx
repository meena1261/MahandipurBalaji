import { getPostBySlug } from "@/utils/markdown";
import BlogDetails from "@/components/Blog/BlogDetails";
import ErrorPage from "@/app/not-found";
import { Metadata } from "next/types";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, [
    "title",
    "content",
    "coverImage",
    "publishedAt",
    "tags",
    "metaTitle",
    "metaDescription",
  ]);

  // Handle the case where the post is not found
  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The blog post you are looking for does not exist.",
      keywords: "error, blog, not found",
      openGraph: {
        title: "Blog Not Found",
        description: "The blog post you are looking for does not exist.",
        url: `${process.env.NEXT_PUBLIC_API_URL}/blog/not-found`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_API_URL}/default-image.jpg`,
            width: 800,
            height: 600,
            alt: "Blog Not Found",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found",
        description: "The blog post you are looking for does not exist.",
        images: ["https://example.com/default-image.jpg"],
      },
    };
  }

  const { metaTitle, title, metaDescription, tags, coverImage } = post;

  // Fallback to a default cover image if none is provided
  const imageUrl = coverImage || "https://example.com/default-cover-image.jpg";

  return {
    title: metaTitle || title,
    description: metaDescription || "Read this amazing blog.",
    keywords: tags?.join(", ") || "",
    openGraph: {
      title: metaTitle || title,
      description: metaDescription || "Read this amazing blog.",
      url: `/blog/${params.slug}`,
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
      description: metaDescription || "Read this amazing blog.",
      images: [imageUrl],
    },
  };
}


type Props = {
  params: { slug: string };
};

export default async function BlogPage({ params }: Props) {
  const post = await getPostBySlug(params.slug, [
    "title",
    "content",
    "coverImage",
    "publishedAt",
    "tags",
    "metaTitle",
    "metaDescription",
  ]);

  // Handle post not found
  if (!post) {
    return <ErrorPage />;
  }

  // Destructure post details
  const { title, content, coverImage, publishedAt, tags } = post;

  return (
    <>
      {/* Blog Details Component */}
      <BlogDetails
        title={title}
        content={content}
        coverImage={coverImage}
        publishedAt={publishedAt}
        tags={tags}
      />
    </>
  );
}
