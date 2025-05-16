// app/blogs/[blogId]/page.tsx
import { Metadata } from "next";
import { fetchBlogByIdServer } from "@/lib/serverBlogService";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: {
    blogId: string;
  };
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const blog = await fetchBlogByIdServer(params.blogId);

    const metadata: Metadata = {
      title: blog.title,
      description: blog.content.slice(0, 160),
      openGraph: {
        title: blog.title,
        description: blog.content.slice(0, 160),
        images: blog.imageTitle
          ? [{ url: new URL(blog.imageTitle, process.env.SITE_URL).toString() }]
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
          ? [new URL(blog.imageTitle, process.env.SITE_URL).toString()]
          : [],
      },
    };

    return metadata;
  } catch (error) {
    return {
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết được yêu cầu",
    };
  }
}

export default function BlogDetailPage({ params }: PageProps) {
  return <BlogDetailClient blogId={params.blogId} />;
}
