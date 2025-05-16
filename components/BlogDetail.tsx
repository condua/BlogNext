// components/BlogDetail.tsx
"use client";

import DOMPurify from "dompurify";
import MathJaxRenderer from "./MathJaxRenderer";
import { useEffect } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  imageTitle?: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export default function BlogDetail({ blog }: { blog: Blog }) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [blog]);

  const formattedContent = DOMPurify.sanitize(blog.content /* ... */);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(blog.createdAt));

  return (
    <div className="px-6 py-10 w-full md:w-3/6 m-auto">
      {blog.imageTitle && (
        <img
          src={blog.imageTitle}
          alt={blog.title}
          className="w-full object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{formattedDate}</p>
      <div
        id="printable-blog"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
      {/* <MathJaxRenderer /> */}
    </div>
  );
}
