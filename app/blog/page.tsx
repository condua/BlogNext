"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/blogSlice";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";

interface Blog {
  _id: string;
  title: string;
  author: string;
  // thêm các field khác nếu có (thumbnail, content, createdAt...)
}

// Hàm chuẩn hoá tiếng Việt để tìm kiếm không dấu
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function BlogListPage() {
  const dispatch: AppDispatch = useDispatch();

  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const filteredBlogs = blogs.filter((blog: Blog) =>
    normalizeText(blog.title).includes(normalizeText(searchTerm))
  );

  if (loading) return <p className="text-center mt-10">Đang tải bài viết...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Lỗi tải dữ liệu: {error}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          📚 Các Bài Viết
        </h2>

        {/* Thanh tìm kiếm */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {isFocused && searchTerm && filteredBlogs.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-lg shadow-md mt-1 max-h-60 overflow-y-auto">
              {filteredBlogs.slice(0, 5).map((blog: Blog) => (
                <li
                  key={blog._id}
                  onMouseDown={() => setSearchTerm(blog.title)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {blog.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Danh sách bài viết */}
        <ul className="space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog: Blog) => (
              <li
                key={blog._id}
                className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-2xl font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-200"
                >
                  {blog.title}
                </Link>
                <p className="mt-2 text-gray-600">{blog.author}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              Không tìm thấy bài viết nào.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
