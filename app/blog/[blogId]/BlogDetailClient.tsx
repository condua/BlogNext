// app/blogs/[blogId]/BlogDetailClient.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function BlogDetailClient({ blogId }: { blogId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { blog, loading, error } = useSelector((state: any) => state.blog);

  useEffect(() => {
    if (blogId) {
      dispatch(fetchBlogById(blogId));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.MathJax) {
      window.MathJax.typesetPromise();
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
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul", // Add ul tag
      "ol", // Add ol tag
      "li", // Add li tag
      "p", // Add p tag for paragraphs
      "a", // Add a tag for links
      "div", // Add div tag
      "span", // Add span tag
      "strong", // Add strong tag for bold text
      "em", // Add em tag for italic text
      "b", // Add b tag for bold text
      "i", // Add i tag for italic text
      "hr", // Add hr tag for horizontal rules
      "img", // Add img tag for images
      "br", // Add br tag for line breaks
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
      "href", // Add href attribute for links
      "alt", // Add alt attribute for images
    ],
  })
    .replace(
      /<table>/g,
      '<table class="min-w-full table-auto border-collapse text-left text-gray-700 my-6" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<th>/g,
      '<th class="px-4 py-2 bg-gray-100 font-bold text-sm border-b text-left" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<td>/g,
      '<td class="px-4 py-2 border-b" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<tr>/g,
      '<tr class="hover:bg-gray-50" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h1>/g,
      '<h1 class="text-3xl font-bold my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h2>/g,
      '<h2 class="text-2xl font-bold my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h3>/g,
      '<h3 class="text-xl font-bold my-3" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h4>/g,
      '<h4 class="text-lg font-bold my-3" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h5>/g,
      '<h5 class="text-md font-bold my-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<h6>/g,
      '<h6 class="text-sm font-bold my-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<ul>/g,
      '<ul class="list-inside list-disc pl-6 my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<ol>/g,
      '<ol class="list-inside list-decimal pl-6 my-4" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<li>/g,
      '<li class="mb-2" style="font-family: \'Times New Roman\', serif;">'
    )
    .replace(
      /<p>/g,
      '<p class="my-4" style="font-family: \'Times New Roman\', serif;">' // Add styling for paragraphs
    )
    .replace(
      /<a>/g,
      '<a class="text-blue-500 hover:underline" style="font-family: \'Times New Roman\', serif;">' // Add styling for links
    )
    .replace(
      /<div>/g,
      "<div style=\"font-family: 'Times New Roman', serif;\">" // Default div styling
    )
    .replace(
      /<span>/g,
      "<span style=\"font-family: 'Times New Roman', serif;\">" // Default span styling
    )
    .replace(
      /<strong>/g,
      '<strong class="font-bold" style="font-family: \'Times New Roman\', serif;">' // Bold text styling
    )
    .replace(
      /<em>/g,
      '<em class="italic" style="font-family: \'Times New Roman\', serif;">' // Italic text styling
    )
    .replace(
      /<b>/g,
      '<b class="font-bold" style="font-family: \'Times New Roman\', serif;">' // Bold text styling
    )
    .replace(
      /<i>/g,
      '<i class="italic" style="font-family: \'Times New Roman\', serif;">' // Italic text styling
    )
    .replace(
      /<hr>/g,
      '<hr class="my-4 border-gray-300" style="font-family: \'Times New Roman\', serif;">' // Horizontal rule styling
    )
    .replace(
      /<img>/g,
      '<img class="my-4" style="font-family: \'Times New Roman\', serif;">' // Image styling
    )
    .replace(
      /<br>/g,
      "<br />" // Line break
    );
  const handlePrint = () => {
    const printContent = document.getElementById("printable-blog").innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
          <html>
            <head>
              <title>Printable Page</title>
              <style>
                body {
                  font-family: "Times New Roman", serif;
                  margin: 20mm;
                  position: relative;
                  color: #000;
                  line-height: 1.8;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
                h1, h2, h3, h4, h5, h6 {
                  margin-top: 1.5rem;
                  line-height: 1.4;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  border: 1px solid #ccc;
                  padding: 12px;
                  text-align: left;
                }
                p {
                  margin-bottom: 10px;
                }
              </style>
              <script type="text/javascript" async
                src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
              </script>
            </head>
            <body>
              <div>
                ${printContent}
              </div>
            </body>
          </html>
        `);
    iframeDoc.close();

    // Gọi lại MathJax để render công thức toán học
    iframe.contentWindow.onload = () => {
      iframe.contentWindow.MathJax.Hub.Queue([
        "Typeset",
        iframe.contentWindow.MathJax.Hub,
      ]);
    };

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };
  return (
    <div className="px-6 py-10 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
      {blog.imageTitle && (
        <img
          src={blog.imageTitle}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
          loading="lazy"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
        <div>
          <span className="mr-4">📅 {formattedDate}</span>
          <span>⏳ {getReadingTime(blog.content)} phút đọc</span>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          🖨️ In bài
        </button>
      </div>

      <div id="printable-blog" className="prose max-w-none">
        <MathJaxRenderer content={formattedContent} />
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 text-right text-gray-600 italic">
        👨💻 Tác giả: {blog.author}
      </div>
    </div>
  );
}
