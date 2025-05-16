// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Providers } from "./providers"; // 👈 thêm dòng này
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Blog",
  description: "A simple Next.js blog with Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Providers>
          {" "}
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.MathJax = {
              tex: {
                inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
              },
              svg: { fontCache: 'global' }
            };
          `,
              }}
            />
            <script
              id="mathjax-script"
              async
              src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            />
          </Head>
          {/* 👈 Bọc toàn bộ app trong Redux Provider */}
          <header className="bg-white shadow-md py-4 px-6">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-teal-600">MLPA Blog</h1>
              <nav className="space-x-4">
                <a
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Home
                </a>
                <a
                  href="/blog"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Blog
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1  mx-auto w-full ">{children}</main>
          <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} My Blog. All rights reserved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
