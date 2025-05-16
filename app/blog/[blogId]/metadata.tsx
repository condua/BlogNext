import { Metadata } from "next";

type Blog = {
  title: string;
  summary?: string;
  content: string;
  imageTitle?: string;
};

async function fetchBlogDataById(blogId: string): Promise<Blog> {
  const res = await fetch(`${process.env.API_BASE_URL}/blogs/${blogId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  const blog = await fetchBlogDataById(params.blogId);

  return {
    title: blog?.title ?? "Bài viết",
    description: blog.summary || blog.content?.slice(0, 100),
    openGraph: {
      title: blog.title,
      description: blog.summary || blog.content?.slice(0, 100),
      images: blog.imageTitle ? [blog.imageTitle] : [],
      type: "article",
    },
  };
}
