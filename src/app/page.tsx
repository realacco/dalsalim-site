import "./home.css";

import { Closing } from "@/components/home/Closing";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Ledgers } from "@/components/home/Ledgers";
import { Marquee } from "@/components/home/Marquee";
import { Promises } from "@/components/home/Promises";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";

export default function HomePage() {
  return (
    <div className="home">
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
      <Marquee />
      <Ledgers />
      <Features />
      <Promises />
      <Closing />
    </div>
  );
}
