import { getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}
interface PageProps {
  params: Params;
}

export async function generateMetadata({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | My Blog",
      description: "Sorry, the post you are looking for does not exist.",
      openGraph: {
        title: "Post Not Found",
        description: "Sorry, the post you are looking for does not exist.",
        images: [],
        type: "article",
      },
      twitter: {
        card: "summary",
        title: "Post Not Found",
        description: "Sorry, the post you are looking for does not exist.",
        images: [],
      },
    };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">
          {post.title}
        </h1>
        <p className="text-gray-600 mb-8 italic">{post.description}</p>
        <div className="prose prose-lg prose-indigo max-w-none text-gray-800 leading-relaxed">
          {post.content.split("\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
