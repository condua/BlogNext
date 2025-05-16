// getBlogById.ts
export interface Blog {
  id: string;
  title: string;
  content: string;
  summary?: string;
  imageTitle?: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export async function getBlogById(blogId: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${blogId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data as Blog;
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return null;
  }
}
