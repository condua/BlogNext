import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          📚 Blog Posts
        </h2>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-2xl font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-200"
              >
                {post.title}
              </Link>
              {/* <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
