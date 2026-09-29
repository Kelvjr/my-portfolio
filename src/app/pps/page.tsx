import type { Metadata } from "next";
import Proposal from "./proposal";

export const metadata: Metadata = {
  title: "A little question for Regina 💌",
  description: "One little letter. One very important question. Just for you, Regina.",
  robots: { index: false, follow: false },
  openGraph: { title: "For Regina 💌", description: "Psst… there's a little letter waiting for you." },
  twitter: { card: "summary", title: "For Regina 💌", description: "A little letter, just for you." },
};

export default function Page() {
  return <Proposal />;
}
