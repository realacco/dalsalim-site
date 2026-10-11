import "./home.css";

import { Care } from "@/components/home/Care";
import { Closing } from "@/components/home/Closing";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { Principles } from "@/components/home/Principles";
import { Stories } from "@/components/home/Stories";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";

export default function HomePage() {
  return (
    <div className="home mock">
      <JsonLd
        data={{
          "@type": "SoftwareApplication",
          name: SITE.name,
          description: SITE.description,
          url: SITE.url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Android",
          inLanguage: "ko",
        }}
      />
      <Hero />
      <Stories />
      <Insights />
      <Principles />
      <Care />
      <Closing />
    </div>
  );
}
