import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

import { markdownToHtml, htmlToMarkdown } from "./remark";
import "react-quill/dist/quill.snow.css";
import { text } from "stream/consumers";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

let toolbarOptions = [
  ["bold", "italic", "underline"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video"],

  // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export default function Editor({ onChange, value }: EditorProps) {
  const [text, setText] = useState<string>(markdownToHtml(value || ""));

  const reactQuillRef = useRef<ReactQuill>(null);

  const onChangeText = (content: string) => {
    setText(content);

    if (onChange) {
      onChange({
        html: content,
        markdown: htmlToMarkdown(content),
      });
    }
  };

  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        placeholder="Start writing..."
        modules={{
          toolbar: {
            container: toolbarOptions,
          },
        }}
        value={text}
        onChange={onChangeText}
      />
    </>
  );
}
