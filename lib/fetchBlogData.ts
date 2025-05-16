// lib/fetchBlogData.ts
import { Blog } from "@/types/post";

export async function fetchBlogDataById(blogId: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`, {
      cache: "force-cache", // hoặc "no-store" nếu muốn SSR luôn mới
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}
