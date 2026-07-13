import type { Metadata } from "next";
import ArticlesClient from "@/components/articles/ArticlesClient";

export const metadata: Metadata = {
  title: "Press & Articles | FID & Co.",
  description:
    "Media coverage of FID & Co. campaigns — launches, reopenings and cultural platforms across Kenyan and regional press.",
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
