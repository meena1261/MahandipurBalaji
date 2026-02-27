import axios from "axios";
// import fs from "fs";
// import matter from "gray-matter";
// import { join } from "path";
// const postsDirectory = join(process.cwd(), "markdown/service");

// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory);
// }




export async function getPostBySlug(slug: string, fields: string[] = []) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog?slug=${slug}`);
    const blog = response.data.blog;

    const items: { [key: string]: any } = {};

    // Process content to handle images
    const processImages = (content: string) => {
      return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
    };

    // Map fields from API response to the required structure
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = blog.slug;
      }
      if (field === "views") {
        items[field] = blog.views;
      }
      if (field === "metaTitle") {
        items[field] = blog.metaTitle;
      }
      if (field === "metaDescription") {
        items[field] = blog.metaDescription;
      }
      if (field === "views") {
        items[field] = blog.views;
      }
      if (field === "content") {
        items[field] = processImages(blog.content);
      }
      if (field === "coverImage") {
        items[field] = blog.featuredImage; // Map the API's featuredImage to coverImage
      }
      if (field === "metadata") {
        items[field] = {
          title: blog.metaTitle || blog.title,
          description: blog.metaDescription,
          coverImage: blog.featuredImage,
        };
      }
      if (blog[field] !== undefined) {
        items[field] = blog[field];
      }
    });

    return items;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}


export async function pages(slug: string, fields: string[] = []) {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pages?slug=${slug}`);
    const page = response.data.page;

    const items: { [key: string]: any } = {};

    // Map requested fields to items
    fields.forEach((field) => {
      if (page[field] !== undefined) {
        items[field] = page[field];
      }
    });

    return items;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}


export async function getAllPosts(fields: string[] = []) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);
    const blogs = response.data.blogs;

    const posts = blogs.map((blog: any) => {
      const filteredBlog: { [key: string]: any } = {};

      fields.forEach((field) => {
        if (field === "slug") {
          filteredBlog[field] = blog.slug;
        }
        if (field === "content") {
          filteredBlog[field] = blog.content;
        }
        if (field === "coverImage") {
          filteredBlog[field] = blog.featuredImage; // Map API's featuredImage to coverImage
        }
        if (field === "publishedAt") {
          filteredBlog[field] = blog.publishedAt; // Map API's featuredImage to coverImage
        }
        if (field === "metadata") {
          filteredBlog[field] = {
            title: blog.title,
            coverImage: blog.featuredImage,
            date: blog.publishedAt,
          };
        }
        if (blog[field] !== undefined) {
          filteredBlog[field] = blog[field];
        }
      });

      return filteredBlog;
    });

    return posts.sort((post1: { date: string | number | Date; }, post2: { date: string | number | Date; }) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getservice(fields: string[] = []) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/service`);
    const service = response.data.services;

    const posts = service.map((blog: any) => {
      const filteredBlog: { [key: string]: any } = {};

      fields.forEach((field) => {
        if (field === "title") {
          filteredBlog[field] = blog.title;
        }
        if (field === "content") {
          filteredBlog[field] = blog.content;
        }
        if (field === "icon") {
          filteredBlog[field] = blog.icon;
        }
        // if (field === "coverImage") {
        //   filteredBlog[field] = blog.featuredImage; // Map API's featuredImage to coverImage
        // }
        // if (field === "publishedAt") {
        //   filteredBlog[field] = blog.publishedAt; // Map API's featuredImage to coverImage
        // }
        // if (field === "metadata") {
        //   filteredBlog[field] = {
        //     title: blog.title,
        //     coverImage: blog.featuredImage,
        //     date: blog.publishedAt,
        //   };
        // }
        // if (blog[field] !== undefined) {
        //   filteredBlog[field] = blog[field];
        // }
      });

      return filteredBlog;
    });

    return posts.sort((post1: { date: string | number | Date; }, post2: { date: string | number | Date; }) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}


export async function getConfigData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/config?id=${process.env.NEXT_PUBLIC_CONFIG_ID}`);
    const config = response.data.config;

    if (config) {
      // console.log("Config Data: ", config);
      return config; // Return the config data or use it as needed
    } else {
      console.error("Config not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching config data:", error);
    return null;
  }
}

export async function getPostBySlugPortfolio(slug: string, fields: string[] = []) {
  
  
  try {
    // console.log("wht is this ");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolio?slug=${slug}`);
    const blog = response.data.portfolios[0];

    const items: { [key: string]: any } = {};

    // Process content to handle images
    const processImages = (content: string) => {
      return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
    };

    // Map fields from API response to the required structure
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = blog.slug;
      }
      if (field === "views") {
        items[field] = blog.views;
      }
      if (field === "metaTitle") {
        items[field] = blog.metaTitle;
      }
      if (field === "metaDescription") {
        items[field] = blog.metaDescription;
      }
      if (field === "views") {
        items[field] = blog.views;
      }
      if (field === "content") {
        items[field] = processImages(blog.content);
      }
      if (field === "coverImage") {
        items[field] = blog.featuredImage; // Map the API's featuredImage to coverImage
      }
      if (field === "metadata") {
        items[field] = {
          title: blog.metaTitle || blog.title,
          description: blog.metaDescription,
          coverImage: blog.featuredImage,
        };
      }
      if (blog[field] !== undefined) {
        items[field] = blog[field];
      }
    });

    return items;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}