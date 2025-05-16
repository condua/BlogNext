// lib/serverBlogService.ts
export async function fetchBlogByIdServer(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
      next: { revalidate: 3600 }, // ISR 1 giờ
    })
    
    if (!res.ok) throw new Error('Failed to fetch blog')
    
    const data = await res.json()
    return {
      ...data,
      imageTitle: data.imageTitle 
        ? new URL(data.imageTitle, process.env.NEXT_PUBLIC_API_URL).toString()
        : null,
    }
  } catch (error) {
    throw new Error('Error fetching blog')
  }
}