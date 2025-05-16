"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "@/redux/blogSlice";
import DOMPurify from "dompurify";
import MathJaxRenderer from "@/components/MathJaxRenderer";
import { AppDispatch } from "@/redux/store";

interface Blog {
  id: string;
  title: string;
  content: string;
  summary?: string;
  imageTitle?: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

interface Props {
  blogId: string;
}

export default function BlogDetail({ blogId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { blog, loading, error } = useSelector((state: any) => state.blog) as {
    blog: Blog;
    loading: boolean;
    error: string | null;
  };

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogById(blogId));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [blog]);

  if (loading) return <p className="p-6">Đang tải bài viết...</p>;
  if (error) return <p className="p-6 text-red-500">Lỗi: {error}</p>;
  if (!blog) return <p className="p-6">Không tìm thấy bài viết.</p>;

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(blog.createdAt));

  const formattedContent = DOMPurify.sanitize(blog.content, {
    ADD_TAGS: [
      "iframe",
      "table",
      "th",
      "tr",
      "td",
      "ul",
      "ol",
      "li",
      "p",
      "a",
      "div",
      "span",
      "strong",
      "em",
      "b",
      "i",
      "hr",
      "img",
      "br",
    ],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "height",
      "width",
      "class",
      "href",
      "alt",
    ],
  });
  // ... (các replace class như bạn đã làm) ...
  // Mình giữ nguyên phần replace (copy từ code bạn cho sẵn)

  return (
    <div className="px-6 py-10 w-full md:w-3/6 m-auto">
      {blog.imageTitle && (
        <img
          src={blog.imageTitle}
          alt={blog.title}
          className="w-full max-h-100 object-cover rounded mb-6 mx-auto"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-2">
        {formattedDate} • {getReadingTime(blog.content)} phút đọc
      </div>

      <div id="printable-blog" className="prose max-w-none">
        <MathJaxRenderer content={formattedContent} />
      </div>

      <div className="mt-10 text-right text-gray-600 italic bold">
        {blog.author}
      </div>
    </div>
  );
}
