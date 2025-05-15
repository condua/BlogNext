"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "@/redux/blogSlice";
import DOMPurify from "dompurify";
import Head from "next/head";
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

export default function BlogDetail() {
  const { blogId } = useParams() as { blogId: string };
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

  // Khi blog thay đổi, gọi MathJax để render lại toán học
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [blog]);

  // Cập nhật title và các meta tags
  //   useEffect(() => {
  //     if (blog) {
  //       document.title = blog.title;

  //       const ogTitle = document.querySelector('meta[property="og:title"]');
  //       const ogDescription = document.querySelector(
  //         'meta[property="og:description"]'
  //       );
  //       const ogImage = document.querySelector('meta[property="og:image"]');
  //       if (ogTitle) ogTitle.setAttribute("content", blog.title);
  //       if (ogDescription)
  //         ogDescription.setAttribute("content", blog.summary || "");
  //       if (ogImage) ogImage.setAttribute("content", blog.imageTitle || "");
  //     }
  //   }, [blog]);

  if (loading) return <p className="p-6">Đang tải bài viết...</p>;
  if (error) return <p className="p-6 text-red-500">Lỗi: {error}</p>;
  if (!blog) return <p className="p-6">Không tìm thấy bài viết.</p>;

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200); // khoảng 200 từ/phút
  };

  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(blog.createdAt));

  // Sanitize và thêm class/style cho các tag HTML
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
  })
    .replace(
      /<table>/g,
      '<table class="min-w-full table-auto border-collapse text-left text-gray-700 my-6" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<th>/g,
      '<th class="px-4 py-2 bg-gray-100 font-bold text-sm border-b text-left" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<td>/g,
      '<td class="px-4 py-2 border-b" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<tr>/g,
      '<tr class="hover:bg-gray-50" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<h1>/g,
      '<h1 class="text-3xl font-bold my-4" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<h2>/g,
      '<h2 class="text-2xl font-bold my-4" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<h3>/g,
      '<h3 class="text-xl font-bold my-3" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<ul>/g,
      '<ul class="list-inside list-disc pl-6 my-4" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<ol>/g,
      '<ol class="list-inside list-decimal pl-6 my-4" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<li>/g,
      '<li class="mb-2" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<p>/g,
      '<p class="my-4" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<a /g,
      '<a class="text-blue-500 hover:underline" style="font-family:\'Times New Roman\',serif;" '
    )
    .replace(/<div>/g, "<div style=\"font-family:'Times New Roman',serif;\">")
    .replace(/<span>/g, "<span style=\"font-family:'Times New Roman',serif;\">")
    .replace(
      /<strong>/g,
      '<strong class="font-bold" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<em>/g,
      '<em class="italic" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<b>/g,
      '<b class="font-bold" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<i>/g,
      '<i class="italic" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<hr>/g,
      '<hr class="my-4 border-gray-300" style="font-family:\'Times New Roman\',serif;">'
    )
    .replace(
      /<img /g,
      '<img class="my-4" style="max-width:100%; height:auto; font-family:\'Times New Roman\',serif;" '
    )
    .replace(/<br>/g, "<br />");

  const handlePrint = () => {
    const printContent = document.getElementById("printable-blog")?.innerHTML;
    if (!printContent) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow!.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>${blog.title}</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 20mm; color: #000; line-height: 1.8; }
            img { max-width: 100%; height: auto; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ccc; padding: 12px; text-align: left; }
            h1, h2, h3 { margin-top: 1.5rem; line-height: 1.4; }
          </style>
          <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    doc.close();

    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
  };

  return (
    <div className="px-6 py-10 w-full md:w-3/6 m-auto">
      <Head>
        {/* Cấu hình MathJax 3 */}
        <title>{blog.title}</title>
        <meta
          name="description"
          content={blog.content.slice(0, 100) || "Bài viết chi tiết"}
        />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.content.slice(0, 100) || ""}
        />
        {blog.imageTitle && (
          <meta property="og:image" content={blog.imageTitle} />
        )}
        <meta property="og:type" content="article" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
              displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
            },
            svg: {
              fontCache: 'global'
            }
          };
        `,
          }}
        />
        <script
          async
          id="mathjax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
      </Head>

      {/* Ảnh đầu trang */}
      {blog.imageTitle && (
        <img
          src={blog.imageTitle}
          alt={blog.title}
          className="w-full max-h-100 object-cover rounded mb-6 mx-auto"
          // w-40 = 10rem = 160px, h-40 tương tự
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-2">
        {formattedDate} • {getReadingTime(blog.content)} phút đọc
      </div>
      <div className="mb-6">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          In bài viết
        </button>
      </div>

      <div id="printable-blog" className="prose max-w-none">
        <MathJaxRenderer content={formattedContent} />
      </div>

      {/* Tên tác giả cuối trang */}
      <div className="mt-10 text-right text-gray-600 italic bold">
        {blog.author}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: blog.imageTitle,
            author: { "@type": "Person", name: blog.author },
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt || blog.createdAt,
            description: blog.summary || "",
            articleBody: blog.content,
          }),
        }}
      />
    </div>
  );
}
