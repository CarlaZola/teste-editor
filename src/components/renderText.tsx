import ReactMarkdown from "react-markdown";

export interface ViewerProps {
  value: string;
}

export default function Viewer({ value }: ViewerProps) {
  return <ReactMarkdown>{value}</ReactMarkdown>;
}
