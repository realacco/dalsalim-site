import "./home.css";

import { Care } from "@/components/home/Care";
import { Closing } from "@/components/home/Closing";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { Principles } from "@/components/home/Principles";
import { Stories } from "@/components/home/Stories";

export default function HomePage() {
  return (
    <div className="home mock">
      <Hero />
      <Stories />
      <Insights />
      <Principles />
      <Care />
      <Closing />
    </div>
  );
}
