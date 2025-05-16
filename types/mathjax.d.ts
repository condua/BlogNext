// mathjax.d.ts
export {};

declare global {
  interface Window {
    MathJax?: {
      typesetPromise: () => Promise<void>;
      // Bạn có thể thêm các property bạn dùng của MathJax ở đây
    };
  }
}
