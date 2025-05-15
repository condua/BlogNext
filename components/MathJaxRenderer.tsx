import { useEffect, useRef } from "react";

interface MathJaxRendererProps {
  content: string;
}

export default function MathJaxRenderer({ content }: MathJaxRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise([contentRef.current]);
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{ fontFamily: "'Times New Roman', serif" }}
    />
  );
}
