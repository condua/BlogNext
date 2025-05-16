// app/blogs/[blogId]/page.tsx
import { Metadata } from "next";
import { fetchBlogByIdServer } from "@/lib/serverBlogService";
import BlogDetailClient from "./BlogDetailClient";

// Kiểu props chính xác cho dynamic route
// type PageProps = {
//   params: {
//     blogId: string;
//   };
// };

// Hàm tạo metadata động cho SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  try {
    const { blogId } = await params;

    const blog = await fetchBlogByIdServer(blogId);
    const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ");

    return {
      title: blog.title,
      description: stripHtml(blog.content).slice(0, 160),
      openGraph: {
        title: blog.title,
        description: stripHtml(blog.content).slice(0, 160),
        images: blog.imageTitle,
        type: "article",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt || blog.createdAt,
        authors: [blog.author],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: stripHtml(blog.content).slice(0, 160),
        images: blog.imageTitle
          ? [new URL(blog.imageTitle, process.env.SITE_URL).toString()]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết được yêu cầu",
    };
  }
}

// Component chính
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return <BlogDetailClient blogId={blogId} />;
}
