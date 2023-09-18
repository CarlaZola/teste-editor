import { Inter } from "next/font/google";
import ReactQuill, { Quill } from "react-quill";
import dynamic from "next/dynamic";
import { useState } from "react";
import { EditorContentChanged } from "@/components/Editor";
import ReactMarkdown from "react-markdown";
import Viewer from "@/components/renderText";

const inter = Inter({ subsets: ["latin"] });

const Editor = dynamic(
  () => import("@/components/Editor").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function Home() {
  const [editorHtmlValue, setEditorHtmlValue] = useState<string>(""); // é possível renderizar e salvar em HTML
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorHtmlValue(content.html);
    setEditorMarkdownValue(content.markdown);
  };
  return (
    <>
      <Editor onChange={onEditorContentChanged} />
      <p>Renderizando o markdown que deve ser salvo </p>
      <div>
        <textarea defaultValue={editorMarkdownValue} />
      </div>

      <Viewer value={editorMarkdownValue} />
    </>
  );
}
