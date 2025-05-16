// generateMetadata.ts
import { getBlogById } from "./getBlogById";

export async function generateMetadata({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlogById(params.blogId);

  if (!blog) {
    return {
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy bài viết bạn yêu cầu.",
    };
  }

  return {
    title: blog.title,
    description: blog.summary || blog.content.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.summary || blog.content.slice(0, 150),
      images: blog.imageTitle ? [blog.imageTitle] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary || blog.content.slice(0, 150),
      images: blog.imageTitle ? [blog.imageTitle] : [],
    },
  };
}
