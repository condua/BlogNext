"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "@/redux/blogSlice";
import { AppDispatch, RootState } from "@/redux/store";
import BlogCard from "@/components/BlogCard";

interface Blog {
  _id: string;
  title: string;
  content: string;
  imageTitle?: string;
  author: string;
  createdAt: string;
}

// Hàm loại bỏ dấu và chuyển chữ thường
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function BlogList() {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );

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
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h1 className="text-3xl font-bold text-center mb-6">Các bài viết hay</h1>

      {/* Thanh tìm kiếm */}
      <div className="mb-8 text-center relative w-full mx-auto">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {isFocused && searchTerm && filteredBlogs.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-lg shadow-md mt-1 max-h-60 overflow-y-auto text-left">
            {filteredBlogs.slice(0, 5).map((blog) => (
              <li
                key={blog._id}
                onMouseDown={() => setSearchTerm(blog.title)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {blog.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy bài viết nào.
          </p>
        )}
      </div>
    </div>
  );
}
