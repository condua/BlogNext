import { Post } from "@/types/post";

export const posts: Post[] = [
  {
    id: "1",
    title: "Hello Next.js 13",
    slug: "hello-nextjs-13",
    description: "This is a sample blog post using the new App Router.",
    image: "https://www.mlpa.site/logo.png",
    content: `This is a sample blog post using the new App Router.
    
More detailed content here...`,
  },
  {
    id: "2",
    title: "TypeScript in Next.js",
    slug: "typescript-nextjs",
    description: "Learn how to use TypeScript in your Next.js app!",
    image: "https://www.mlpa.site/logo.png",
    content: `Learn how to use TypeScript in your Next.js app!
    
More detailed content here...`,
  },
];

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
