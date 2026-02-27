import BlogClientPage from "@/components/Admin/Tables/BlogClientWebsite";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title:
    "Blog Page",
  description: "New Blog",
};

const Blog = () => {




  return (
    <>

      <BlogClientPage />

    </>
  );
};

export default Blog;
