import { Metadata } from "next";
import { fetchBlogByIdServer } from "@/lib/serverBlogService";
import BlogDetailClient from "./BlogDetailClient";

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}): Promise<Metadata> {
  try {
    const blog = await fetchBlogByIdServer(params.blogId);

    return {
      title: blog.title,
      description: blog.content.slice(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.content.slice(0, 160),
        images: blog.imageTitle
          ? [
              {
                url: new URL(blog.imageTitle, process.env.SITE_URL!).toString(),
              },
            ]
          : [],
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt || blog.createdAt,
        authors: [blog.author],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.content.slice(0, 160),
        images: blog.imageTitle
          ? [new URL(blog.imageTitle, process.env.SITE_URL!).toString()]
          : [],
      },
    };
  } catch {
    return {
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết được yêu cầu",
    };
  }
}

// Page component
export default function BlogDetailPage({
  params,
}: {
  params: { blogId: string };
}) {
  return <BlogDetailClient blogId={params.blogId} />;
}
