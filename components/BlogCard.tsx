"use client";

import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageTitle?: string;
  author: string;
  createdAt: string;
}

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${blog._id}`);
  };

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(blog.createdAt));

  const getReadingTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readingTime = getReadingTime(blog.content);

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={blog.imageTitle || "/default-image.jpg"}
        alt={blog.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/default-image.jpg";
        }}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm">
          {formattedDate} - {readingTime} phút đọc 👁
        </p>
      </div>
      <p className="px-5 pb-5">{blog.author}</p>
    </div>
  );
}
